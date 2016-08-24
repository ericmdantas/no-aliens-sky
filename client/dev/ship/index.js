import './ship.css';

module.exports = {
    props: ['bus', 'events'],
    data() {
       return {
            SHIP_MOV: 5,            

            boundaries: {
                top: -5,
                down: document.body.offsetHeight,
                right: document.body.offsetWidth,
                left: -100
            },
            shipLight1: {
                bkg: 'orange'
            },
            shipLight2: {
                bkg: 'orange'
            },
            shipLight3: {
                bkg: 'orange'
            },
            
            ship: {
                y: 500,
                x: 300,
                turbo: false,
                transform: '',
                distance: 0
            }
        }
    },
    ready() {
        this._listenCommands();
        this._startLights();
    },
    methods: {
        _startLights() {
            setInterval(() => {
                let _light1 = ~~(Math.random() * 3);
                let _light2 = ~~(Math.random() * 3);
                let _light3 = ~~(Math.random() * 3);

                this._changeLights(this.shipLight1, _light1);
                this._changeLights(this.shipLight2, _light2);
                this._changeLights(this.shipLight3, _light3);
            }, 1000);
        },
        _changeLights(light, num) {
            switch (num) {
                case 0: light.bkg = 'orange'; 
                        break;

                case 1: light.bkg = 'yellow';
                        break;

                case 2: light.bkg = 'limegreen';
                        break;
            }
        },
        _registerMovement() {
            this.ship.distance += this.SHIP_MOV;
        },
        _moveUp() {
            if (this.ship.y < this.boundaries.top) {
                this.ship.y = this.boundaries.down;      
            } else {
                this.ship.y = this.ship.y - this.SHIP_MOV;      
            }

            this.ship.transform = '';              

            this._registerMovement();
            this._emitShipInfo();
        },
        _moveDown() {
            if (this.ship.y > this.boundaries.down) {
                this.ship.y = this.boundaries.top;
            } else {
                this.ship.y = this.ship.y + this.SHIP_MOV;        
            }

            this.ship.transform = '';

            this._registerMovement();
            this._emitShipInfo(); 
        },
        _moveLeft() {
            if (this.ship.x < this.boundaries.left) {
                this.ship.x = this.boundaries.right;
            } else {
                this.ship.x = this.ship.x - this.SHIP_MOV;         
            }

            this.ship.transform = 'rotate(-5deg)';

            this._registerMovement();
            this._emitShipInfo(); 
        },
        _moveRight() {
            if (this.ship.x > this.boundaries.right) {
                this.ship.x = -100;
            } else {
                this.ship.x = this.ship.x + this.SHIP_MOV;
            }

            this.ship.transform = 'rotate(5deg)';

            this._registerMovement();
            this._emitShipInfo(); 
        },
        _listenCommands() {
            this.bus.on(this.events.KEY_UP, () => {
                this._moveUp();
            });

            this.bus.on(this.events.KEY_DOWN, () => {
                this._moveDown();
            });

            this.bus.on(this.events.KEY_LEFT, () => {
                 this._moveLeft();
            });

            this.bus.on(this.events.KEY_RIGHT, () => {
                this._moveRight(); 
            });
        },
        _emitShipInfo() {
            this.bus.emit(this.events.SHIP_POS, {
                x: this.ship.x,
                y: this.ship.y
            })

            this.bus.emit(this.events.SHIP_DISTANCE, {
                distance: this.ship.distance
            });
        }
    },
    template: require('./ship.html')
}