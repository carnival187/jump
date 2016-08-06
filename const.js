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
	make(y,x,v = 0){
		let mat = new Array(y);
		for(let i = 0, l = 0; i < y; i++){
			mat[i] = [];
			for(let j = 0; j < x; j++){
				if( i === 0 || j == 0 || i == x-1 || j == y-1){
					mat[i][j] = 1;
				}else{
					mat[i][j] = v;
				}
			}
		}
		return mat;
	}
};
