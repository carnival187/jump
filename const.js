//MAP ??????????????????????????
const JUMP_SIZE = 20;
const MAX_JUMP_KEY_DOWN = 300;
const SPEED_TIMEOUT = 50;
const direction = {
	up: {x: 0, y: 1},
	down: {x: 0, y: -1},
	left: {x: -4, y: 0},
	right: {x: 4, y: 0}

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
let MAP = {
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
	make(a,b){
		let mat = new Array(a);
		for(let i = 0, l = 0; i < a; i++){
			mat[i] = [];
			for(let j = 0; j < b; j++){
				if( i === 0 || j == 0 || i == a-1 || j == b-1 || j % 15 === 0){
					mat[i][j] = 1;
				}else{
					mat[i][j] = 0;
				}
			}
		}
		return mat;
	},
	
	test : {//marche pas....
		x: [],
		y: []
	}
};
