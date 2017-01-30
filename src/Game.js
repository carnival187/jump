//import Player from './Player.js';

class Game{
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
	start(){
		this.player.events(this.screen);
		this.getThings();
		this.drawing();
	}
	drawing(){
		this.draw();
		this.timerOut = window.setTimeout( () => this.drawing(), this.screen.frame);
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
	events(){
		document.addEventListener('keydown', (e) => {
			if(this.keys[e.keyCode]){
				e.preventDefault();
				this.player.move(this.keys[e.keyCode]);
				this.screen.move(this.keys[e.keyCode]);
			}
		});
	}
};
