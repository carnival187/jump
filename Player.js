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
		if(!this.is.lefting){
			this.is.righting = false;
			this.is.lefting = true;
			this.lefting(this); 
		}
	}
	right(){
		if(!this.is.righting){
			this.is.lefting = false;
			this.is.righting = true;
			this.righting(this); 
		}
	}
	lefting(me){
		if(me.clear(direction.left)){
			me.move(direction.left);
			if(!me.is.falling && !me.is.jumping && me.clear(direction.down)){
				me.is.falling = true;//j'm bin sans aussi
				me.falling(me);
			}
		}
		me.timers.left = setTimeout(me.lefting, TIMEOUT, me);
	}
	righting(me){
		if(me.clear(direction.right) ){
			me.move(direction.right);
			if(!me.is.falling && !me.is.jumping && me.clear(direction.down)){
				me.is.falling = true;//j'm bin sans aussi
				me.falling(me);
			}
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
	fall(){
		if(!this.is.jumping) {
			this.is.falling = true;
			this.falling(this);
		}
	}
	falling(me){
		if(me.is.jumping || !me.clear(direction.down)) {
			me.is.falling = false;
		}
		else{
			me.move(direction.down);
			setTimeout(me.falling, TIMEOUT, me);
		}
	}
}
