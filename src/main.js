import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import './assets/styles.css'

const app = createApp(App)

app.use(router)

// Read about prime vue - https://primevue.org/
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.mount('#app')

