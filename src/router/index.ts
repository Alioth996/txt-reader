import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router'

import Home from '@/views/Home/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '文曲阅读_导入本地小说_支持离线阅读 支持txt格式'
    },
    name: '文曲阅读主页'
  },
  {
    // path: '/reader/:bookName',  主页完成之后需要加上
    path: '/reader',
    name: '阅读小说',
    meta: {
      title: '文曲阅读-阅读小说'
    },
    component: () => import('@/views/Reader/index.vue')
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
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  document.title = to.meta.title as string
})

export default router
