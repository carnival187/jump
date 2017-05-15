import Rectangle from './Rectangle.js';
import Circle from './Circle.js';

export default class Player
{
	constructor(options)
	{
		this.body = new Rectangle(options);
		this.keys = new Map();
		this.keys.set(37, "left");
		this.keys.set(74, "left");
		this.keys.set(39, "right");
		this.keys.set(78, "right");
		this.keys.set(38, "jump");
		this.keys.set(32, "jump");
		this.is = {};
		this.up = 21;
		this.acceleration = 4;
		this.speed = 10;
		this.weight = 4;
		this.direction = {x:0,y:0};
	}
	events()
	{
		document.addEventListener('keydown', (e) => {
			if(this.keys.get(e.keyCode)){
				e.preventDefault();
				this[this.keys.get(e.keyCode)]();
			}
		});
		document.addEventListener('keyup', (e) => {
			if(this.keys.get(e.keyCode * 2)){
				e.preventDefault();
				const a = this.keys.get(e.keyCode * 2);
				this.is[a + 'ing'] = false;
			}
		});
	}
	draw(screen)
	{
		const X = (this.body.x < screen.width / 2) ? this.body.x : screen.width / 2;
		this.body.draw(screen, X);
	}
	gravity()
	{
		if(!(this.is.lefting || this.is.righting))
		{
			this.direction.x -= Math.sign(this.direction.x) * this.weight;
		}
		if(this.is.jumping)
		{
			this.direction.y -= this.weight;
			if(this.direction.y < 0)
			{
				this.direction.y = 0;
				this.is.jumping = false;
				this.is.falling = true;
			}
		}
		else if(this.is.falling)
		{
			this.direction.y -= this.weight;
		}
	}
	update(things)
	{
		this.gravity();
		this.body.x += this.direction.x;
		this.body.x = (this.body.x < 0) ? 0 : this.body.x;
		this.body.y += this.direction.y;
		this.body.y = (this.y < 0) ? 0 : this.body.y;
		const arr = [];
		for(let v of things)
		{
			if(this.body[v.body.type](v.body))
			{
				arr.push(v);
				do{
					this.body.y -= Math.sign(this.direction.y);
					this.body.x -= Math.sign(this.direction.x);
				}while(this.body[v.body.type](v.body));
			}
		}
		this.is.falling = this.fall(arr);
	}
	fall(things)
	{
		this.is.falling = true;
		if(this.body.y <= 0)
		{
			this.body.y = 0;
			this.direction.y = 0;
			return false;
		}
		if(things.length > 0)
		{
			for(let v of things)
			{
				if(this.body.y == v.body.y + v.body.height)
				{
					console.log("on something");
					this.direction.y = 0;
					return false;
				}
			}
		}
		return true;
	}
	left(){
		this.direction.x -= this.direction.x > this.speed * -1 ? this.acceleration : 0;
		this.is.lefting = true;
	}
	right(){
		this.direction.x += this.direction.x < this.speed ? this.acceleration : 0;
		this.is.righting = true;
	}
	jump(){
		if(!(this.is.jumping || this.is.falling))
		{
			this.direction.y = this.up;
			this.is.jumping = true;
		}
	}
}
