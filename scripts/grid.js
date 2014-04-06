
var Grid = function(ctx, columns, rows, tileSize)
{
	this.columns = columns;
	this.rows = rows;
	this.tileSize = tileSize;

	this.tetrominos = [];
	this.clear();
	this.ctx = ctx

}

Grid.prototype.clear = function() 
{
	this.grid = Array(this.rows);

	for (var i = 0; i < this.rows; i++) 
	{	
		this.grid[i] = Array(this.columns);
		for (var x = 0; x < this.columns; x++) 
		{
			this.grid[i][x] = false;
		}
	}
}

Grid.prototype.set = function(y, x, value)
{
	if (x == undefined || y == undefined)
		return false;

	if (y < this.rows && x < this.columns){
		return this.grid[y][x] = value;
	}

	return false;
}

Grid.prototype.get = function(y, x)
{
	if (x == undefined && y == undefined)
		return this.grid;

	if (x == undefined && y != undefined)
		return this.grid[y];

	if (y < this.rows && x < this.columns){
		return this.grid[y][x];
	}

	return false;

}	

Grid.prototype.addTetromino = function(tetromino) 
{	

	if(!this.tetrominoCanBePushedToGrid(tetromino))
		return false

	var id = this.tetrominos.push(tetromino);

	// console.log("Added tetromino, total tetrominos ever on grid = ", this.tetrominos.length)

	this.gridTetromino(id);

	return id;
}

Grid.prototype.dropTetrominoWithId = function(id){

	if((tetromino = this.getTetrominoWithId(id)) == false)
		return false;

	// console.log("WHERE NOT:" + id)

	this.ungridTetromino(tetromino);

	tetromino.setY(tetromino.getY() + tetromino.getVolosity());
	
	if(!this.tetrominoCanBePushedToGrid(tetromino, id)){

		// console.log("Can't be pushed")

		tetromino.setY(tetromino.getY() - tetromino.getVolosity());
		tetromino.isMoveable = false;

		// this.checkBlockIntergrity();

	}

	this.gridTetromino(id);

	return true
}

Grid.prototype.hardDropTetrominoWithId = function(id){

	if((tetromino = this.getTetrominoWithId(id)) == false)
		return false;

	tetromino.setY(tetromino.getY() + tetromino.getVolosity());

	while (this.tetrominoCanBePushedToGrid(tetromino, id)) {
		this.ungridTetromino(tetromino);
		this.gridTetromino(id);
		tetromino.setY(tetromino.getY() + tetromino.getVolosity());
	}

	tetromino.setY(tetromino.getY() - tetromino.getVolosity());

	return true
}

Grid.prototype.moveLeftTetrominoWithId = function(id){

	if((tetromino = this.getTetrominoWithId(id)) == false)
		return false;	

	this.ungridTetromino(tetromino);

	tetromino.setX(tetromino.getX() - this.tileSize);

	if(!this.tetrominoCanBePushedToGrid(tetromino, id)){
		tetromino.setX(tetromino.getX() + this.tileSize);
	}

	this.gridTetromino(id);

	return true;
}

Grid.prototype.moveRightTetrominoWithId = function(id){

	if((tetromino = this.getTetrominoWithId(id)) == false)
		return false;

	this.ungridTetromino(tetromino);
	tetromino.setX(tetromino.getX() + this.tileSize);

	if(!this.tetrominoCanBePushedToGrid(tetromino, id)){		
		tetromino.setX(tetromino.getX() - this.tileSize);
	}

	this.gridTetromino(id);

	return true;
}

Grid.prototype.rotateTetrominoWithId = function(id){

	if((tetromino = this.getTetrominoWithId(id)) == false)
		return false;

	tetromino.rotateRight();

	if(this.tetrominoCanBePushedToGrid(tetromino, id)){
		this.ungridTetromino(tetromino);
		this.gridTetromino(id);
	} else {
		tetromino.rotateLeft();
	}
	return true;
}
 
