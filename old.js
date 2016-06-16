
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
let timers = {};
let map = makeMat(20, 30);
let topJump = 10;
let p = {x : 0, y : 5};
let down = 0;
let jumping = function(){
	timers.jump = setTimeout(jumping, speed);
};
document.addEventListener('keydown', function(){
	down = Date.now();
});
document.addEventListener('keyup', function(){
	r = Math.round((Date.now() - down) / 20);
	topJump = (r <= 10) ? r : 10;
	console.log('top : ' + topJump);
});
let 
/****************************************************/
let div = document.createElement('div');
document.body.appendChild(div);
/****************************************************/
let display = function(m){
	let s = '';
	for(let i = m.length-1; i >= 0 ; i--){
		for(let j = 0; j < m[i].length; j++){
			if( i == p.x && j == p.y){
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
