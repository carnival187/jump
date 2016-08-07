let g = {
	colors : ["white", "green","red","blue","orange"],
	keys: [],//obliger de le declarer
	map : MAP.make2(100, 200),

	screen : {
		x: null,
		y: null,
		width: 100,
		height: 50,
		canvas : document.createElement('canvas'),

		draw(that){
			this.x = ( that.p.x - this.width / 2 > 0) ? Math.trunc(that.p.x - this.width / 2) : 0;
			this.x = ( this.x > that.map[0].length - this.width) ? that.map[0].length - this.width : this.x;
			this.y = ( that.p.y - this.height / 3 > 0) ? Math.trunc(that.p.y - this.height / 3) : 0;
			this.y = ( this.y > that.map.length - this.height) ? that.map.length - this.height : this.y;
			for(let i = 0, l = this.y; i < this.height; i++, l++){
				for(let j = 0, k = this.x; j < this.width; j++, k++){
					let x = j * this.rect_width;
					let y =  i * this.rect_height;
					that.ctx.fillStyle = that.colors[that.map[l][k]];
					that.ctx.fillRect(x, y, this.rect_width, this.rect_height);
				}
			}
		},
	},
	p : {
		x: 5,
		y: 1,
		body : bodys.makeSquare(10),
		speed : {
			jump : 30,
			fall : 30,
			side: 60
		},
		timers : {},
		is: {//is.doing
			jumping: false,
			lefting: false,
			righting: false,
			falling: false,
		},
		move(d){
			this.x += d.x;
			this.y += d.y;
		},
		draw(that){
			that.ctx.fillStyle = that.colors[2];
			let X = this.x - that.screen.x;
			let Y = this.y - that.screen.y;
			this.body.forEach( v =>{
				that.ctx.fillRect((X + v.x) * that.screen.rect_width, (Y + v.y) * that.screen.rect_height,
						that.screen.rect_width, that.screen.rect_height);
			});
		}
	},
	clear(o, d){
		let r = true;
		o.body.forEach((v)=>{
			let y =  o.y + v.y + d.y;
			let x =  o.x + v.x + d.x;
			if(y < 0 || x < 0 || this.map[y][x] !== 0){
				r = false;
			}
		});
		return r;
	},
	move(o, d){
		o.x += d.x;
		o.y += d.y;
		this.draw();
	},
	side(strDirection){
		
	},
	siding(strDirection){
		let directing = strDirection + "ing";
		if(this.p.is[directing]){
			this.move(this.p, direction[strDirection]);
		}
	},
	jump(){
		if(!this.p.is.jumping && !this.p.is.falling){
			this.p.is.jumping = true;
			this.p.jumpSize = JUMP_SIZE;
			this.jumping(this);
		}
	},
	left(){
		if(!this.p.is.lefting){
			this.p.is.righting = false;
			this.p.is.lefting = true;
			this.lefting(this); 
		}
	},
	right(){
		if(!this.p.is.righting){
			this.p.is.lefting = false;
			this.p.is.righting = true;
			this.righting(this); 
		}
	},
	lefting(that){
		if(that.clear(that.p, direction.left)){
			that.move(that.p, direction.left);
			if(!that.p.is.falling && !that.p.is.jumping && that.clear(that.p, direction.down)){
				that.p.is.falling = true;//j'm bin sans aussi
				that.falling(that);
			}
		}
		that.p.timers.left = setTimeout(that.lefting, that.p.speed.side, that);
	},
	righting(that){
		if(that.clear(that.p, direction.right) ){
			that.move(that.p, direction.right);
			if(!that.p.is.falling && !that.p.is.jumping && that.clear(that.p, direction.down)){
				that.p.is.falling = true;//j'm bin sans aussi
				that.falling(that);
			}
		}
		that.p.timers.right = setTimeout(that.righting, that.p.speed.side, that);
	},
	jumping(that){
		if(that.p.jumpSize > 0)
		{
			that.p.jumpSize--;
			if(that.clear(that.p, direction.up)){
				that.move(that.p, direction.up);
			}
			setTimeout(that.jumping, that.p.speed.jump, that);
		}
		else{
			that.p.is.jumping = false;
			that.p.is.falling = true;
			that.falling(that);
		}
	},
	leftEnd(){
		this.p.is.lefting = false;
		clearTimeout(this.p.timers.left);
	},
	rightEnd(){
		this.p.is.righting = false;
		clearTimeout(this.p.timers.right);
	},
	jumpEnd(){},
	falling(that){
		if(!that.clear(that.p, direction.down) || that.p.is.jumping) {
			that.p.is.falling = false;
		}
		else{
			that.move(that.p, direction.down);
			setTimeout(that.falling, that.p.speed.fall, that);
		}
	},

	draw(){
		this.screen.draw(this);
		this.p.draw(this);
	},
	init(){
		document.body.appendChild(this.screen.canvas);
		this.ctx = this.screen.canvas.getContext('2d');
		this.keys[37] = "left";
		this.keys[32] = "jump";
		this.keys[38] = "jump";
		this.keys[39] = "right";
		document.addEventListener('keydown', (e)=>{
			if(this.keys[e.keyCode]){
				e.preventDefault();
				//this.p.times[ this.keys[e.keyCode] ] = Date.now();
				this[ this.keys[e.keyCode] ]();//this.p[ this.keys[e.keyCode] ](this);
			}
		});
		document.addEventListener('keyup', (e)=>{
			if(this.keys[e.keyCode]){
				e.preventDefault();
				let action = this.keys[e.keyCode] + "End"; 
				this[ action ]();
				this.draw();
			}
		});
		this.screen.rect_width = parseInt(this.screen.canvas.width) / this.screen.width;
		this.screen.rect_height = parseInt(this.screen.canvas.height) / this.screen.height;
		this.draw();
	}
};
