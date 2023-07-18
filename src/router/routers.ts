import type { RouteConfig } from 'vue-router'

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/template/education',
    component: () => import('@/templates/education/views/Home.vue'),
    meta: {
      cache: true,
    },
  },
  {
    path: '/template/education/detail/:productId',
    component: () => import('@/templates/education/views/Detail.vue'),
  },
]
