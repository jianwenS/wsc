import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/page/ShoppingMall'
import Register from '@/components/page/register'
import Login from '@/components/page/login'
import Goods from '@/components/page/Goods'
import CategoryList from '@/components/page/CategoryList'
import Cart from '@/components/page/Cart'
import Main from '@/components/page/Main'
import User from '@/components/page/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children:[
        {
          path: '/',
          name: 'ShoppingMall',
          component: ShoppingMall
        },
        {
          path: '/CategoryList',
          name: 'CategoryList',
          component: CategoryList
        },
        {
         path: '/Cart',
         name: 'Cart',
         component: Cart
        },
        {
         path: '/User',
         name: 'User',
         component: User
        }
      ]
    },
    
     {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
     path: '/goods',
     name: 'Goods',
     component: Goods
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
