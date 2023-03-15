import App from './App.vue'

import { ViteSSG } from 'vite-ssg'

import 'uno.css'
import './styles/index.css'
import './styles/reset'
import './styles/global'

import routes from './routes'

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  ({ app, router, routes, isClient, initialState }) => {}
)
