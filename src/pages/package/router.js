import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },

  {
    path: '/message',
    name: 'message',
    component: () => import(  './message.vue'),
  },
  {
    path: '/index',
    name: 'index',
    component: () => import(  './index.vue'),
  },
]

const router = new VueRouter({
  routes
})
export default router