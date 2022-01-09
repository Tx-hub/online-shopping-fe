import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login'
import Admin from './components/admin'
import Goods from './components/good/goods'
import Welcome from './components/welcome'
import WelcomeIndex from './components/welcomeindex'
import Home from './components/home'
import Index from './components/good/index'
import Register from './components/register'
import History from './components/good/history'
import Seller from './components/seller'
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/seller', component: Seller },
    { path: '/register', component: Register },
    { path: '/', redirect: '/login' },
    { path: '/good/index', redirect: '/index' },
    { path: '/admin',
      component: Admin,
      redirect: '/welcome',
      children: [ { path: '/welcome', component: Welcome }, { path: '/goods', component: Goods }
      ]
    },
    { path: '/home',
      component: Home,
      redirect: '/WelcomeIndex',
      children: [  { path: '/index', component: Index },{ path: '/history', component: History},{ path: '/WelcomeIndex',component: WelcomeIndex}
      ]
    }

  ]
})
router.beforeResolve((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') return next()
  const tokenstr = window.sessionStorage.getItem('token') && window.sessionStorage.getItem('username')&&window.sessionStorage.getItem('uid')
  if (!tokenstr) return next('login')
  next()
})
export default router
