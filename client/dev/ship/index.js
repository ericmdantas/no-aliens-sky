import './ship.css';

module.exports = {
    props: ['bus', 'events'],
    data() {
        return {
            SHIP_MOV: 10,
            ship: {
                y: 500,
                x: 300,
                transform: ''
            }
        }
    },
    ready() {
        this._listenCommands();
    },
    methods: {
        _listenCommands() {
            this.bus.on(this.events.KEY_UP, () => {
                this.ship.y = this.ship.y - this.SHIP_MOV;       
                this.ship.transform = '';              

                this._emitShipPos();  
            });

            this.bus.on(this.events.KEY_DOWN, () => {
                this.ship.y = this.ship.y + this.SHIP_MOV;         
                this.ship.transform = '';

                this._emitShipPos();  
            });

            this.bus.on(this.events.KEY_LEFT, () => {
                this.ship.x =this.ship.x - this.SHIP_MOV;         
                this.ship.transform = 'rotate(-5deg)';

                this._emitShipPos();  
            });

            this.bus.on(this.events.KEY_RIGHT, () => {
                this.ship.x = this.ship.x + this.SHIP_MOV;
                this.ship.transform = 'rotate(5deg)';

                this._emitShipPos();  
            });
        },
        _emitShipPos() {
            this.bus.emit(this.events.SHIP_POS, {
                x: ~~this.ship.x,
                y: ~~this.ship.y
            })
        }
    },
    template: require('./ship.html')
}