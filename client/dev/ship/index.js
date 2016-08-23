import './ship.css';

module.exports = {
    props: ['bus', 'events'],
    data() {
        return {
            SHIP_MOV: 5,
            boundaries: {
                top: -5,
                down: 1000,
                right: 2000,
                left: -5
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
                transform: ''
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
                let _light1 = Math.floor(Math.random() * 3);
                let _light2 = Math.floor(Math.random() * 3);
                let _light3 = Math.floor(Math.random() * 3);

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
        _listenCommands() {
            this.bus.on(this.events.KEY_UP, () => {
                if (this.ship.y < this.boundaries.top) {
                    this.ship.y = this.boundaries.down;      
                } else {
                    this.ship.y = this.ship.y - this.SHIP_MOV;      
                }

                this.ship.transform = '';              

                this._emitShipPos();  
            });

            this.bus.on(this.events.KEY_DOWN, () => {
                if (this.ship.y > this.boundaries.down) {
                    this.ship.y = this.boundaries.top;
                } else {
                    this.ship.y = this.ship.y + this.SHIP_MOV;        
                }

                this.ship.transform = '';

                this._emitShipPos();  
            });

            this.bus.on(this.events.KEY_LEFT, () => {
                if (this.ship.x < this.boundaries.left) {
                    this.ship.x = this.boundaries.right;
                } else {
                    this.ship.x = this.ship.x - this.SHIP_MOV;         
                }

                this.ship.transform = 'rotate(-5deg)';

                this._emitShipPos();  
            });

            this.bus.on(this.events.KEY_RIGHT, () => {
                if (this.ship.x > this.boundaries.right) {
                    this.ship.x = -100;
                } else {
                    this.ship.x = this.ship.x + this.SHIP_MOV;
                }

                this.ship.transform = 'rotate(5deg)';

                this._emitShipPos();  
            });
        },
        _emitShipPos() {
            this.bus.emit(this.events.SHIP_POS, {
                x: this.ship.x,
                y: this.ship.y
            })
        }
    },
    template: require('./ship.html')
}