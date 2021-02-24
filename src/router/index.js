import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/idioma',
    name: 'Language',
    component: () => import(/* webpackChunkName: "language" */ '../views/Language.vue')
  },
  {
    path: '/ultimas-peliculas',
    name: 'Year',
    component: () => import(/* webpackChunkName: "year" */ '../views/Year.vue')
  },
  {
    path: '/clasificacion',
    name: 'Rating',
    component: () => import(/* webpackChunkName: "rating" */ '../views/Rating.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
