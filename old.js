const JUMP_SIZE = 10;
const MAX_JUMP_KEY_DOWN = 300;
let makeMat = function(x, y, value = 0){
	let mat = [];
	for(let i = 0; i < x; i++){
		mat[i] = [];
		for(let j = 0; j < y; j++){
			if(i == 0 || j == 0 || i == x-1 || j == y-1 || j%15 == 0 && i < x/5){
				mat[i][j] = 1;
			}else{
				mat[i][j] = value;
			}
		}
	}
	return mat;
};
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
		jumpTop: JUMP_SIZE,
		jumpSpeed: 50,
		speed : {
			jump : 50,
			side: 50
		},
		timers : {
			jump : null,
			left: null
		},
		is: {//is.doing
			jumping: false,
			lefting: false,
			righting: false,
			falling: false,
			onFloor(that){
				return (that.map[ that.p.y -1 ][ that.p.x ] !== 0);
			}
		},
		allow(map){
			return (map[this.y][this.x] == 0);
		},
		draw(that){
//faut aussi gerer la hauteur et la fin (en longueur et hauteur)
			let h = that.screen.rect_height;

			let X = this.x > 15 ? 15 : this.x;
			let Y = this.y > 15 ? 15 : this.x;
			that.ctx.fillStyle = that.colors[2];
			that.ctx.fillRect(X * that.screen.rect_width, this.y * h,
				that.screen.rect_width, h);
		}
	},

	jump(){
		if(this.p.is.onFloor(this) ){
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
				that.p.jumpSpeed += 2;//ralenti (+ 5ms)
				setTimeout(that.jumping, that.p.jumpSpeed, that);
			}
			else{
				that.p.is.jumping = false;
				that.p.jumpTop = that.p.y + JUMP_SIZE;
				that.falling(that);
			}
			//return;
		}
		that.draw();
	},
	jumpEnd(){
		if(this.p.is.jumping){
			let t = Date.now() - this.p.timers["jump"];
			this.p.jumpTop = JUMP_SIZE / MAX_JUMP_KEY_DOWN * t; //mouai jsuis pas sur ici
		}
	},
	falling(that){
		if(!that.p.is.onFloor(that) && !that.p.is.jumping) {
			that.p.y--;
			that.p.jumpSpeed -= 2;
			setTimeout(that.falling, that.p.jumpSpeed, that);
			that.draw();
		}
	},
	left(){
		if(!this.p.is.lefting){
			this.p.is.lefting = true;
			this.lefting(this); 
		}
	},
	lefting(that){
		if(that.map[ that.p.y ][ that.p.x -1] === 0){
			that.p.x--;
			that.draw();
			if(!that.p.is.falling){
				that.falling(that);
			}
			that.p.timers.left = setTimeout(that.lefting, that.p.speed.side, that);
		}
	},
	leftEnd(){
		this.p.is.lefting = false;
		clearTimeout(this.p.timers.left);
	},
	right(){
		if(!this.p.is.righting){
			this.p.is.righting = true;
			this.righting(this); 
		}
	},
	righting(that){
		if(that.map[ that.p.y ][ that.p.x +1] === 0){
			that.p.x++;
			that.draw();
			if(!that.p.is.falling){
				that.falling(that);
			}
			that.p.timers.right = setTimeout(that.righting, that.p.speed.side, that);
		}
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
				this.p.timers[ this.keys[e.keyCode] ] = Date.now();
				this[ this.keys[e.keyCode] ]();//this.p[ this.keys[e.keyCode] ](this);
				this.draw();
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
g.init();
