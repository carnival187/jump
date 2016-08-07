//MAP ??????????????????????????
const JUMP_SIZE = 10;
const MAX_JUMP_KEY_DOWN = 300;
const direction = {
	up: {x: 0, y: 1},
	down: {x: 0, y: -1},
	left: {x: -1, y: 0},
	right: {x: 1, y: 0}

};
const bodys = {

	square: [{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:1,y:1}]


};
let MAP = {
	make2(a,b){
		let mat = new Array(a);
		for(let i = 0, l = 0; i < a; i++){
			mat[i] = [];
			l += ( i % 5 === 0) ? 1 : 0;
			for(let j = 0; j < b; j++){
				if(j > l * 15){
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
