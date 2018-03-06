## egg-view-med-vuessr

egg vue 服务端渲染模版引擎插件。

## Install

```bash
npm i egg-view-vue-ssr --save
```

## Usage

开发之前，先把用于服务端渲染的资源打包到 {app_root}/app/public/vuessr 目录下（没有则新建该目录），然后添加以下配置：

```js
// {app_root}/config/plugin.js
exports.medVueSsr = {
  enable: true,
  package: 'egg-view-med-vuessr'
};
```

## Configuration

```js
// {app_root}/config/config.default.js
// 添加自定义的服务端资源路径（默认是'app/public/vuessr'） 供官方插件 egg-view 作为搜索路径
config.view = {
  ...
  root: `${existingPath},${path.join(appInfo.baseDir, 'app/public/vuessr')}`,
  ...
}
```

```js
// 可在 {app_root}/config/config.default.js 中覆盖以下配置
config.vuessr = {
    publicPath: 'app/public/vuessr', // 服务端渲染资源静态目录
    template: 'index.html', // 服务端渲染 html 模版
    serverBundle: 'vue-ssr-server-bundle.json', // 服务端渲染配置文件名
    clientManifest: 'vue-ssr-client-manifest.json'  // 客户端配置文件名
};
```

## Render

```js
class VueSsrController extends Controller {
    async index() {
        const { ctx } = this;
        // 服务端渲染配置文件名
        // 传入当前路由
        await ctx.render('vue-ssr-server-bundle.json', { url: ctx.url });
    }
}
```