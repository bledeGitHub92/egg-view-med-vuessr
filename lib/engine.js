const fs = require('fs');
const path = require('path');
const LRU = require('lru-cache');
const { createBundleRenderer } = require('vue-server-renderer');

class Engine {
    constructor(app) {
        const baseDir = app.baseDir;
        const vuessrConfig = app.config.vuessr;
        const publicPath = vuessrConfig.publicPath;

        this.template = fs.readFileSync(path.join(baseDir, publicPath, vuessrConfig.template), 'utf-8');
        this.bundle = require(path.join(baseDir, publicPath, vuessrConfig.serverBundle));
        this.clientManifest = require(path.join(baseDir, publicPath, vuessrConfig.clientManifest));
        this.upsertRenderer();
    }

    upsertRenderer() {
        if (this.bundle && this.clientManifest) {
            this.renderer = createBundleRenderer(this.bundle, {
                template: this.template,
                clientManifest: this.clientManifest,
                // recommended for performance
                runInNewContext: false,
                // for component caching
                cache: LRU({
                    max: 1000,
                    maxAge: 1000 * 60 * 15
                })
            });
        }
    }

    render(filename, locals) {
        return new Promise((resolve, reject) => {
            this.renderer.renderToString(locals, (err, html) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(html);
            })
        });
    }
}

module.exports = Engine;