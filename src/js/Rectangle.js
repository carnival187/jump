export default class Rectangle {
	constructor(){
		this.name = "rectangle";
		this.width = width;
		this.height = height;
	}
	rectangle(r2){
		return !(this.x >= r2.x + r2.width ||
			this.x + this.width <= r2.x ||
			this.y >= r2.y + r2.height ||
			this.y + this.height <= r2.y);
	}
}
