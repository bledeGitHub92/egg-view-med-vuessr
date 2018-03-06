const path = require('path');

module.exports = ({ baseDir }) => {
    const config = exports = {};

    config.view = {
        mapping: {
            '.json': 'vuessr'
        },
    }

    config.vuessr = {
        publicPath: 'app/public/vuessr',
        template: 'index.html',
        serverBundle: 'vue-ssr-server-bundle.json',
        clientManifest: 'vue-ssr-client-manifest.json'
    };

    return config;
}