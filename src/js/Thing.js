import Rectangle from "./Rectangle.js";
import Circle from "./Circle.js";

export default class Thing
{
	constructor(options)
	{
		this.body = new Rectangle(options);
		this.events();
		//switch(options.type)
		//{
			//case "circle":
				//this.body = new Circle(options);
			//break;
			//default:
				//this.body = new Rectangle(options);
			//break;
		//}
	}
	update(player){
		if(this.up)
		{
			this.body.y++;
		}
		else if(this.down)
		{
			this.body.y--;
		}
	}
	events()
	{
		document.addEventListener('keydown', (e) => {
			if(e.keyCode == 65)
			{
				console.log("uuuuuuup");
				this.up = true;
			}
			else if(e.keyCode == 90)
			{
				this.down = true;
			}
		});
		document.addEventListener('keyup', (e) => {
			if(e.keyCode == 65)
			{
				console.log("down");
				this.up = false;
			}
			else if(e.keyCode == 90)
			{
				this.down = false;
			}
		});
	}
}
