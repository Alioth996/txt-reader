import { createApp } from 'vue'
import App from './App.vue'

import 'uno.css'
import './styles/index.css'

import './styles/reset'
import './styles/global'

import router from './router'

const app = createApp(App)

app.use(router)
app.mount('#app')
