// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button ,Cell, Popup, Area, CellGroup, Tabbar, TabbarItem, Stepper, PullRefresh, Row , Col, Swipe, SwipeItem, Lazyload, List, Field, Icon, NavBar, Tab, Tabs, GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn} from 'vant';
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper)

Vue.use(Area).use(Cell).use(Popup).use(CellGroup).use(NavBar).use(Button).use(Tabbar).use(TabbarItem).use(Stepper).use(PullRefresh).use(Tab).use(GoodsAction).use(GoodsActionBigBtn).use(GoodsActionMiniBtn).use(Tabs).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(Icon);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
