const lifecycle = process.env.npm_lifecycle_event

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    buildAssetsDir: 'frontend/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, user-scalable=no',
      link: [
        { id: 'preconnect-fonts-google', rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { id: 'preconnect-fonts-gstatic', rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap'
        },
      ],
    },
  },
  appConfig: {
    auth: {
      redirect: {
        login: 'index',
        logout: 'index',
      },
    },
  },
  build: {
    transpile: [
      ...(['build', 'generate'].includes(lifecycle) ? ['element-plus'] : []),
    ],
  },
  css: [
    'element-plus/theme-chalk/src/dark/css-vars.scss',
    'element-plus/theme-chalk/src/index.scss',
    '@/assets/scss/styles.scss',
  ],
  modules: [
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    authCookieName: '',
    public: {
      appName: '',
      appUrl: '',
      apiUrl: '',
    },
  },
  sourcemap: false,
  srcDir: 'client/',
  typescript: {
    shim: false,
  },
})
