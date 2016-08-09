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
	up: {x: 0, y: 6},
	down: {x: 0, y: -6},
	left: {x: -6, y: 0},
	right: {x: 6, y: 0}

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
