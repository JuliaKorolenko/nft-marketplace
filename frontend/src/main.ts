import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

createApp(App)
  .use(createPinia())
  .mount('#app')

// const app = createApp(App)
// const pinia = createPinia()
// app.use(pinia)
// app.mount('#app')
