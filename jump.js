let makeMat = function(x, y, value = 0){
	let mat = [];
	for(let i = 0; i < x; i++){
		mat[i] = [];
		for(let j = 0; j < y; j++){
			mat[i][j] = value;
		}
	}
	return mat;
};
let map = makeMat(20, 30);
let p = {y : 0, x : 5};
/****************************************************/
let jump = {
	timer : null,
	top : 10,
	start : 0,
	speed : 20,
	state : 'floor',

	init : function(){
		document.addEventListener('keydown', function(){
			if(jump.state === 'floor')
			{
				jump.start = Date.now();
				jump.state = 'up';
				jump.jumping();
			}
		});
		document.addEventListener('keyup', function(){
			r = Math.round((Date.now() - jump.start) / 20 - 1);
			jump.top = (r <= 10) ? r : 10;
			console.log('top : ' + jump.top);
		});
	},

	jumping : function(){
		if(jump.state === 'up'){
			if(p.y >= jump.top)
			{
				jump.state = 'down';
			}
			else{
				p.y++;
				jump.speed += 5;
			}
			//return;
		}
		else if(p.y > 0) {
			p.y--;
			jump.speed -= 5;
		}
		else{
			jump.state = 'floor';
			return;
		}
		jump.timer = setTimeout(jump.jumping, jump.speed);
		display(map);
	}
};
/****************************************************/
let div = document.createElement('div');
document.body.appendChild(div);
let display = function(m){
	let s = '';
	for(let i = m.length-1; i >= 0 ; i--){
		for(let j = 0; j < m[i].length; j++){
			if( i == p.y && j == p.x){
				s += 'X';
			}else{
				s += ' ';
				s += m[i][j];
				s += ' ';
			}
		}
		s += '<br>';
	}
	div.innerHTML = s;
};
display(map);
jump.init();
