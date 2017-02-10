import Body from './Body.js';

export default class Circle extends Body{
	constructor(options){
		super(options);
		this.rayon = options.rayon;
		this.type = "circle";

	}
	point(x,y){
		return (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y) < this.rayon * this.rayon;

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
	draw(screen, x = this.x, y = this.y){
		screen.ctx.beginPath();
		screen.ctx.arc(x, y, 10, 0, Math.PI * 2, true);
		screen.ctx.fillStyle = this.color;
		screen.ctx.fill();
	}
}
