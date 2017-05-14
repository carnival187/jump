import Body from './Body.js';

export default class Rectangle extends Body
{
	constructor(options)
	{
		super(options);
		this.type = "rectangle";
		this.width = options.width;
		this.height = options.height;
	}
	/**
	 * retourne true si il y a collision
	 */
	rectangle(r2)
	{
		return !(this.x >= r2.x + r2.width ||
			this.x + this.width <= r2.x ||
			this.y >= r2.y + r2.height ||
			this.y + this.height <= r2.y);
	}
	circle(c2)
	{
		return c2.rectangle(this);
	}
	draw(screen, x = this.x, y = this.y)
	{
		screen.ctx.fillStyle = this.color;
		screen.ctx.fillRect(x, y, this.width, this.height);
	}
}
