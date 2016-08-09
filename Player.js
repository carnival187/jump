class Player{
	constructor(x, y, size, that){
		this.x = x;
		this.y = y;
		this.body = bodys.makeSquare(size);
		this.is = {};
		this.speed = {};
		this.timers = {};
		this.g = that;
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
			return !(Y < 0 || X < 0 || this.that.map.body[Y][X] !== 0);
		});
	}
	vertical(y){
		if(y !== 0){
			let t = [];
			const u = Math.sign(y);
			for(let v of this.body){
				let k = 0;
				for(let i = u; i !== y; i += u){
					if(Array.isArray(this.g.map.body[this.y + v.y + i]) && this.g.map.body[this.y + v.y + i][this.x + v.x] === 0){
						k += u;
					}
					else{
						break;
					}
				}
				if(k === 0){return 0;}
				t.push(k);
			}
			let r = (u > 0) ? Math.min(...t) : Math.max(...t);
			return r;
		}
		return 0;
	}
	horizontal(x){
		if(x !== 0){
			let t = [];
			const u = Math.sign(x);
			for(let v of this.body){
				let k = 0;
				for(let i = u; i !== x; i += u){
					if(Array.isArray(this.g.map.body[this.y + v.y]) && this.g.map.body[this.y + v.y][this.x + v.x + i] === 0){
						k += u;
					}
					else{
						break;
					}
				}
				if(k === 0){return 0;}
				t.push(k);
			}
			let r = (u > 0) ? Math.min(...t) : Math.max(...t);
			return r;
		}
		return 0;
	}
	move(d, jp = false){
		const r = {
			x: this.horizontal(d.x),
			y: this.vertical(d.y) 
		};
		if(r.x !== 0 || r.y !== 0){
			this.x += r.x;
			this.y += r.y;
			this.g.draw();
			return true;
		}
		return false;
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
		if(me.move(direction.down)) {
			setTimeout(me.falling, TIMEOUT, me);
		}
		else{
			me.is.falling = false;
		}
	}
	lefting(me){
		if(me.move(direction.left)){
			me.fall();
		}
		me.timers.left = setTimeout(me.lefting, TIMEOUT, me);
	}
	righting(me){
		if(me.move(direction.right) ){
			me.fall();
		}
		me.timers.right = setTimeout(me.righting, TIMEOUT, me);
	}
	jumping(me){
		if(me.jumpSize > 0)
		{
			me.jumpSize--;
			me.move(direction.up);
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
