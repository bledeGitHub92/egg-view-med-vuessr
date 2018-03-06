'use strict';

module.exports = app => {
    app.view.use('vuessr', require('./lib/view'));
};