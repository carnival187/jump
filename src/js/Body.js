export default class Body{

	constructor(options)
	{
		this.x = options.x;
		this.y = options.y;
		this.color = options.color;
		this.bounce = 0;//le rebondi 0 <= bounce <= 1
	}
	pythagore(x,y)
	{
		return (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y) < this.rayon * this.rayon;
	}
}
