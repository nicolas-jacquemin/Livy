import vuetify from 'vite-plugin-vuetify'
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },

    head: {
      title: 'Livy',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    "@vime/core/themes/default.css",
  ],
  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
  ],
  i18n: {
    vueI18n: './i18n.config.ts',
  },
  build: {
    transpile: ['vuetify'],
  },
  hooks: {
    'vite:extendConfig': config => {
      config.plugins.push(
        vuetify({
          //styles: { configFile: resolve('./settings.scss') },
        })
      )
    },
  },

  runtimeConfig: {
    public: {
      apiUrl: '',
      apiFullUrl: '',
    }
  },

  vite: { // For Development only (not for production)
    server: {
      proxy: {
        "/api": {
          target: "https://livy.rigidd.app",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})