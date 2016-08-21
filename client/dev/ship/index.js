import './ship.css';

module.exports = {
    props: ['bus', 'events'],
    data() {
        return {
            SHIP_MOV: 10,
            shipStyle: {
                top: '300px',
                left: '500px',
                transform: ''
            }
        }
    },
    ready() {
        this.bus.on(this.events.KEY_UP, () => {
            let _next = ~~(this.shipStyle.top.replace(/\D/g, '')) - this.SHIP_MOV;

            this.shipStyle.top = _next + 'px';          
            this.shipStyle.transform = '';
        });

        this.bus.on(this.events.KEY_DOWN, () => {
            let _next = ~~(this.shipStyle.top.replace(/\D/g, '')) + this.SHIP_MOV;

            this.shipStyle.top = _next + 'px';          
            this.shipStyle.transform = '';
        });

        this.bus.on(this.events.KEY_LEFT, () => {
            let _next = ~~(this.shipStyle.left.replace(/\D/g, '')) - this.SHIP_MOV;

            this.shipStyle.left = _next + 'px';          
            this.shipStyle.transform = 'rotate(-10deg)';
        });

        this.bus.on(this.events.KEY_RIGHT, () => {
            let _next = ~~(this.shipStyle.left.replace(/\D/g, '')) + this.SHIP_MOV;

            this.shipStyle.left = _next + 'px';
            this.shipStyle.transform = 'rotate(10deg)';
        });
    },
    template: require('./ship.html')
}