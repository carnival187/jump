class Rectangle extends Position{
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
class Circle extends Position{
	constructor(){
		this.rayon = rayon;
		this.name = "circle";

	}
	point(x,y){
		return (this.x - x) * (this.x - x) + (this.y - y) * this.y - y) < this.rayon * this.rayon;

	}
	circle(c2){
		return point(c2.x, c2.y);
	}

	rectangle(rect){
		if(rect.x >= this.x + this.rayon || rect.x + rect.width <= this.x - this.rayon || rect.y >= this.y + this.rayon || rect.y <= this.y - this.rayon){
			return false;
		}
		if(this.x >= rect.x && this.x <= rect.x + rect.width || this.y >= rect.y && this.y <= rect.y + rect.height){
			return true;
		}
		return (this.point(rect.x, rect.y) || this.point(rect.x + rect.width, rect.y) || this.point(rect.x + rect.width, rect.y + rect.height) || this.point(rect.x, rect.y + rect.height));
	}
}
/*
 * detail (pytagore)
 *
 * let ab_2 = (this.x - c2.x) * (this.x - c2.x);
 * let bc_2 = (this.y - c2.y) * (this.y - c2.y);
 * let ac_2 = ab_2 + bc_2;
 * 
 * return d_2 < this.rayon * this.rayon;
 *
 *
 *
 *
