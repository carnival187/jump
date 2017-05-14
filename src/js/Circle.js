import Body from './Body.js';

export default class Circle extends Body{
	constructor(options){
		super(options);
		this.rayon = options.rayon;
		this.type = "circle";

	}
	circle(c){
		return pythagore(c.x, c.y);
	}

	rectangle(rect){
		if(rect.x >= this.x + this.rayon || rect.x + rect.width <= this.x - this.rayon || rect.y >= this.y + this.rayon || rect.y <= this.y - this.rayon){
			return false;
		}
		if(this.x >= rect.x && this.x <= rect.x + rect.width || this.y >= rect.y && this.y <= rect.y + rect.height){
			return true;
		}
		return (this.pythagore(rect.x, rect.y) || this.pythagore(rect.x + rect.width, rect.y) || this.pythagore(rect.x + rect.width, rect.y + rect.height) || this.pythagore(rect.x, rect.y + rect.height));
	}
	draw(screen, x = this.x, y = this.y){
		screen.ctx.beginPath();
		screen.ctx.arc(x, y, 10, 0, Math.PI * 2, true);
		screen.ctx.fillStyle = this.color;
		screen.ctx.fill();
	}
}
