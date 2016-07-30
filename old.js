
let makeMat = function(x, y, value = 0){
	let mat = [];
	for(let i = 0; i < x; i++){
		mat[i] = [];
		for(let j = 0; j < y; j++){
			if(i == 0 || j == 0 || i == x-1 || j == y-1 || j%5 == 0 && i < x/4){
				mat[i][j] = 1;
			}else{
				mat[i][j] = value;
			}
		}
	}
	return mat;
};
let g = {
	canvas : document.createElement('div'),
	p : {
		x: 6,
		y: 1,
		move : function(direction){
			switch(direction){
				case "left":
					if(this.x > 0) this.x--;
				break;
				case "right":
					if(true) this.x++;
				break;
			}
		},
	},
	map : makeMat(30, 400),
	screen : {x: 0, large: 50},

	init(){
		document.body.appendChild(this.canvas);
		document.addEventListener('keydown', (e)=> this.keypress(e));
		this.apply();
	},
	apply : function(){
		this.mapping();
		this.display();
	},
	keypress : function(e){
		switch(e.keyCode){
			case 37:
				if(this.screen.x > 0) this.screen.x--;
				this.p.move("left");
			break;
			case 39:
				this.screen.x++;
				this.p.move("right");
			break;
			default:
		}
		this.apply();
	},
	mapping : function(){
		//console.log(this.screen.x);
	},
	display : function(){
		let s = '';
		for(let i = this.map.length -1; i >= 0; i--){
			for(let j = this.screen.x; j < this.screen.x + this.screen.large; j++){
				s += ' ';
				s += this.map[i][j];
				s += ' ';
				if(i == this.p.y && j == this.p.x){
					s = s.slice(0, -2);
					s += 5;
					s += ' ';
				}
			}
			s += '<br>';
		}
		this.canvas.innerHTML = s;
	}
};
g.init();
