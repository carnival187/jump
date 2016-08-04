let makeMat = function(x, y, value = 0){
	let mat = [];
	for(let i = 0; i < x; i++){
		mat[i] = [];
		for(let j = 0; j < y; j++){
			if(i == 0 || j == 0 || i == x-1 || j == y-1 || j%10 == 0 && i < x/4){
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
	map : makeMat(30, 400),

	screen : {
		x: 0,
		y: 0,
		width: 50,
		height: 30,
		canvas : document.createElement('canvas'),

		display(that){
			let s = "";
			for(let i = 0, l = this.y; i < this.height; i++, l++){
				for(let j = 0, k = this.x; j < this.width; j++, k++){
					s += that.map[l][k];
				}
				s += "<br>";
			}
			let div = document.createElement('div');
			div.innerHTML = s;
			document.body.appendChild(div);
		},
		draw(that){
			for(let i = 0, l = this.y; i < this.height; i++, l++){
				for(let j = 0, k = this.x; j < this.width; j++, k++){
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
		y: 1,
		state : "floor",
		jumpMax: 10,
		jumpSpeed: 100,

		allow(map){
			return (map[this.y][this.x] == 0);
		},
		draw(that){
			let w = that.screen.rect_width;
			let h = that.screen.rect_height;
			that.ctx.fillStyle = that.colors[2];
			that.ctx.fillRect(this.x * w, this.y * h, w, h);
		}
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
				this[ this.keys[e.keyCode] ]();//this.p[ this.keys[e.keyCode] ](this);
				this.draw();
			}
		});
		document.addEventListener('keyup', (e)=>{
			if(e.keyCode === 32){
				r = Math.round((Date.now() - this.p.jumpStart) / this.map.length ); // -1????????
				this.p.jumpMax = (r <= 10) ? r : 10;
			}
		});
		this.screen.rect_width = parseInt(this.screen.canvas.width) / this.screen.width;
		this.screen.rect_height = parseInt(this.screen.canvas.height) / this.screen.height;
		this.p.y = this.screen.height - 2;
		this.draw();
		this.screen.display(this);
	},
	jump(){
		if(this.p.state === 'floor')
		{
			this.p.jumpStart = Date.now();
			this.p.state = 'up';
			this.jumping(this);
		}
	},
	jumping(that){
		if(that.p.state === 'up'){
			if(that.p.y >= that.p.jumpMax)
			{
				that.p.state = 'down';
			}
			else{
				that.p.y++;
				that.p.jumpSpeed += 2;//ralenti (+ 5ms)
			}
			//return;
		}
		else if(that.p.y > 0) {
			that.p.y--;
			that.p.jumpSpeed -= 2;
		}
		else{
			that.p.state = 'floor';
			return;
		}
		that.p.jumpTimer = setTimeout(that.jumping, that.p.jumpSpeed, that);
		that.draw();
	},
	left(){
		if(this.screen.x > 0){
			this.screen.x--;
			this.p.x--;
		}
	},
	right(){
		this.screen.x++;
		this.p.x++;
	},
	draw(){
		this.screen.draw(this);
		this.p.draw(this);
	}
};
g.init();
