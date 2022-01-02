import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login'
import Home from './components/home'
import Goods from './components/good/goods'
import Welcome from './components/welcome'
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/', redictor: '/login' },
    { path: '/home',
      component: Home,
      redictor: '/welcome',
      children: [ { path: '/welcome', component: Welcome }, { path: '/goods', component: Goods }
      ]
    }
  ]
})
router.beforeResolve((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) return next('login')
  next()
})
export default router
