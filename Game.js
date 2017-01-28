class Game{
	constructor(){
		//this.screen = new Screen();
		this.map = new Map();
		this.players = [];

		this.width = 100;
		this.height = 50;
		this.ctx = canvas.getContext('2d');
		this.draw();
	}

	addPlayer(player = new Player()){
		this.players.push(player);
	}
	draw(){
		this.map.draw(this.ctx);
		this.players.forEach( v => {
			v.draw(this.ctx);
		}, this);
	}
	start(){
		this.players.forEach( v => {
			v.events();
		});
	}
};
