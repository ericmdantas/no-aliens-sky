import './app.css';

module.exports = {
    template: require('./app.html'),
    components: {
        'scenario': require('../scenario/index.js')
    }
}