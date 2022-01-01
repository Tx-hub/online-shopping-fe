import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login'
import Home from './components/home'
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/', redictor: '/login' },
    { path: '/home', component: Home }
  ]
})
router.beforeResolve((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) return next('login')
  next()
})
export default router
