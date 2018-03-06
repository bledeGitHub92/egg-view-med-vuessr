class View {
    constructor(ctx) {
        this.app = ctx.app;
    }

    render(filename, locals, options = {}) {
        return this.app.vuessr.render(filename, locals);
    }

    async renderString() { throw new Error('not implement'); }
}

module.exports = View;