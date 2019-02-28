<template>
    <div class="goods">
        <div class="navbar-div">
            <van-nav-bar
                title="购物车"
                left-text="返回"
                left-arrow
            />
        </div>
     </div>
  </template>
  
  <script>
    import axios from 'axios'
    import url from '@/api.js'
    import { Toast } from 'vant'
    import {toMoney} from "@/components/filte.js"
    export default {
    careated() {
        this.getCartInfo();
    },
     data() {
        return {
            cartInfo:[],
            isEmpoty:false
        }
      },
      methods: {
        getCartInfo() {
            if(localStorage.cartInfo) {
                ths.cartInfo = JSON.parse(localStorage.cartInfo);
            }
            this.isEmpoty = this.cartInfo.length > 0 ? true : false;
        }
      }
    }
  </script>
  
  
  <style scoped>

  </style>