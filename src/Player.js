class Player{
	constructor(screen){
		this.screen = screen;
		this.x = 2;
		this.y = 2;
		this.size = 50;
		this.color = 'red';
		this.keys = new Map();
		this.keydown = new Map();
		this.keys.set(37, "left");
		this.keydown.set("left", false);
		this.keys.set(32, "jump");
		this.keys.set(38, "jump");
		this.keydown.set("jump", false);
		this.keys.set(39, "right");
		this.keydown.set("right", false);
		};
		this.is = {};
		this.up = 5;
		this.direction = new Direction();
	}
	events(){
		document.addEventListener('keydown', (e) => {
			if(this.keys.get(e.keyCode)){
				e.preventDefault();
				const a = this.keys.get(e.keyCode);
				this[a]();
				this.kewdown.set(a, true);
			}
		});
		document.addEventListener('keydown', (e) => {
			if(this.keys.get(e.keyCode)){
				e.preventDefault();
				this.kewdown.set(this.keys.get(e.keyCode), false);
			}
		});
	}
	draw(){
		const X = (this.x < this.screen.width/2) ? this.x : this.screen.width/2;

		this.screen.ctx.fillStyle = this.color;
		this.screen.ctx.fillRect(X, this.y, this.size, this.size);
	}
	gravity(){
		this.keydown.forEach( (v,k) => {
			
		});
	}
	update(direction){
		this.x += this.direction.x;
		this.x = (this.x < 0) ? 0 : this.x;
		this.y += this.direction.y;
		this.y = (this.y < 0) ? 0 : this.y;

		this.screen.x = (this.x - this.screen.width / 2);
	}

	left(){ this.direction.x -= 2; }
	right(){ this.direction.x += 2; }

	falling(self){
		if(self.y > 0){
			self.move({x: 0, y: -2});
			window.setTimeout(self.falling, 100, self);
		}
	}

	jumping(self, up){
		if(up < self.up){
			self.move({x:0, y: 1});
			window.setTimeout(self.jumping, 100, self, up + 1);
			console.log('jumping');
		}
		else{
			self.falling(self);
		}
	}
	jump(){
		this.jumping(this, 0);
	}
}
