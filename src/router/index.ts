import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routers'

Vue.use(VueRouter)

const router = new VueRouter({
  base: '/',
  mode: 'hash',
  routes,
})

export default router
