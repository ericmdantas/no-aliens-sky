import './scenario.css';

import {Bus} from 'ubus';

module.exports = {
    data() {
        return {
            NUM_STARS: 100,

            bus: new Bus(),

            starMov: 2,
            distance: 0,
            stars: [],
            lastShipPos: {
                x: 0,
                y: 0
            },
            events: {
                KEY_UP: 'key.up',
                KEY_DOWN: 'key.down',
                KEY_LEFT: 'key.left',
                KEY_RIGHT: 'key.right',

                KEY_CTRL_ON: 'key.ctrl:on',
                KEY_CTRL_OFF: 'key.ctrl:off',

                SHIP_POS: 'ship.pos',
                SHIP_DISTANCE: 'ship.distance',
                SHIP_TURBO_ON: 'ship.turbo:on',
                SHIP_TURBO_OFF: 'ship.turbo:off'
            }
        }
    },
    ready() {
        this._drawStars();
        this._listenCommands();
        this._listenShip();
    },
    components: {
        'ship': require('../ship/index.js')
    },
    methods: {
        _drawStars() {
            for (let i = 0; i < this.NUM_STARS; i++) {
                this.stars.push({
                    x: this._randomX(), 
                    y: this._randomY(),
                    shiny: false
                })
            }

            setInterval(() => {
                window.requestAnimationFrame(() => {
                    for (let i = 0, len = this.NUM_STARS; i < len; i++) {
                        this.stars[i].shiny = false;
                    }

                    for (let i = 0, len = this.NUM_STARS; i < len; i++) {
                        let _rand1 = Math.floor(Math.random() * len);
                        let _rand2 = Math.floor(Math.random() * len);
                        let _rand3 = Math.floor(Math.random() * len);

                        if ((i === _rand1) || (i === _rand2) || (i === _rand3)) {
                            this.stars[i].shiny = true;
                        }
                    }
                })
            }, 3000);
        },
        _emitKeyEvents(key, ctrlKey) {
            this.bus.emit(key);

            if (ctrlKey) {
                this.bus.emit(this.events.KEY_CTRL_ON);
                this.starMov = 50;
            } else {
                this.bus.emit(this.events.KEY_CTRL_OFF);
                this.starMov = 2;
            }
        },
        _listenCommands() {
            document.body.addEventListener('keydown', ({ctrlKey, which}) => {
                switch (which) {
                    case 38: this._emitKeyEvents(this.events.KEY_UP, ctrlKey);                             
                             break;

                    case 40: this._emitKeyEvents(this.events.KEY_DOWN, ctrlKey);
                             break;

                    case 37: this._emitKeyEvents(this.events.KEY_LEFT, ctrlKey); 
                             break;
                    
                    case 39: this._emitKeyEvents(this.events.KEY_RIGHT, ctrlKey);
                             break;
                }
            });
        },
        _listenShip() {
            this.bus.on(this.events.SHIP_POS, (pos) => {               
                window.requestAnimationFrame(() => {
                    this._moveStars(pos);
                    this._updateLastPos(pos);                    
                })
            });

            this.bus.on(this.events.SHIP_DISTANCE, (info) => {
                this.distance = info.distance;
            });

            this.bus.on(this.events.SHIP_TURBO_ON, () => {
                this.starMov = 50;
            });

            this.bus.on(this.events.SHIP_TURBO_OFF, () => {
                this.starMov = 2;
            });
        },
        _updateLastPos(pos) {
            this.lastShipPos.x = pos.x;
            this.lastShipPos.y = pos.y;
        },
        _moveStars(pos) {
            if (pos.y > this.lastShipPos.y) {
                for (let i = 0, len = this.NUM_STARS; i < len; i++) {
                    this.stars[i].y -= this.starMov;
                }
            }

            if (pos.y < this.lastShipPos.y) {
                for (let i = 0, len = this.NUM_STARS; i < len; i++) {
                    this.stars[i].y += this.starMov;
                }
            }

            if (pos.x > this.lastShipPos.x) {
                for (let i = 0, len = this.NUM_STARS; i < len; i++) {
                    this.stars[i].x -= this.starMov;
                }
            }

            if (pos.x < this.lastShipPos.x) {
                for (let i = 0, len = this.NUM_STARS; i < len; i++) {
                    this.stars[i].x += this.starMov;
                }
            }

            for (let i = 0, len = this.NUM_STARS; i < len; i++) {
                if (this.stars[i].y < 0) {
                    this.stars[i].y = this._bodyHeight();
                }

            if (this.stars[i].y > this._bodyHeight()) { 
                    this.stars[i].y = 0;
                }

                if (this.stars[i].x < 0) {
                    this.stars[i].x = this._bodyWidth(); 
                }

                if (this.stars[i].x > this._bodyWidth()) {
                    this.stars[i].x = 0; 
                }
            }
        },
        _randomX() {
            return Math.floor(Math.random() * this._bodyWidth()) 
        },
        _randomY() {
            return Math.floor(Math.random() * this._bodyHeight())
        },
        _bodyWidth() {
            return document.body.offsetWidth;
        },
        _bodyHeight() {
            return document.body.offsetHeight;
        }
    },
    template: require('./scenario.html')
}