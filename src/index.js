/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */
const path = require('path')

const extendWithComponent = (conf) => {
  conf.boot.push('~quasar-ext-quasar-auth/src/boot/index.js')

  conf.build.transpileDependencies.push(/quasar-ext-quasar-auth[\\/]src/)

  const requiredPlugins = ['Notify', 'Dialog', 'Cookies']

  requiredPlugins.forEach(plugin => {
    if (!conf.framework.plugins.includes(plugin)) {
      conf.framework.plugins.push(plugin)
    }
  })

  conf.preFetch = true

  console.log('App Extension (ext-quasar-auth) Info: \'Adding my-ext-auth boot reference to your quasar.conf.js\'')
}

const chainWebpack = (ctx, chain) => {
  chain.resolve.alias
    .set('ext-quasar-auth', path.resolve(__dirname, './components'))
}

module.exports = function (api) {
  api.compatibleWith('@quasar/app', '^1.0.0 || ^2.0.0')

  api.chainWebpack((chain) => chainWebpack(api.ctx, chain))

  api.extendQuasarConf(extendWithComponent)
}
