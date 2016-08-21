import './ship.css';

module.exports = {
    props: ['bus', 'events'],
    data() {
        return {
            shipStyle: {
                top: '300px',
                left: '500px'
            }
        }
    },
    ready() {
        this.bus.on(this.events.KEY_UP, () => {
            let _next = ~~(this.shipStyle.top.replace(/\D/g, '')) - 10;

            this.shipStyle.top = _next + 'px';          
        });

        this.bus.on(this.events.KEY_DOWN, () => {
            let _next = ~~(this.shipStyle.top.replace(/\D/g, '')) + 10;

            this.shipStyle.top = _next + 'px';          
        });

        this.bus.on(this.events.KEY_LEFT, () => {
            let _next = ~~(this.shipStyle.left.replace(/\D/g, '')) - 10;

            this.shipStyle.left = _next + 'px';          
        });

        this.bus.on(this.events.KEY_RIGHT, () => {
            let _next = ~~(this.shipStyle.left.replace(/\D/g, '')) + 10;

            this.shipStyle.left = _next + 'px';          
        });
    },
    template: require('./ship.html')
}