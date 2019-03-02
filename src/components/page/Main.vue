<template>
    <div>
        <div class="main-div">
        <keep-alive>
            <router-view />
        </keep-alive>
        </div>
        <van-tabbar v-model="active" @change="changeTabbar(active)">
            <van-tabbar-item icon="shop">首页</van-tabbar-item>
            <van-tabbar-item icon="records">列表</van-tabbar-item>
            <van-tabbar-item icon="cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/api.js'
import { Toast } from 'vant'
import {toMoney} from "@/components/filte.js"
export default {
   data() {
       return{
        active:0,
        noePath:''
       }
   },
   created() {
       this.changeTabActive();
   },
   updated() {
       this.changeTabActive();
   },
   methods:{
    changeTabbar(active) {
        switch(active) {
            case 0 :
            this.$router.push({name:'ShoppingMall'})
            break;
            case 1 :
            this.$router.push({name:'CategoryList'})
            break;
            case 2 :
            this.$router.push({name:'Cart'})
            break;
            case 3 :
            this.$router.push({name:'User'})
            break;
        }
    },
    changeTabActive() {
        this.noePath = this.$route.path;
        switch(this.noePath) {
            case '/ShoppingMall' :
            this.active = 0;
            break;
            case '/CategoryList' :
            this.active = 1;
            break;
            case '/Cart' :
            this.active = 2;
            break;
            case '/User' :
            this.active = 3;
            break;
        }
    }
   }
}
</script>


<style scoped>
</style>