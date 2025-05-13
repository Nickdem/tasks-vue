import './assets/normalize.css'
// import '@/assets/scss/vars.scss'
// import '@/assets/scss/mixins.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
