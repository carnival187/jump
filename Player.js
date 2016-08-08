class Player{
	constructor(x, y, size, that){
		this.x = x;
		this.y = y;
		this.body = bodys.makeSquare(size);
		this.is = {};
		this.timers = {};
		this.g = that;
		console.log(this.g.colors);
	}
	draw(){
		let screen = this.g.screen;
		screen.ctx.fillStyle = screen.colors[2];
		const X = this.x - screen.x;
		const Y = this.y - screen.y;
		this.body.forEach( v =>{
			screen.ctx.fillRect((X + v.x) * screen.rect_width, (Y + v.y) * screen.rect_height,
					screen.rect_width, screen.rect_height);
		});
	}
	clear(d){
		return this.body.every( (v)=>{
			const Y =  this.y + v.y + d.y;
			const X =  this.x + v.x + d.x;
			return !(Y < 0 || X < 0 || MAP[Y][X] !== 0);
		});
	}
	vertical(y){
		if(y !== 0){
			let t = [];
			this.body.forEach( v, k =>{
				t[k] = 0;
				for(let i = 1; i <= Math.abs(y); i++){
					if(MAP[this.y + i][this.x] === 0){
						t[k] += Math.sign(y);
					}
					else{
						break;
					}
				}
			}, this);
			return Math.min(...t);
		}
		return 0;
	}
	horizontal(x){
		if(x !== 0){
			let t = [];
			this.body.forEach( v, k =>{
				t[k] = 0;
				for(let i = 1; i <= Math.abs(x); i++){
					if(MAP[this.y][this.x + i] === 0){
						t[k] += Math.sign(x);
					}
					else{
						break;
					}
				}
			}, this);
			return Math.min(...t);
		}
		return 0;
	}
	move(d){
		this.x += d.x;
		this.y += d.y;
		this.g.draw();
	}

	jump(){
		if(!this.is.jumping && !this.is.falling){
			this.is.jumping = true;
			this.jumpSize = JUMP_SIZE;
			this.jumping(this);
		}
	}
	left(){
		if(!this.is.lefting && !this.is.righting){
			this.is.lefting = true;
			this.lefting(this); 
		}
	}
	right(){
		if(!this.is.lefting && !this.is.righting){
			this.is.righting = true;
			this.righting(this); 
		}
	}
	fall(){
		if(!this.is.jumping && !this.is.falling) {
			this.is.falling = true;
			this.falling(this);
		}
	}
	falling(me){
		if(me.clear(direction.down)) {
			me.move(direction.down);
			setTimeout(me.falling, TIMEOUT, me);
		}
		else{
			me.is.falling = false;
		}
	}
	lefting(me){
		if(me.clear(direction.left)){
			me.move(direction.left);
			me.fall();
		}
		me.timers.left = setTimeout(me.lefting, TIMEOUT, me);
	}
	righting(me){
		if(me.clear(direction.right) ){
			me.move(direction.right);
			me.fall();
		}
		me.timers.right = setTimeout(me.righting, TIMEOUT, me);
	}
	jumping(me){
		if(me.jumpSize > 0)
		{
			me.jumpSize--;
			if(me.clear(direction.up)){
				me.move(direction.up);
			}
			setTimeout(me.jumping, TIMEOUT, me);
		}
		else{
			me.is.jumping = false;
			me.is.falling = true;
			me.falling(me);
		}
	}
	leftEnd(){
		this.is.lefting = false;
		clearTimeout(this.timers.left);
	}
	rightEnd(){
		this.is.righting = false;
		clearTimeout(this.timers.right);
	}
	jumpEnd(){}
}
