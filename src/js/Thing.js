import Rectangle from "./Rectangle.js";
import Circle from "./Circle.js";

export default class Thing
{
	constructor(options)
	{
		this.body = new Rectangle(options);
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
}
