class Hungary{

	private matrix: Array<Array<number>>;
	private _matrix: Array<Array<number>>;
	private graph: object = new Object();

	constructor(matrix: Array<Array<number>>, _matrix: Array<Array<number>>){
		this.matrix = matrix;
		this._matrix = _matrix;
	}

	set setMatrix(array) {
		this._matrix = array;
	}

	get getMatrix(): Array<Array<number>> {
		return this.matrix;
	}

	private lenObj(obj: object): number {
		let k: number = 0;
		for(let i in obj)
			k++;

		return k;
	}

	//Нахождение минимального элемента в каждой строке
	private findMinInRows(array: Array<Array<number>>): Array<number> {
		let arrayMin: Array<number> = [];
		for(let i: number = 0; i < array.length; i++)
			arrayMin.push(Math.min.apply(null, array[i]));
		
		return arrayMin;
	}

	//Нахождение минимального элемента в каждом столбце
	private findMinInCols(): Array<number> {
		let arrayMin: Array<number> = [];
		for(let j: number = 0; j < this.matrix.length; j++){
			let array: Array<number> = [];
			for(let i: number = 0; i < this.matrix.length; i++)
				array.push(this.matrix[i][j]);

			arrayMin.push(Math.min.apply(null, array));
		}

		return arrayMin;
	}

	//Приведение матрицы
	public matrixReduction(): void {
		let arrayMinRows: Array<number> = this.findMinInRows(this.matrix);
		for(let i: number = 0; i < this.matrix.length; i++)
			for(let j: number = 0; j < this.matrix.length; j++)
				this.matrix[i][j] = this.matrix[i][j] - arrayMinRows[i];

		for(let i: number = 0; i < this._matrix.length; i++)
			for(let j: number = 0; j < this._matrix.length; j++)
				this._matrix[i][j] = this._matrix[i][j] - arrayMinRows[i];

		let arrayMinCols: Array<number> = this.findMinInCols();	
		for(let j: number = 0; j < this.matrix.length; j++)
			for(let i: number = 0; i < this.matrix.length; i++)
				this.matrix[i][j] = this.matrix[i][j] - arrayMinCols[i];

		for(let j: number = 0; j < this._matrix.length; j++)
			for(let i: number = 0; i < this._matrix.length; i++)
				this._matrix[i][j] = this._matrix[i][j] - arrayMinCols[i];
	}

	public matching(): any{
		let k: number = 0;
		let array_i = [];
		let array_j = [];

		for(let i: number = 0; i < this.matrix.length; i++){
			k = 0;
			for(let j: number = 0; j < this.matrix[i].length; j++)
				if(this.matrix[i][j] == 0)
					k++;

			if(k > 1)
				array_i.push(i);
		}

		for(let i: number = 0; i < this._matrix.length; i++){
			k = 0;
			for(let j: number = 0; j < this._matrix[i].length; j++)
				if(this._matrix[i][j] == 0)
					k++;

			if(k > 1)
				this._matrix.splice(i, 1);
		}
		console.log(array_i);

		k = 0;
		for(let i: number = 0; i < this._matrix.length; i++) {
			k = 0;
			for(let j: number = 0; j < this._matrix.length; j++) {
				if(this._matrix[j][i] == 0) {
					k++;
					array_j.push(i);
					this._matrix[j].splice(i, 1);
				}
			}

		}

		console.log(array_j);
		let min: number = Math.min.apply(null, this.findMinInRows(this._matrix));
		for(let i: number = 0; i < this.matrix.length; i++) {
			for (let j: number = 0; j < this.matrix[i].length; j++) {
				if(array_i.indexOf(i) == -1 && array_j.indexOf(j) == -1)
					this.matrix[i][j] -= min;
			}
		}

		for(let i: number = 0; i < this.matrix.length; i++) {
			for (let j: number = 0; j < this.matrix[i].length; j++) {
				if(array_i.indexOf(i) != -1 && array_j.indexOf(j) != -1)
					this.matrix[i][j] += min;
			}
		}

		return this.matrix;
	}

	public result(){
		let array_i = [];
		let array_j = [];
		for(let i: number = 0; i < this.matrix.length; i++) {
			for (let j: number = 0; j < this.matrix[i].length; j++) {
				if(this.matrix[i][j] == 0){
					if(array_j.indexOf(j) == -1) {
						array_j.push(j);
						array_i.push(i);
						break;
					}
				}
			}
		}

		return `${array_i}, ${array_j}`;
	}
}

let array: Array<Array<number>> = [[1, 7, 1, 3],
				[1, 6, 4, 6],
				[17, 1, 5, 1],
				[1, 6, 10, 4]];

let _array: Array<Array<number>> = [[1, 7, 1, 3],
	[1, 6, 4, 6],
	[17, 1, 5, 1],
	[1, 6, 10, 4]];



//Create object
let H: Hungary = new Hungary(array, _array);


//Getter
console.log('Начальная матрица:');
for(let i: number = 0; i < H.getMatrix.length; i++)
	console.log(H.getMatrix[i]);

H.matrixReduction();

console.log('Матрица после приведения:');
for(let i: number = 0; i < H.getMatrix.length; i++)
	console.log(H.getMatrix[i]);

console.log('Матрица после найденного паросочетания и произведённых действий с минимальным элементом:');
H.matching();
for(let i: number = 0; i < H.getMatrix.length; i++)
	console.log(H.getMatrix[i]);

console.log(H.result());



