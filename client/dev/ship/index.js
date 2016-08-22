import './ship.css';

module.exports = {
    props: ['bus', 'events'],
    data() {
        return {
            SHIP_MOV: 10,
            ship: {
                top: '300px',
                left: '500px',
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
                let _next = ~~(this.ship.top.replace(/\D/g, '')) - this.SHIP_MOV;

                this.ship.top = _next + 'px';          
                this.ship.transform = '';              

                this._emitShipPos();  
            });

            this.bus.on(this.events.KEY_DOWN, () => {
                let _next = ~~(this.ship.top.replace(/\D/g, '')) + this.SHIP_MOV;

                this.ship.top = _next + 'px';          
                this.ship.transform = '';

                this._emitShipPos();  
            });

            this.bus.on(this.events.KEY_LEFT, () => {
                let _next = ~~(this.ship.left.replace(/\D/g, '')) - this.SHIP_MOV;

                this.ship.left = _next + 'px';          
                this.ship.transform = 'rotate(-5deg)';

                this._emitShipPos();  
            });

            this.bus.on(this.events.KEY_RIGHT, () => {
                let _next = ~~(this.ship.left.replace(/\D/g, '')) + this.SHIP_MOV;

                this.ship.left = _next + 'px';
                this.ship.transform = 'rotate(5deg)';

                this._emitShipPos();  
            });
        },
        _emitShipPos() {
            this.bus.emit(this.events.SHIP_POS, {
                x: ~~this.ship.left.replace(/px/g, ''),
                y: ~~this.ship.top.replace(/px/g, '')
            })
        }
    },
    template: require('./ship.html')
}