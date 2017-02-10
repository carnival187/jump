import Player from './Player.js';
import Thing from './Thing.js';
import Screen from './Screen.js';
import Service from './Service.js';

export default class Game{
	constructor(canvas){

		this.screen = new Screen(canvas);
		this.player = new Player(Service.getPlayerOption());

		this.things = Service.getThings();

	}
	draw(){
		this.screen.ctx.clearRect(0,0,this.screen.width,this.screen.height);

		this.player.body.draw(this.screen);

		this.things.forEach( v => {
			v.body.draw(this.screen, v.body.x - this.screen.x, v.body.y - this.screen.y);
		}, this);
	}
	update(){
		this.player.update(this.things);
		const X = this.player.body.x - this.screen.width / 2;
		this.screen.x = X > 0 ? X : 0;
	}
	playing(self){
		self.update();
		self.draw();
		self.timerOut = window.setTimeout(self.playing, self.screen.frame, self);
	}
	start(){
		this.player.events();
		this.playing(this);
	}
	stop(){
		window.clearTimeout(this.timerOut);
	}
};
