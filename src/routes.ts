import { RouteRecordRaw } from 'vue-router'

import Home from '@/views/Home/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/reader/:bookName/:bookId',
    name: 'Reader',
    component: () => import('@/views/Reader/index.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/Option/index.vue')
  },
  {
    path: '/:pathMatch(.*)*', // 注意此处 404页面匹配规则和以前不相同，得采用这种配置方式才行
    redirect: '/not-found'
  },
  {
    path: '/not-found',
    component: () => import('@/views/NotFound.vue')
  }
]

export default routes
