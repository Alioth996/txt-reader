import App from './App.vue'

import { ViteSSG } from 'vite-ssg'

import 'uno.css'
import './styles/index.css'
import './styles/reset'
import './styles/global'
import { RouteRecordRaw } from 'vue-router'

// 外部引入routes,` build会报错:location is not defined
// import { routes } from './router'

import Home from '@/views/Home/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '文曲阅读_导入本地小说_支持离线阅读 支持txt格式'
    },
    component: Home
  },
  {
    path: '/reader/book/:bookName/:bookId',
    name: 'Reader',
    meta: {
      title: '文曲阅读-阅读小说'
    },
    component: () => import('@/views/Reader/index.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    meta: {
      title: '文曲阅读-系统设置'
    },
    component: () => import('@/views/Option/index.vue')
  },
  {
    path: '/:pathMatch(.*)*', // 注意此处 404页面匹配规则和以前不相同，得采用这种配置方式才行
    name: '404',
    meta: {
      title: '404-访问路径不存在'
    },
    component: () => import('@/views/404.vue')
  }
]

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  ({ app, router, routes, isClient, initialState }) => {}
)
