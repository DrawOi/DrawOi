import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import Score from './views/Score.vue'
// import Add from './views/Add.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/room',
      name: 'room-game',
      component: () => import('./views/Room.vue'),
    },
    {
      path: '/add',
      name: 'add-picture',
      component: () => import('./views/Add.vue')
    },
    {
      path: '/score',
      name: 'score-board',
      component: () => import('./views/Score.vue')
    }
  ]
})
