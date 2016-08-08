class Player{
	constructor(x, y, size){
		this.x = x;
		this.y = y;
		this.body = bodys.makeSquare(size);
		this.is = {};
		this.timers = {};

	}
	draw(that){
		that.ctx.fillStyle = that.colors[2];
		const X = this.x - that.screen.x;
		const Y = this.y - that.screen.y;
		this.body.forEach( v =>{
			that.ctx.fillRect((X + v.x) * that.screen.rect_width, (Y + v.y) * that.screen.rect_height,
					that.screen.rect_width, that.screen.rect_height);
		});
	}
}
