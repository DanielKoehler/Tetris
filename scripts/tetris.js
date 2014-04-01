var Tetris = function(container) 
{      
	var self = this;

	this.tileSize = 30;
	this.columns = 10;
	this.rows = 16;
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

	this.pressedkeys = [];
	window.addEventListener('keydown', function(event) {self.keyDownHandler(event)}, false);
	window.addEventListener('keyup', function(event) {self.keyUpHandler(event)}, false);

};

Tetris.prototype.start = function()
{

	clearInterval(this.renderTimer);
	
	var self = this;

	this.grid = new Grid(this.columns, this.rows);
	this.target = this.grid.addTetromino(new Tetromino(0, 0));

	this.mainloop();
	this.renderTimer = setInterval(function(){self.mainloop();}, 400);

}

Tetris.prototype.mainloop = function()
{

	this.equaliseTetrominos();
	// Blit
	this.blit();
	// Detect Colsions
}

Tetris.prototype.equaliseTetrominos = function()
{
	if(this.grid.getTetrominoWithId(this.target).isMoveable){
		this.grid.dropTetrominoWithId(this.target);
	} else {
		if((this.target = this.grid.addTetromino(new Tetromino(0, 0))) == false){
			this.finish()
		}
	}
}

Tetris.prototype.finish = function()
{
	clearInterval(this.renderTimer);
	console.log("Game Over");
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

Tetris.prototype.keyUpHandler = function (event) 
{

	var validBindings = [32, 37, 38, 39, 40];

	if(validBindings.contains(event.keyCode))
		event.preventDefault();	
		this.pressedkeys.splice(this.pressedkeys.indexOf(event.keyCode), 1);

	if(!this.pressedkeys.length){
		clearTimeout(this.keyLoopTimer);
		this.keyLoopTimer = false;
	}
}

Tetris.prototype.keyDownHandler = function (event) 
{
	var validBindings = [32, 37, 38, 39, 40];
	var self = this;

	if(validBindings.contains(event.keyCode) && !this.pressedkeys.contains(event.keyCode)){
		event.preventDefault();	
		this.pressedkeys.push(event.keyCode);
	}



	if(!this.keyLoopTimer)		
		this.keyLoopTimer = setInterval(function(){self.keyLoop();}, 100);

	this.keyLoop();
}	

// The keydown event simply doesn't fire often enough, 
// we're going to have to call the methods ourselves and just wait for key up.

Tetris.prototype.keyLoop = function(){

	
	for (key in this.pressedkeys){
		switch(this.pressedkeys[key]){
			case 32:
				this.keySpace();
				break;
			case 37:
				this.keyLeft();
				break;
			case 38:
				this.keyUp();
				this.pressedkeys.splice(this.pressedkeys.indexOf(38), 1);
				break;
			case 39:
				this.keyRight();
				break;
			case 40:
				this.keyDown();
				this.pressedkeys.splice(this.pressedkeys.indexOf(40), 1);
				break;	
		}
	}	
}

Tetris.prototype.keySpace = function()
{
	// Space hard drop
	this.grid.hardDropTetrominoWithId(this.target);
}

Tetris.prototype.keyDown = function()
{
	if(this.grid.dropTetrominoWithId(this.target)){
		this.blit();
	}
	// Down falling speed
}

Tetris.prototype.keyUp = function()
{
	// Up - rotate right
	if(this.grid.rotateTetrominoWithId(this.target)){
		this.blit();	
	}
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
	this.grid.moveRightTetrominoWithId(this.target)
	this.blit();
	this.grid.moveRightTetrominoWithId(this.target)
	this.blit();
}

var tetris = new Tetris(document.getElementById('tetris'));
tetris.start();
