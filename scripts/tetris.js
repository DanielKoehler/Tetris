var Tetris = function(container) 
{      
	var self = this;

	this.tileSize = 30;
	this.columns = 10;
	this.rows = 20;

	this.width = this.tileSize * this.columns;
	this.height = this.tileSize * this.rows;

	this.ctx = container.getContext('2d');

	if (window.devicePixelRatio) {
	
		container.style.width = this.width + "px";
		container.width = this.width * window.devicePixelRatio;
		container.style.height = this.height + "px";
		container.height = this.height * window.devicePixelRatio;

		this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);               
	}

	this.matrixCompliment = [];
	window.addEventListener('keydown', function(event) {self.keyPressHandler(event)}, false);

};

Tetris.prototype.start = function()
{

	clearTimeout(this.timer);

	this.grid = new Grid(this.columns, this.rows);
	this.target = this.grid.addTetromino(new Tetromino(0, 0));

	this.mainloop();

}

Tetris.prototype.mainloop = function()
{

	var self = this;

	this.equaliseTetrominos();
	// Blit
	this.blit();
	// Detect Colsions

	this.timer = setTimeout(function(){self.mainloop();}, 100);
}

Tetris.prototype.equaliseTetrominos = function()
{
	if(this.grid.getTetrominoWithId(this.target).isMoveable){
		this.grid.dropTetrominoWithId(this.target);
	} else {
		this.target = this.grid.addTetromino(new Tetromino(0, 0));
	}
}

Tetris.prototype.finish = function()
{

}

Tetris.prototype.blit = function()
{
	// Clear UI.
	this.ctx.clearRect ( 0 , 0 , this.width , this.height );

	for (var row = 0; row < this.rows; row++){
		for (var column = 0; column < this.columns; column++){
			if((tetromino = this.grid.getTetrominoWithPosition(row, column)) != false) {

				this.drawTile(column *  this.tileSize, row * this.tileSize, tetromino.colour);

			}
		}
	}
}

Tetris.prototype.drawTile = function(x, y, colour){

	this.ctx.fillStyle = colour;
	this.ctx.roundRect(x + 1,y  + 1,  this.tileSize - 1,  this.tileSize - 1, 3).fill();

} 

Tetris.prototype.keyPressHandler = function (event) 
{

	var validBindings = [32, 37, 38, 39, 40];

	if(validBindings.contains(event.keyCode))
		event.preventDefault();	

	switch(event.keyCode){
		case 32:
			this.keySpace();
		break;
		case 37:
			event.preventDefault();
			this.keyLeft();
		break;
		case 38:
			this.keyUp();
		break;
		case 39:
			this.keyRight();
		break;
		case 40:
			this.keyDown();
		break;	
	}	
}

Tetris.prototype.keySpace = function()
{
	// Space hard drop
}

Tetris.prototype.keyDown = function()
{
	// Up - rotate right
}

Tetris.prototype.keyUp = function()
{
	// Down falling speed
}

Tetris.prototype.keyLeft = function()
{	
	// Left - move left
	if(this.grid.moveLeftTetrominoWithId(this.target)){
		this.blit();	
	}
}

Tetris.prototype.keyRight = function()
{
	// Right - move right
	if(this.grid.moveRightTetrominoWithId(this.target)){
		this.blit();
	}
}

var tetris = new Tetris(document.getElementById('tetris'));
tetris.start();