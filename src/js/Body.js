import Position from "./Position.js";

export default class Body extends Position{

	constructor(options){
		super(options.x, options.y);
		this.color = options.color;
	}
}
