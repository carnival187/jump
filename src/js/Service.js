import Thing from './Thing.js';

export default class Service{
	constructor(){}

	static getPlayerOption(){
		return {
			x: 0, y:0, color: "red",
			width: 50, height: 50, rayon: 25
		}
	}

	static getThings(){
		return [
		new Thing({x: 264, y: 13, color: "green", width: 30, height: 30}),
		new Thing({x: 164, y: 13, color: "green", width: 30, height: 30}),
		new Thing({x: 204, y: 13, color: "green", width: 30, height: 30}),
		new Thing({x: 24,  y:113, color: "green", width: 30, height: 30})
		];
	}
}
