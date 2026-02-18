// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  css: [
    '~/assets/scss/themes/_default.css',
    '~/assets/scss/main.scss'
  ],
  
  app: {
    head: {
      title: 'Rowley Recipes',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A simple recipe application' }
      ]
    }
  }
})

