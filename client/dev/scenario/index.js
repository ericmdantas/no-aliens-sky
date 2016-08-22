import './scenario.css';

import {Bus} from 'ubus';

module.exports = {
    data() {
        return {
            stars: [],
            NUM_STARS: 200,
            bus: new Bus(),
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
                    x: Math.floor(Math.random() * document.body.offsetWidth) + 'px',
                    y: Math.floor(Math.random() * document.body.offsetHeight) + 'px'
                })
            }
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
                console.log(pos);
            });
        }
    },
    template: require('./scenario.html')
}