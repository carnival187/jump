class Thing{
	constructor(options){
		this.x = options.x;
		this.y = options.y;
		this.color = options.color || 'green';
		this.size = options.size || 54;
	}

	draw(game){
		const X = Math.abs(this.x - game.player.x);
		if(X < screen.width / 2)
		{
			game.ctx.fillStyle = this.color;
			game.ctx.fillRect(this.x - screen.x, this.y, this.size, this.size);
		}
	}
}
