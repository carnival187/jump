
export default class Service{
	constructor(){}

	static getPlayerOption(){
		return {
			x: 0, y:0, color: "red",
			width: 50, height: 50, rayon: 25
		}
	}

	static getThingsOptions(){
		return [
			new Rectangle({x: 264, y: 13, color: "green"}),
			new Rectangle({x: 164, y: 13, color: "green"}),
			new Rectangle({x: 204, y: 13, color: "green"}),
			new Rectangle({x: 24,  y:113, color: "green"})
		];
	}
}
