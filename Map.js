/**
 * Au final le constructor devrai aller tout chercher dans un db
 */
class Map{
	constructor(){
		this.body = this.make(10, 20);
		this.start = { x: 0, y: 0};
		this.end = { x: 0, y: 0};
		this.div = document.createElement('div');
		document.body.appendChild(this.div);
		this.display();
		this.colors : ["red", "green"];
	}


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
	}
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
	}
	display(){
		let s = "";
		for(let v of this.body){
			for(let w of v){
				s += '-';
				s += w;
				s += '-';
			}
			s += "<br />";
		}
		this.div.innerHTML = s;
	}
}
