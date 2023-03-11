import { createApp } from 'vue'
import App from './App.vue'

import { createMUI } from 'shuimo-ui'
import 'shuimo-ui/dist/style.css'

import 'uno.css'

import './styles/reset'
import './styles/global'

import router from './router'

const app = createApp(App)

app.use(createMUI)
app.use(router)
app.mount('#app')
