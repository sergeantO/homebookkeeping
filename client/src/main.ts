import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Dialog, Notify, Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import './assets/main.scss'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {
    config: {
        brand: {
          primary: '#00bd7e',
          secondary: '#00bd7e',
          accent: '#64deb6',
    
          dark: '#3e3d3d',
          'dark-page': '#121212',
    
          positive: '#00bd7e',
          negative: '#ef0038',
          info: '#31CCEC',
          warning: '#ff9900',
        },
        notify: { /* look at QuasarConfOptions from the API card */ }
      },
    // import Quasar plugins and add here
    plugins: {
      Notify,
      Dialog,
    },
})


// Assumes you have a <div id="app"></div> in your index.html
app.mount('#app')
