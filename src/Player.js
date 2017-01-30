class Player{
	constructor(){
		this.x = 2;
		this.y = 2;
		this.size = 50;
		this.speed = 10;
		this.color = 'red';
		this.keys = [];//new Map/SET??????????????????????????????
		this.keys[37] = {x: -2, y: 0};
		this.keys[32] = "jump";
		this.keys[38] = "jump";
		this.keys[39] = {x: 2, y: 0};
	}
	events(screen){
		document.addEventListener('keydown', (e) => {
			if(this.keys[e.keyCode]){
				e.preventDefault();
				this.move(this.keys[e.keyCode]);
			}
		});
	}
	draw(ctx, screen){
		const X = (this.x < screen.width/2) ? this.x : screen.width/2;

		ctx.fillStyle = this.color;//en propriete????nop
		ctx.fillRect(X, this.y, this.size, this.size);
	}
	move(direction){
		this.x += direction.x * this.speed;
		this.y += direction.y * this.speed;
	}
}
