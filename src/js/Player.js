import Direction from './Direction.js';
import Position from './Position.js';

export default class Player{
	constructor(screen){
		this.screen = screen;
		this.x = 2;
		this.y = 2;
		this.size = 50;
		this.width = 50;
		this.height = 50;
		this.weight = 2;
		this.color = 'red';
		this.keys = new Map();
		this.keys.set(37, new Direction("left"));
		this.keys.set(38, new Direction("jump"));
		this.keys.set(39, new Direction("right"));
		this.keys.set(32, new Direction("jump"));
		this.is = {};
		this.up = 15;
		this.direction = new Position();//////////////////////////////////////
	}
	events(){
		document.addEventListener('keydown', (e) => {
			if(this.keys.get(e.keyCode)){
				e.preventDefault();
				const a = this.keys.get(e.keyCode);
				this[a.name]();
			}
		});
		document.addEventListener('keyup', (e) => {
			if(this.keys.get(e.keyCode)){
				e.preventDefault();
				const a = this.keys.get(e.keyCode);
				this.is[a.name + 'ing'] = false;
			}
		});
	}
	draw(){
		const X = (this.x < this.screen.width/2) ? this.x : this.screen.width/2;

		this.screen.ctx.fillStyle = this.color;
		this.screen.ctx.fillRect(X, this.y, this.size, this.size);
	}
	gravity(){
		if(!(this.is.lefting || this.is.righting)){
			this.direction.x -= Math.sign(this.direction.x) * this.weight;
		}
		if(this.is.jumping){
			this.direction.y -= 2;
			if(this.direction.y <= 0){
				this.direction.y = 0;
				this.is.jumping = false;
			}
		}
		else{
			this.direction.y = (this.y > 0) ? -this.weight : 0;	
		}
	}
	update(things){
		this.gravity();
		this.x += this.direction.x;
		this.x = (this.x < 0) ? 0 : this.x;
		this.y += this.direction.y;
		this.y = (this.y < 0) ? 0 : this.y;
		for(let v of things){
			//if(this.body.collision[v.name](v)){
			if(this.collision(v)){
				console.log(
`x ${this.x} y: ${this.y} w: ${this.width} h: ${this.height}
 x: ${v.x} y: ${v.y}
 `)

			}
		}
		this.screen.x = (this.x - this.screen.width / 2);
	}
	collision(thing){
		return !(this.x >= thing.x + thing.width ||
			this.x + this.width <= thing.x ||
			this.y >= thing.y + thing.height ||
			this.y + this.height <= thing.y);
	}

	left(){
		this.direction.x -= 2;
		this.is.lefting = true;
	}
	right(){
		this.direction.x += 2;
		this.is.righting = true;
	}
	jump(){
		this.direction.y = this.up;
		this.is.jumping = true;
	}
}