let g = {
	keys: [],//obliger de le declarer
//~~	p: [],
	p: {},
	map: new Map(),

	screen : {
		x: null,
		y: null,
		width: 100,
		height: 50,
		canvas : document.createElement('canvas'),
		ctx: {},
		colors : ["white", "green","red","blue","orange"],

		draw(that){
			this.x = ( that.p.x - this.width / 2 > 0) ? Math.trunc(that.p.x - this.width / 2) : 0;
			this.x = ( this.x > that.map.body[0].length - this.width) ? that.map.body[0].length - this.width : this.x;
			this.y = ( that.p.y - this.height / 3 > 0) ? Math.trunc(that.p.y - this.height / 3) : 0;
			this.y = ( this.y > that.map.body.length - this.height) ? that.map.body.length - this.height : this.y;
			for(let i = 0, l = this.y; i < this.height; i++, l++){
				for(let j = 0, k = this.x; j < this.width; j++, k++){
					let x = j * this.rect_width;
					let y =  i * this.rect_height;
					this.ctx.fillStyle = this.colors[that.map.body[l][k]];
					this.ctx.strokeStyle = "gray";
					this.ctx.strokeRect(x, y, this.rect_width, this.rect_height);
					this.ctx.fillRect(x, y, this.rect_width, this.rect_height);
				}
			}
		},
	},

	addPlayer(){
		let ref = this;
		//this.p.push(new Player(5, 1, 10, ref);
		//this.p.push(new Player(id du player...........);
		this.p = new Player(1,1, 5, ref);
	},
	draw(){
		this.screen.draw(this);
		this.p.draw();
	},
	init(){
		this.addPlayer();
		document.body.appendChild(this.screen.canvas);
		this.screen.ctx = this.screen.canvas.getContext('2d');
		this.keys[37] = "left";
		this.keys[32] = "jump";
		this.keys[38] = "jump";
		this.keys[39] = "right";
		document.addEventListener('keydown', (e)=>{
			if(this.keys[e.keyCode]){
				e.preventDefault();
				this.p[ this.keys[e.keyCode] ]();
			}
		});
		document.addEventListener('keyup', (e)=>{
			if(this.keys[e.keyCode]){
				e.preventDefault();
				let action = this.keys[e.keyCode] + "End"; 
				this.p[ action ]();
			}
		});
		this.screen.canvas.width = 500;
		this.screen.canvas.height = 300;
		this.screen.rect_width = parseInt(this.screen.canvas.width) / this.screen.width;
		this.screen.rect_height = parseInt(this.screen.canvas.height) / this.screen.height;
		this.draw();
	}
};
