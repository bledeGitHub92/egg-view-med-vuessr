const Engine = require('../../lib/engine');
const VUE_SSR = Symbol('Application#renderer');

module.exports = {
    get vuessr() {
        if (!this[VUE_SSR]) {
            this[VUE_SSR] = new Engine(this);
        }
        return this[VUE_SSR];
    }
}