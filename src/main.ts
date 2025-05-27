// import './assets/normalize.css'
// import '@/assets/scss/vars.scss'
// import '@/assets/scss/mixins.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

const app = createApp(App)
const vuetify = createVuetify({
  components: { ...components, VDateInput },
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
})
app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
