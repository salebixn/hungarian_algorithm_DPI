var Hungary = /** @class */ (function () {
    function Hungary(matrix, _matrix) {
        this.graph = new Object();
        this.matrix = matrix;
        this._matrix = _matrix;
    }
    Object.defineProperty(Hungary.prototype, "setMatrix", {
        set: function (array) {
            this._matrix = array;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Hungary.prototype, "getMatrix", {
        get: function () {
            return this.matrix;
        },
        enumerable: false,
        configurable: true
    });
    Hungary.prototype.lenObj = function (obj) {
        var k = 0;
        for (var i in obj)
            k++;
        return k;
    };
    //Нахождение минимального элемента в каждой строке
    Hungary.prototype.findMinInRows = function (array) {
        var arrayMin = [];
        for (var i = 0; i < array.length; i++)
            arrayMin.push(Math.min.apply(null, array[i]));
        return arrayMin;
    };
    //Нахождение минимального элемента в каждом столбце
    Hungary.prototype.findMinInCols = function () {
        var arrayMin = [];
        for (var j = 0; j < this.matrix.length; j++) {
            var array_1 = [];
            for (var i = 0; i < this.matrix.length; i++)
                array_1.push(this.matrix[i][j]);
            arrayMin.push(Math.min.apply(null, array_1));
        }
        return arrayMin;
    };
    //Приведение матрицы
    Hungary.prototype.matrixReduction = function () {
        var arrayMinRows = this.findMinInRows(this.matrix);
        for (var i = 0; i < this.matrix.length; i++)
            for (var j = 0; j < this.matrix.length; j++)
                this.matrix[i][j] = this.matrix[i][j] - arrayMinRows[i];
        for (var i = 0; i < this._matrix.length; i++)
            for (var j = 0; j < this._matrix.length; j++)
                this._matrix[i][j] = this._matrix[i][j] - arrayMinRows[i];
        var arrayMinCols = this.findMinInCols();
        for (var j = 0; j < this.matrix.length; j++)
            for (var i = 0; i < this.matrix.length; i++)
                this.matrix[i][j] = this.matrix[i][j] - arrayMinCols[i];
        for (var j = 0; j < this._matrix.length; j++)
            for (var i = 0; i < this._matrix.length; i++)
                this._matrix[i][j] = this._matrix[i][j] - arrayMinCols[i];
    };
    Hungary.prototype.matching = function () {
        var k = 0;
        var array_i = [];
        var array_j = [];
        for (var i = 0; i < this.matrix.length; i++) {
            k = 0;
            for (var j = 0; j < this.matrix[i].length; j++)
                if (this.matrix[i][j] == 0)
                    k++;
            if (k > 1)
                array_i.push(i);
        }
        for (var i = 0; i < this._matrix.length; i++) {
            k = 0;
            for (var j = 0; j < this._matrix[i].length; j++)
                if (this._matrix[i][j] == 0)
                    k++;
            if (k > 1)
                this._matrix.splice(i, 1);
        }
        console.log(array_i);
        k = 0;
        for (var i = 0; i < this._matrix.length; i++) {
            k = 0;
            for (var j = 0; j < this._matrix.length; j++) {
                if (this._matrix[j][i] == 0) {
                    k++;
                    array_j.push(i);
                    this._matrix[j].splice(i, 1);
                }
            }
        }
        console.log(array_j);
        var min = Math.min.apply(null, this.findMinInRows(this._matrix));
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < this.matrix[i].length; j++) {
                if (array_i.indexOf(i) == -1 && array_j.indexOf(j) == -1)
                    this.matrix[i][j] -= min;
            }
        }
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < this.matrix[i].length; j++) {
                if (array_i.indexOf(i) != -1 && array_j.indexOf(j) != -1)
                    this.matrix[i][j] += min;
            }
        }
        return this.matrix;
    };
    Hungary.prototype.result = function () {
        var array_i = [];
        var array_j = [];
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] == 0) {
                    if (array_j.indexOf(j) == -1) {
                        array_j.push(j);
                        array_i.push(i);
                        break;
                    }
                }
            }
        }
        return "".concat(array_i, ", ").concat(array_j);
    };
    return Hungary;
}());
var array = [[1, 7, 1, 3],
    [1, 6, 4, 6],
    [17, 1, 5, 1],
    [1, 6, 10, 4]];
var _array = [[1, 7, 1, 3],
    [1, 6, 4, 6],
    [17, 1, 5, 1],
    [1, 6, 10, 4]];
//Create object
var H = new Hungary(array, _array);
//Getter
console.log('Начальная матрица:');
for (var i = 0; i < H.getMatrix.length; i++)
    console.log(H.getMatrix[i]);
H.matrixReduction();
console.log('Матрица после приведения:');
for (var i = 0; i < H.getMatrix.length; i++)
    console.log(H.getMatrix[i]);
console.log('Матрица после найденного паросочетания и произведённых действий с минимальным элементом:');
H.matching();
for (var i = 0; i < H.getMatrix.length; i++)
    console.log(H.getMatrix[i]);
console.log(H.result());
