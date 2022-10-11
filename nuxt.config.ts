// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    buildAssetsDir: 'frontend/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, user-scalable=no',
    },
  },
  sourcemap: false,
  srcDir: 'client/',
  typescript: {
    shim: false,
  },
})