Grid.prototype.gridTetromino = function(id)
{
	if((tetromino = this.getTetrominoWithId(id)) == false){
		// console.log("Couldn't find tetromino")
		return false;
	}

	// console.log("Setting row to be", Math.ceil(tetromino.y / this.tileSize), " given tetromino.y = ", tetromino.y)
	// console.log("Setting column to be", parseInt(tetromino.x / this.tileSize), " given tetromino.x = ", tetromino.x)
	
	tetromino.row = Math.ceil(tetromino.y / this.tileSize);
	tetromino.column = parseInt(tetromino.x / this.tileSize);

	for (var row = 0; row < tetromino.matrix.length; row++) 
	{
		for (var column = 0; column < tetromino.matrix[row].length; column++) 
		{
			if (tetromino.matrix[row][column] && tetromino.row + row <= this.rows && tetromino.column + column <= this.columns){

				// console.log("Gridding:",tetromino.row + row, tetromino.column + column)
				this.set(tetromino.row + row, tetromino.column + column, id);

			}
		
		}
	}
}

Grid.prototype.ungridTetromino = function(tetromino)
{

	for (var row = 0; row < tetromino.matrix.length; row++) 
	{
		for (var column = 0; column < tetromino.matrix[row].length; column++) 
		{
			if (tetromino.matrix[row][column]){

				this.set(tetromino.row + row, tetromino.column + column, false);
			
			}
		
		}
	}

	// console.log("Ungrided Tetromino")
	// console.log(this.grid)
}

Grid.prototype.getTetrominoWithPosition = function(row,column)
{	
	if(this.grid[row][column])
		return this.tetrominos[this.grid[row][column] - 1];
	return false;
}

Grid.prototype.getTetrominoWithId = function(id)
{
	// ID is NOT zero based.
	if(this.tetrominos.length >= id && this.tetrominos[id - 1] != undefined)
		return this.tetrominos[id - 1]; 
	return false;
}

Grid.prototype.confineTetromino = function(tetromino){

	// console.log("Confining tetromino, row:", tetromino.row + tetromino.matrix.length)
	
	// debugger;	
	
	if (tetromino.row + tetromino.matrix.length >= this.grid.length) {

		tetromino.setY(this.grid.length * this.tileSize - tetromino.matrix.length * this.tileSize);
		tetromino.isMoveable = false;
		
		// console.log("Tetromino hit bottom")

	}	

	if (tetromino.column + tetromino.matrix[0].length >= this.columns) {

		tetromino.setX(this.columns * this.tileSize - tetromino.matrix[0].length * this.tileSize);
		// console.log("Tetromino hit right wall")
	
	}	

	if(tetromino.x < 0){
		tetromino.setX(0);
		// console.log("Tetromino hit left wall")
	} 

	// console.log("Tetromino is confined")

	return true;
}

Grid.prototype.checkBlockIntergrity = function(){

	

	for (var row = 0; row < this.grid.length; row++) 
	{

		total = 0;

		for (var column = 0; column < this.grid[row].length; column++) 
		{
			total += this.grid[row][column] ? 1 : 0;
		}

		if (total == 10){
			 this.grid.splice(row,1);
			 this.grid.insert(0,[0,0,0,0,0,0,0,0,0,0]);
		}


	}
}

Grid.prototype.tetrominoCanBePushedToGrid = function(tetromino, id){

	// console.log("Checking whether tetromino can be pushed to grid")

	this.confineTetromino(tetromino);

	// for (var r = 0; r < this.grid.length; r++) {
	// 	out = ""
	// 	for (var c = 0; c < this.grid[r].length; c++) {
	// 		out += " " + this.grid[r][c];
	// 	};
	// 	console.log(out);
	// };

	// console.log(this.get())

	for (var row = 0; row < tetromino.matrix.length; row++) 
	{
		for (var column = 0; column < tetromino.matrix[row].length; column++) 
		{

			if(tetromino.matrix[row][column]){
						


				// console.log("Trying:" ,tetromino.row + row, tetromino.column + column, " - ", this.get(tetromino.row + row, tetromino.column + column))

				var v = this.get(tetromino.row + row, tetromino.column + column);
				// debugger;
				
				if(v != false && v != id || v != false && id == undefined){
					return false;
				}

			}
		}
	}

	// debugger;

	return true;

}

