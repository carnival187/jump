export default class Position{
	constructor(x = 0, y = 0){
		this.x = x;
		this.y = y;
	}

	//get x(){ return this.x; }
	//get y(){ return this.y; }

	set x(x){ this.x = (x > 0) ? x : 0; }
	set y(y){ this.y = (y > 0) ? y : 0; }
}
