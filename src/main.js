// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button , Row , Col, Swipe, SwipeItem, Lazyload, List, Field, Icon, NavBar, Tab, Tabs, GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn} from 'vant';
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper)

Vue.use(Button).use(NavBar).use(Tab).use(GoodsAction).use(GoodsActionBigBtn).use(GoodsActionMiniBtn).use(Tabs).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(Icon);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
