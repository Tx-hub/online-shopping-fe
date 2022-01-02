import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login'
import Admin from './components/admin'
import Goods from './components/good/goods'
import Welcome from './components/welcome'
import Home from './components/home'
import Index from './components/good/index'
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/', redictor: '/welcome' },
    { path: '/admin',
      component: Admin,
      redictor: '/welcome',
      children: [ { path: '/welcome', component: Welcome }, { path: '/goods', component: Goods }
      ]
    },
    { path: '/home',
      component: Home,
      children: [  { path: '/index', component: Index }
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
