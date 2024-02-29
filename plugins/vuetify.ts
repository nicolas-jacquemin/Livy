import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#262626',
    surface: '#262626',
    primary: '#b5434f',
    grey: '#4f4e4e',
    'primary-darken-1': '#3700B3',
    secondary: '#fff',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'darkTheme',
      themes: {
        darkTheme,
      }
    },
    ssr: true,
    components,
    directives,
    
  })

  nuxtApp.vueApp.use(vuetify)
})