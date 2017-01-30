//import Map from './Map.js';
//import Player from './Player.js';

class Game{
	constructor(canvas){
		this.player = new Player();

		this.things = [];

		this.screen = new Screen(canvas);
	}
	draw(){
		this.ctx.clearRect(0,0,this.width,this.height);
		this.player.draw(this.ctx, this);
		this.things.forEach( v => {
			v.draw(this);
		}, this);
	}
	start(){
		this.player.events();
		this.getThings();
		this.drawing();
	}
	drawing(){
		this.draw();
		this.timerOut = window.setTimeout( () => this.drawing(), this.frame);
	}
	stop(){
		window.clearTimeout(this.timerOut);
	}
	getThings(){
		this.things = [
			new Thing({x: 264, y: 13}),
			new Thing({x: 164, y: 13}),
			new Thing({x: 204, y: 13}),
			new Thing({x: 24,  y:113})
		];
	}
};
