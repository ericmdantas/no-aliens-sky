import './scenario.css';

import {Bus} from 'ubus';

module.exports = {
    data() {
        return {
            stars: [],
            NUM_STARS: 200,
            bus: new Bus(),
            lastShipPos: {
                x: 0,
                y: 0
            },
            events: {
                KEY_UP: 'key.up',
                KEY_DOWN: 'key.down',
                KEY_LEFT: 'key.left',
                KEY_RIGHT: 'key.right',

                SHIP_POS: 'ship.pos'
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
            }, 3000);
        },
        _listenCommands() {
            document.body.addEventListener('keydown', ({which}) => {
                switch (which) {
                    case 38: this.bus.emit(this.events.KEY_UP); 
                            break;

                    case 40: this.bus.emit(this.events.KEY_DOWN); 
                            break;

                    case 37: this.bus.emit(this.events.KEY_LEFT); 
                            break;
                    
                    case 39: this.bus.emit(this.events.KEY_RIGHT); 
                            break;
                }
            });
        },
        _listenShip() {
            this.bus.on(this.events.SHIP_POS, (pos) => {               
                if (pos.x > this.lastShipPos.x) {
                    for (let i = 0, len = this.NUM_STARS; i < len; i++) {
                        this.stars[i].x -= 10;
                    }
                }

                if (pos.x < this.lastShipPos.x) {
                    for (let i = 0, len = this.NUM_STARS; i < len; i++) {
                        this.stars[i].x += 10;
                    }
                }

                for (let i = 0, len = this.NUM_STARS; i < len; i++) {
                    if (this.stars[i].x < 0) {
                        this.stars[i].x = this._bodyWidth(); 
                    }

                    if (this.stars[i].x > this._bodyWidth()) {
                        this.stars[i].x = 0; 
                    }
                }

                this.lastShipPos.x = pos.x;
                this.lastShipPos.y = pos.y;
            });
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