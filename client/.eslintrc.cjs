module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  plugins: [],
  rules: {
    // Эти алиасы не люблю, так как они код делают менее читабельным и единообразным
    'vue/v-on-style': 'off',
    'vue/v-bind-style': 'off',
    'vue/v-slot-style': 'off',
    // А это правило не актуально в Nuxt, так как он компоненты автоматически делает multi-word, добавляя префиксом имя директории их расположения
    'vue/multi-word-component-names': 'off',
  },
};
