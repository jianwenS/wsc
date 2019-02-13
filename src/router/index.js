import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/page/ShoppingMall'
import Register from '@/components/page/register'
import Login from '@/components/page/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShoppingMall',
      component: ShoppingMall
    },
     {
      path: '/register',
      name: 'Register',
      component: Register
    },
     {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
