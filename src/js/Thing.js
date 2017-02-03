export default class Thing{
	constructor(options){
		this.x = options.x;
		this.y = options.y;
		this.color = options.color || 'green';
		this.width = options.width || 54;
		this.height = options.height || 54;
	}

	draw(game){
		const screen = game.screen;
		const ctx = screen.ctx;
		const X = Math.abs(this.x - game.player.x);

		if(X < screen.width / 2)
		{
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x - screen.x, this.y, this.width, this.height);
		}
	}
}
