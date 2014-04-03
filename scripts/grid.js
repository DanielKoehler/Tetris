var Grid = function(columns, rows, tileSize)
{
	this.columns = columns;
	this.rows = rows;
	this.tileSize = tileSize;

	this.tetrominos = [];
	this.clear();

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

Grid.prototype.addTetromino = function(tetromino) 
{	
	
	if(!this.tetrominoCanBePushedToGrid(tetromino))
		return false

	console.log("Can be added")
	
	var id = this.tetrominos.push(tetromino);

	this.gridTetromino(id);

	return id;
}

Grid.prototype.dropTetrominoWithId = function(id){

	if((tetromino = this.getTetrominoWithId(id)) == false)
		return false;

	tetromino.y += tetromino.getVolosity();

	if(this.tetrominoCanBePushedToGrid(tetromino, id)){
		this.ungridTetromino(id);
		this.gridTetromino(id);
	} else {
		tetromino.isMoveable = false;
		this.checkBlockIntergrity();
	}

	return true
}

Grid.prototype.hardDropTetrominoWithId = function(id){

	if((tetromino = this.getTetrominoWithId(id)) == false)
		return false;

	tetromino.y += tetromino.getVolosity();
	 while (this.tetrominoCanBePushedToGrid(tetromino, id)) {
		this.ungridTetromino(id);
		this.gridTetromino(id);
		tetromino.y += tetromino.getVolosity();
	}

	tetromino.y -= tetromino.getVolosity();

	return true
}

Grid.prototype.moveLeftTetrominoWithId = function(id){

	if((tetromino = this.getTetrominoWithId(id)) == false)
		return false;

	tetromino.x -= this.tileSize;

	if(this.tetrominoCanBePushedToGrid(tetromino, id)){
		this.ungridTetromino(id);
		this.gridTetromino(id);
	} else {
		tetromino.x += this.tileSize;
	}

	return true;
}

Grid.prototype.moveRightTetrominoWithId = function(id){

	if((tetromino = this.getTetrominoWithId(id)) == false)
		return false;

	tetromino.x += this.tileSize;

	if(this.tetrominoCanBePushedToGrid(tetromino, id)){
		this.ungridTetromino(id);
		this.gridTetromino(id);
	} else {
		tetromino.x -= this.tileSize;
	}
	return true;
}

Grid.prototype.rotateTetrominoWithId = function(id){

	if((tetromino = this.getTetrominoWithId(id)) == false)
		return false;

	tetromino.rotateRight();

	if(this.tetrominoCanBePushedToGrid(tetromino, id)){
		this.ungridTetromino(id);
		this.gridTetromino(id);
	} else {
		tetromino.rotateLeft();
	}
	return true;
}

Grid.prototype.gridTetromino = function(id)
{
	if((tetromino = this.getTetrominoWithId(id)) == false)
		return false;

	for (var row = 0; row < tetromino.matrix.length; row++) 
	{
		for (var column = 0; column < tetromino.matrix[row].length; column++) 
		{
			if (tetromino.matrix[row][column])
				this.grid[parseInt(tetromino.y / this.tileSize + row)][parseInt(tetromino.x / this.tileSize + column)] = true;
		}
	}
}

Grid.prototype.ungridTetromino = function(id)
{
	for (var row = 0; row < this.grid.length; row++) 
	{
		for (var column = 0; column < this.grid[row].length; column++) 
		{
			if(this.grid[row][column] == id)
			{
				this.grid[row][column] = false;
			}
		}
	}
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

	if (tetromino.y + tetromino.matrix.length * this.tileSize > this.grid.length * this.tileSize) {
		tetromino.y = this.grid.length * this.tileSize - tetromino.matrix.length * this.tileSize;
		tetromino.isMoveable = false;
	}	

	if (tetromino.x + tetromino.matrix[0].length * this.tileSize > this.grid[0].length * this.tileSize) {
		tetromino.x = this.grid[0].length * this.tileSize - tetromino.matrix[0].length * this.tileSize;
	}	

	if(tetromino.x < 0){
		tetromino.x = 0;
	} 

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

	this.confineTetromino(tetromino);

	for (var row = 0; row < tetromino.matrix.length; row++) 
	{
		for (var column = 0; column < tetromino.matrix[row].length; column++) 
		{
			if(tetromino.matrix[row][column]){

				gridedValue = this.grid[parseInt(tetromino.y / this.tileSize + row)][parseInt(tetromino.x / this.tileSize + column)];
				
				if(gridedValue)
					if (id == null || id != gridedValue)
						return false;
			}
		}
	}

	return true;

}

