/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Game = __webpack_require__(1);

	var _Game2 = _interopRequireDefault(_Game);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var canvas = document.createElement('canvas');

	canvas.width = 500;
	canvas.height = 300;

	document.body.appendChild(canvas);

	var GAME = new _Game2.default(canvas);

	GAME.start();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Player = __webpack_require__(2);

	var _Player2 = _interopRequireDefault(_Player);

	var _Thing = __webpack_require__(5);

	var _Thing2 = _interopRequireDefault(_Thing);

	var _Screen = __webpack_require__(6);

	var _Screen2 = _interopRequireDefault(_Screen);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = function () {
		function Game(canvas) {
			_classCallCheck(this, Game);

			this.screen = new _Screen2.default(canvas);
			this.player = new _Player2.default(this.screen);

			this.things = [];
		}

		_createClass(Game, [{
			key: 'draw',
			value: function draw() {
				var _this = this;

				this.screen.ctx.clearRect(0, 0, this.screen.width, this.screen.height);

				this.player.draw();

				this.things.forEach(function (v) {
					v.draw(_this);
				}, this);
			}
		}, {
			key: 'update',
			value: function update() {
				this.player.update(this.things);
			}
		}, {
			key: 'playing',
			value: function playing(self) {
				self.update();
				self.draw();
				self.timerOut = window.setTimeout(self.playing, self.screen.frame, self);
			}
		}, {
			key: 'start',
			value: function start() {
				this.player.events(this.screen);
				this.getThings();
				this.playing(this);
			}
		}, {
			key: 'stop',
			value: function stop() {
				window.clearTimeout(this.timerOut);
			}
		}, {
			key: 'getThings',
			value: function getThings() {
				this.things = [new _Thing2.default({ x: 264, y: 13 }), new _Thing2.default({ x: 164, y: 13 }), new _Thing2.default({ x: 204, y: 13 }), new _Thing2.default({ x: 24, y: 113 })];
			}
		}]);

		return Game;
	}();

	exports.default = Game;
	;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Direction = __webpack_require__(3);

	var _Direction2 = _interopRequireDefault(_Direction);

	var _Position = __webpack_require__(4);

	var _Position2 = _interopRequireDefault(_Position);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Player = function () {
		function Player(screen) {
			_classCallCheck(this, Player);

			this.screen = screen;
			this.x = 2;
			this.y = 2;
			this.size = 50;
			this.width = 50;
			this.height = 50;
			this.weight = 2;
			this.color = 'red';
			this.keys = new Map();
			this.keys.set(37, new _Direction2.default("left"));
			this.keys.set(38, new _Direction2.default("jump"));
			this.keys.set(39, new _Direction2.default("right"));
			this.keys.set(32, new _Direction2.default("jump"));
			this.is = {};
			this.up = 15;
			this.direction = new _Position2.default(); //////////////////////////////////////
		}

		_createClass(Player, [{
			key: 'events',
			value: function events() {
				var _this = this;

				document.addEventListener('keydown', function (e) {
					if (_this.keys.get(e.keyCode)) {
						e.preventDefault();
						var a = _this.keys.get(e.keyCode);
						_this[a.name]();
					}
				});
				document.addEventListener('keyup', function (e) {
					if (_this.keys.get(e.keyCode)) {
						e.preventDefault();
						var a = _this.keys.get(e.keyCode);
						_this.is[a.name + 'ing'] = false;
					}
				});
			}
		}, {
			key: 'draw',
			value: function draw() {
				var X = this.x < this.screen.width / 2 ? this.x : this.screen.width / 2;

				this.screen.ctx.fillStyle = this.color;
				this.screen.ctx.fillRect(X, this.y, this.size, this.size);
			}
		}, {
			key: 'gravity',
			value: function gravity() {
				if (!(this.is.lefting || this.is.righting)) {
					this.direction.x += Math.sign(this.direction.x) * -1 * this.weight;
				}
				if (this.is.jumping) {
					this.direction.y -= 2;
					if (this.direction.y <= 0) {
						this.direction.y = 0;
						this.is.jumping = false;
					}
				} else {
					this.direction.y = this.y > 0 ? -this.weight : 0;
				}
			}
		}, {
			key: 'update',
			value: function update(things) {
				this.gravity();
				this.x += this.direction.x;
				this.x = this.x < 0 ? 0 : this.x;
				this.y += this.direction.y;
				this.y = this.y < 0 ? 0 : this.y;
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = things[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var v = _step.value;

						if (this.collision(v)) {
							console.log('testCollision');
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				this.screen.x = this.x - this.screen.width / 2;
			}
		}, {
			key: 'collision',
			value: function collision(thing) {
				return !(this.x >= thing.x + thing.width || this.x + this.width <= thing.x || this.y >= thing.y + thing.height || this.y + this.height <= thing.y);
			}
		}, {
			key: 'left',
			value: function left() {
				this.direction.x -= 2;
				this.is.lefting = true;
			}
		}, {
			key: 'right',
			value: function right() {
				this.direction.x += 2;
				this.is.righting = true;
			}
		}, {
			key: 'jump',
			value: function jump() {
				this.direction.y = this.up;
				this.is.jumping = true;
			}
		}]);

		return Player;
	}();

	exports.default = Player;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Direction = function Direction(name) {
		_classCallCheck(this, Direction);

		this.name = name;
		this.down = false;
	};

	exports.default = Direction;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Position = function Position() {
		var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
		var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

		_classCallCheck(this, Position);

		this.x = x;
		this.y = y;
	};

	exports.default = Position;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Thing = function () {
		function Thing(options) {
			_classCallCheck(this, Thing);

			this.x = options.x;
			this.y = options.y;
			this.color = options.color || 'green';
			this.width = options.width || 54;
			this.height = options.height || 54;
		}

		_createClass(Thing, [{
			key: 'draw',
			value: function draw(game) {
				var screen = game.screen;
				var ctx = screen.ctx;
				var X = Math.abs(this.x - game.player.x);

				if (X < screen.width / 2) {
					ctx.fillStyle = this.color;
					ctx.fillRect(this.x - screen.x, this.y, this.width, this.height);
				}
			}
		}]);

		return Thing;
	}();

	exports.default = Thing;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Screen = function Screen(canvas) {
		_classCallCheck(this, Screen);

		this.x = this.y = 0;
		this.width = canvas.width;
		this.height = canvas.height;
		this.frame = 30;
		this.ctx = canvas.getContext('2d');
	};

	exports.default = Screen;

/***/ }
/******/ ]);