class Screen{
	construct(){
		this.width = 100;
		this.height = 50;
		let canvas = document.createElement('canvas'),
		canvas.width = 500;
		canvas.height = 300;
		document.body.appendChild(canvas);
		this.ctx = canvas.getContext('2d');
		this.rect_width = parseInt(this.screen.canvas.width) / this.screen.width;
		this.rect_height = parseInt(this.screen.canvas.height) / this.screen.height;
	},
	draw(that){
		this.x = ( that.p.x - this.width / 2 > 0) ? Math.trunc(that.p.x - this.width / 2) : 0;
		this.x = ( this.x > that.map.body[0].length - this.width) ? that.map.body[0].length - this.width : this.x;
		this.y = ( that.p.y - this.height / 2 > 0) ? Math.trunc(that.p.y - this.height / 2) : 0;
		this.y = ( this.y > that.map.body.length - this.height) ? that.map.body.length - this.height : this.y;
		for(let i = 0, l = this.y; i < this.height; i++, l++){
			for(let j = 0, k = this.x; j < this.width; j++, k++){
				let X = j * this.rect_width;
				let Y =  (this.height - i - 1) * this.rect_height;
				this.ctx.fillStyle = this.colors[that.map.body[l][k]];
				//this.ctx.strokeStyle = "gray";
				//this.ctx.strokeRect(x, y, this.rect_width, this.rect_height);
				this.ctx.fillRect(X, Y, this.rect_width, this.rect_height);
			}
		}
	}
}
