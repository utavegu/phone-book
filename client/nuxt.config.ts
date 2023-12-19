import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  css: [
    '~/assets/styles/fonts.css',
    '~/assets/styles/normalize.css',
    '~/assets/styles/variables.css',
    '~/assets/styles/global.css',
  ],
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // { httpEquiv: 'x-ua-compatible', content: 'ie=edge' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'HandheldFriendly', content: 'true' },
        { name: 'MobileOptimized', content: 'width' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
      ],
    },
  },
  // publicRuntimeConfig: {
  //   NUXT_ENV_API_BASE_URL: process.env.NUXT_ENV_API_BASE_URL
  // },
  devtools: { enabled: false },
  typescript: {
    shim: false,
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
