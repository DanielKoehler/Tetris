var names = ['square', "inverse skew","gamma","right gun","tee","skew","straight"];

var Tetromino = function(x, y, type, size) {

	this.matrix = false;
	this.volosity = 8;

	this.x = size * Math.floor(Math.random() * 7);
	this.y = y;

	this.size = size;

	this.row = 0;
	this.column = parseInt(this.x / size);
	
	this.colour = "#FFFFFF";

	if(type == null || !this.names.contains(type))
		type = names[Math.floor(Math.random() * names.length)];
		
	this.setType(type);

	this.mobilise();

}

Tetromino.prototype.immobilise = function() {
	this.isMoveable = false;
}

Tetromino.prototype.mobilise = function() {
	this.isMoveable = true;
}

Tetromino.prototype.getVolosity = function() {
	return this.volosity;
}

Tetromino.prototype.getMatrix = function() {
	return this.matrix;
}

Tetromino.prototype.setY = function(y) {
	this.y = y;
	this.row = Math.ceil(this.y / this.size);
}


Tetromino.prototype.setX = function(x) {
	this.x = x;
	this.column = parseInt(this.x / this.size);
}

Tetromino.prototype.getY = function() {
	return this.y;
}

Tetromino.prototype.getX = function() {
	return this.x;
}

Tetromino.prototype.setColumn = function(column) {
	this.column = column;
	this.x = parseInt(this.column * this.size);
}

Tetromino.prototype.setRow = function(row) {
	this.row = row;
	this.y = parseInt(this.row * this.size);
}


Tetromino.prototype.getRow = function() {
	return this.row;
}

Tetromino.prototype.getColumn = function() {
	return this.column;
}

Tetromino.prototype.getMatrix = function() {
	return this.matrix;
}

Tetromino.prototype.setType = function(type) {
	
	// Top left origin
	// console.log(type);
	switch (type){
		case "square":
			this.colour = "#f39c12";
			this.matrix  = [
				[1,1],
				[1,1],
			];
			break;
		case "inverse skew":
			this.colour = "#e74c3c";
			this.matrix  = [
				[0,1,1],
				[1,1,0],
			];
			break;
		case "gamma":
			this.colour = "#2980b9";
			this.matrix  = [
				[1,0,0],
				[1,1,1],
			];
			break;
		case "right gun":
			this.colour = "#e67e22";
			this.matrix  = [
				[0,0,1],
				[1,1,1],
			];
			break;
		case "tee":
			this.colour = "#9b59b6";
			this.matrix  = [
				[0,1,0],
				[1,1,1],
			];
			break;
		case "skew":
			this.colour = "#2ecc71";
			this.matrix  = [
				[1,1,0],
				[0,1,1],
			];
			break;
		case "straight":
			this.colour = "#3498db";
			this.matrix  = [
				[1,1,1,1],
			];
			break;
	}	
}

Tetromino.prototype.rotateRight = function() {
	 
	this.matrix = this.transpose(this.matrix);
	
	for(var i = 0; i < this.matrix.length; i++){
		this.matrix[i].reverse();
	}
}

Tetromino.prototype.rotateLeft = function() {
	 
	this.matrix = this.transpose(this.matrix);
	this.matrix.reverse();
	
}

Tetromino.prototype.transpose = function(a) {
    return Object.keys(a[0]).map(
        function (c) { 
        	return a.map(function (r) { 
        		return r[c]; 
        	}); 
        }
    );
}