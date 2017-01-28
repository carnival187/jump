class Player{
	constructor(){
		this.x = 1;
		this.y = 1;
		this.size = 10;
		this.color = 'red';
		this.keys = [];//new Map??????????????????????????????
		this.keys[37] = "left";
		this.keys[32] = "jump";
		this.keys[38] = "jump";
		this.keys[39] = "right";
	}
	events(){
		document.addEventListener('keydown', (e) => {
			if(this.keys[e.keyCode]){
				e.preventDefault();
				this[ this.keys[e.keyCode] ]();
			}
		});
		document.addEventListener('keyup', (e)=>{
			if(this.keys[e.keyCode]){
				e.preventDefault();
				let action = this.keys[e.keyCode] + "End"; 
				this[ action ]();
			}
		});
	}
	draw(ctx){
		ctx.fillStyle = this.color;
	}
}
