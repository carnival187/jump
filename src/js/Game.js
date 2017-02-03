import Player from './Player.js';
import Thing from './Thing.js';
import Screen from './Screen.js';

export default class Game{
	constructor(canvas){

		this.screen = new Screen(canvas);
		this.player = new Player(this.screen);

		this.things = [];

	}
	draw(){
		this.screen.ctx.clearRect(0,0,this.screen.width,this.screen.height);

		this.player.draw();

		this.things.forEach( v => {
			v.draw(this);
		}, this);
	}
	update(){
		this.player.update(this.things);
	}
	playing(self){
		self.update();
		self.draw();
		self.timerOut = window.setTimeout(self.playing, self.screen.frame, self);
	}
	start(){
		this.player.events(this.screen);
		this.getThings();
		this.playing(this);
	}
	stop(){
		window.clearTimeout(this.timerOut);
	}
	getThings(){
		this.things = [
			//new Thing({x: 264, y: 13}),
			//new Thing({x: 164, y: 13}),
			//new Thing({x: 204, y: 13}),
			new Thing({x: 24,  y:113})
		];
	}
};
