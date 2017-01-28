class Game{
	construct(){
		this.screen = new Screen();
		this.map = new Map();
		this.players = [];
		this.keys: [],//obliger de le declarer

	},
	addPlayer(player = new Player()){
		this.p.push(player);
	},
	draw(){
		this.screen.draw(this);
		this.players.forEach( v => {
			v.draw();
		}, this);
	},
	start(){
		this.addPlayer(/*id du membre connecté*/);
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
