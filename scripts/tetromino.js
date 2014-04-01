var Tetromino = function(x, y,type) {

	this.matrix = false;
	this.volosity = 1;

	this.x = x;
	this.y = y;

	this.isMoveable = true;
	this.colour = "#FFFFFF";
	this.names = ['square', "inverse skew","gamma","right gun","tee","skew","straight"];

	if(type == null || !this.names.contains(type))
		type = this.names[Math.floor(Math.random() * this.names.length)];
		
	this.setType(type);

}

Tetromino.prototype.getVolosity = function() {
	return this.volosity;
}

Tetromino.prototype.getMatrix = function() {
	return this.matrix;
}

Tetromino.prototype.setType = function(type) {
	
	// Top left origin
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
				[0,1,1],
				[1,1,0],
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
		transfromation = [
		  [0,-1],
		  [-1,0],
		];
}

Tetromino.prototype.rotateRight = function() {
		transfromation = [
		  [0,-1],
		  [1, 0],
		];
}