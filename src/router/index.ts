import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

import Home from '@/views/Home/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    meta: {
      title: '文曲星-主页'
    },
    component: Home
  },
  {
    path: '/:pathMatch(.*)*', // 注意此处 404页面匹配规则和以前不相同，得采用这种配置方式才行
    name: '404',
    meta: {
      title: '404-访问路径不存在'
    },
    component: () => import('../views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from) => {
  document.title = to.meta.title as string
})

export default router
