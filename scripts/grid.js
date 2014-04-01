var Grid = function(columns, rows)
{
	this.columns = columns;
	this.rows = rows;

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
	
	var id = this.tetrominos.push(tetromino);

	this.gridTetromino(id);

	return id;
}

Grid.prototype.dropTetrominoWithId = function(id){

	if((tetromino = this.getTetrominoWithId(id)) == false)
		return false;

	tetromino.y += tetromino.volosity;

	if(this.tetrominoCanBePushedToGrid(tetromino, id)){
		this.ungridTetromino(id);
		this.gridTetromino(id);
	} else {
		tetromino.isMoveable = false;
	}
}

Grid.prototype.moveLeftTetrominoWithId = function(id){

	if((tetromino = this.getTetrominoWithId(id)) == false)
		return false;

	tetromino.x -= tetromino.volosity;

	if(this.tetrominoCanBePushedToGrid(tetromino, id)){
		this.ungridTetromino(id);
		this.gridTetromino(id);
	} else {
		tetromino.x += tetromino.volosity;
	}

	return true;
}

Grid.prototype.moveRightTetrominoWithId = function(id){

	if((tetromino = this.getTetrominoWithId(id)) == false)
		return false;

	tetromino.x += tetromino.volosity;

	if(this.tetrominoCanBePushedToGrid(tetromino, id)){
		this.ungridTetromino(id);
		this.gridTetromino(id);
	} else {
		tetromino.x -= tetromino.volosity;
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
				this.grid[tetromino.y + row][tetromino.x + column] = id;
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
	if(this.tetrominos.length >= id)
		return this.tetrominos[id - 1]; 
	return false;
}

Grid.prototype.tetrominoIsConfined = function(tetromino){

	if(tetromino.y + tetromino.matrix.length  > this.grid.length || tetromino.x + tetromino.matrix[0].length > this.grid[0].length){
		return false;
	}	

	if(tetromino.x < 0){
		return false;
	}

	return true;
}

Grid.prototype.tetrominoCanBePushedToGrid = function(tetromino, id){

	if(!this.tetrominoIsConfined(tetromino)){
		return false;
	}

	for (var row = 0; row < tetromino.matrix.length; row++) 
	{
		for (var column = 0; column < tetromino.matrix[row].length; column++) 
		{
			if(tetromino.matrix[row][column]){

				gridedValue = this.grid[tetromino.y + row][tetromino.x + column];
				
				if(gridedValue)
					if (id == null || id != gridedValue)
						return false;
			}
		}
	}

	return true;

}

