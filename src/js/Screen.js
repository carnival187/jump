export default class Screen
{
	constructor(canvas)
	{
		this.x = this.y = 0;
		this.width = canvas.width;
		this.height = canvas.height;
		this.frame = 30;
		this.ctx = canvas.getContext('2d');
	}
}
