// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  router: {
    base: '/',
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/',
        component: resolve(__dirname, 'pages/index.vue')
      })
    }
  },
  modules: ['@nuxt/ui']
})
