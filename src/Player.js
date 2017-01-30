class Player{
	constructor(screen){
		this.screen = screen;
		this.x = 2;
		this.y = 2;
		this.size = 50;
		this.speed = 10;
		this.color = 'red';
		this.keys = [];//new Map/SET??????????????????????????????
		this.keys[37] = "left";
		this.keys[32] = "jump";
		this.keys[38] = "jump";
		this.keys[39] = "right";
		this.is = {};
		this.up = 56;
	}
	events(){
		document.addEventListener('keydown', (e) => {
			if(this.keys[e.keyCode]){
				e.preventDefault();
				this[this.keys[e.keyCode]]();
			}
		});
		//document.addEventListener('keydown', (e) => { });
	}
	draw(){
		const X = (this.x < this.screen.width/2) ? this.x : this.screen.width/2;

		this.screen.ctx.fillStyle = this.color;//en propriete????nop
		this.screen.ctx.fillRect(X, this.y, this.size, this.size);
	}
	move(direction){
		this.x += direction.x * this.speed;
		this.x = (this.x < 0) ? 0 : this.x;
		this.y += direction.y * this.speed;
		this.y = (this.y < 0) ? 0 : this.y;
		this.screen.x = (this.x - this.screen.width / 2);
	}
	left(){ this.move({x: -2, y: 0}); }
	right(){ this.move({x: 2, y: 0}); }

	falling(){
		if(this.y > 0){
			this.move({x: 0, y: -2});
			window.setTimeout(this.falling, 100);
		}
	}

	jumping(up){
		if(up < this.up){
			this.move({x:0, y: 1});
			window.setTimeout((up) => this.jumping(), 100, up + 1);
			console.log('jumping');
		}
		else{
			this.falling();
		}
	}
	jump(){
		this.jumping(0);
	}
}
