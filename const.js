const JUMP_SIZE = 7;
const TIME_KEY_DOWN = 300;
const TIMEOUT = 30;
const SPEED = {
	jump: 1,
	fall: 1,
	side: 1,
	left: this.side,
	right: this.side
};
let direction = {//minimum 2 sinon equivalent a 0
	up: {x: 0, y: 3},
	down: {x: 0, y: -3},
	left: {x: -3, y: 0},
	right: {x: 3, y: 0}

};
const bodys = {

	square: [{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:1,y:1}],
	
	makeSquare(a){
		let r = [];
		for(let i = 0; i < a; i++){
			for(let j = 0; j < a; j++){
				r.push({y: i, x: j});
			}
		}
		return r;
	}

};
let M = {
	make2(a,b){
		let mat = new Array(a);
		for(let i = 0, l = 0; i < a; i++){
			mat[i] = [];
			l += ( i % 15 === 0) ? 1 : 0;
			for(let j = 0; j < b; j++){
				if(j > l * 100){
					mat[i][j] = 1;
				}else{
					mat[i][j] = 0;
				}
			}
		}
		return mat;
	},
	make(a, b, c = 10){
		let mat = new Array(a);
		for(let i = 0, l = 0; i < a; i++){
			mat[i] = [];
			for(let j = 0; j < b; j++){
				if( i === 0 || j == 0 || i == a-1 || j == b-1 || j % c === 0 && i < 10){
				//if( j % c === 0 && j !== 0){
					mat[i][j] = 1;
				}else{
					mat[i][j] = 0;
				}
			}
		}
		return mat;
	},
};
const MAP = M.make(300, 600);
