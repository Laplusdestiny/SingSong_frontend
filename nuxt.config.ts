// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  build: {
    transpile: ['vuetify']
  },
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
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ja',
      },
      meta: [
        { name: 'description', content: 'あなたのカラオケライフをもっと楽しく、もっと便利に' },
        { property: 'og:title', content: 'SingSong' },
        { property: 'og:description', content: 'あなたのカラオケライフをもっと楽しく、もっと便利に' },
        { property: 'og:image', content: './public/icon.webp' },
        { property: 'og:url', content: 'https://sing-song-frontend.vercel.app/' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'SingSong' },
        { name: 'twitter:description', content: 'あなたのカラオケライフをもっと楽しく、もっと便利に' },
        { name: 'twitter:image', content: './public/icon.webp' }
      ],
    }
  },
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    }
  }
})
