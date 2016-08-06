let g = {
	colors : ["white", "green","red","blue","orange"],
	keys : [],
	map : makeMat(40, 200),

	screen : {
		width: 50,
		height: 30,
		canvas : document.createElement('canvas'),

		draw(that){
			let a = that.p.x;
			let b = ( (a - 14) > 0) ? a : 0;
			for(let i = 0, l = this.y; i < this.height; i++, l++){
				for(let j = 0, k = b; j < this.width; j++, k++){
					let x = j * this.rect_width;
					//let y = (this.height - 1 - i) * this.rect_height;
					let y =  i * this.rect_height;
					that.ctx.fillStyle = that.colors[that.map[i][k]];
					that.ctx.fillRect(x, y, this.rect_width, this.rect_height);
				}
			}
		}
	},
	p : {
		x: 6,
		y: 6,
		body : bodys.square,
		jumpTop: JUMP_SIZE,
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
		draw(that){
//faut aussi gerer la hauteur et la fin (en longueur et hauteur)
			let h = that.screen.rect_height;
			let w = that.screen.rect_width;

			that.ctx.fillStyle = that.colors[2];
			let X = this.x > 15 ? 15 : this.x;
			let Y = this.y;
			this.body.forEach( v =>{
				that.ctx.fillRect((X + v.x) * w, (Y + v.y) * h, w, h);
			});
		}
	},
	clear(o, d){// l'objet concerner (un objet solid) et la direction au format {x,y}
		o.body.forEach((v, k)=>{
			if(o.y + v.y
			if(this.map[ o.y + v.y + d.y ][ o.x + v.x + d.x ] !== 0){
				return false;
			}
		});
		return true;
	},
	jump(){
		if(!this.p.is.jumping && !this.clear(this.p, direction.down) ){
			this.p.is.jumping = true;
			this.p.jumpStart = Date.now();
			this.p.jumpTop = this.p.y + JUMP_SIZE;
			this.jumping(this);
		}
	},
	jumping(that){
		if(that.p.is.jumping){
			if(that.p.y < that.p.jumpTop)
			{
				that.p.y++;
				//that.p.jumpSpeed += 2;//ralenti (+ 5ms)
				setTimeout(that.jumping, that.p.speed.jump, that);
			}
			else{
				that.p.is.jumping = false;
				that.p.is.falling = true;
				that.p.jumpTop = that.p.y + JUMP_SIZE;
				that.falling(that);
			}
			//return;
		}
		that.draw();
	},
	jumpEnd(){
//~~		if(this.p.is.jumping){
//~~			let t = Date.now() - this.p.timers["jump"];
//~~			this.p.jumpTop = JUMP_SIZE / MAX_JUMP_KEY_DOWN * t; //mouai jsuis pas sur ici
//~~		}
	},
	falling(that){
		if(!that.clear(that.p, direction.down) || that.p.is.jumping) {
			that.p.is.falling = false;
		}
		else{
			that.p.y--;
			//that.p.jumpSpeed -= 2;
			setTimeout(that.falling, that.p.speed.fall, that);
			that.draw();
		}
	},
	left(){
		if(!this.p.is.lefting && !this.p.is.righting){
			this.p.is.lefting = true;
			this.lefting(this); 
		}
	},
	lefting(that){
		if(that.clear(that.p, direction.left)){
		console.log("lefting");
			console.log('lefting');
			that.p.x--;
			that.draw();
			if(!that.p.is.falling && !that.p.is.jumping && that.clear(that.p, direction.down)){
				that.falling(that);
			}
		}
		that.p.timers.left = setTimeout(that.lefting, that.p.speed.side, that);
	},
	leftEnd(){
		this.p.is.lefting = false;
		clearTimeout(this.p.timers.left);
	},
	right(){
		if(!this.p.is.lefting && !this.p.is.righting){
			this.p.is.righting = true;
			this.righting(this); 
		}
	},
	righting(that){
		if(that.clear(that.p, direction.right) ){
			that.p.x++;
			that.draw();
			if(!that.p.is.falling && !that.p.is.jumping && that.clear(that.p, direction.down)){
				that.falling(that);
			}
		}
		that.p.timers.right = setTimeout(that.righting, that.p.speed.side, that);
	},
	rightEnd(){
		this.p.is.righting = false;
		clearTimeout(this.p.timers.right);
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
		//this.screen.display(this);
	}
};
