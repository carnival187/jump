class Map{
	constructor(){
		this.start = { x: 0, y: 0};
		this.end = { x: 0, y: 0};
		
		this.things = [];
	}

	draw(cxt){
		this.things.forEach( v => {
			v.draw(ctx);
		}, this);
	}
}
