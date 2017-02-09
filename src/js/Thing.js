import Rectangle from "./Rectangle.js";
import Circle from "./Circle.js";

export default class Thing{

	constructor(options){
		super(options);
		this.body = new Rectangle(options);
	}
}
