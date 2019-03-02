<template>
    <div class="goods">
        <div class="navbar-div">
            <van-nav-bar
                title="购物车"
            />
        </div>
        <div class="cart-title">
            <van-button size="small" type="danger" @click="clearCart">清空购物车</van-button>
        </div>
        <!-- 购物车商品 -->
        <div class="cart-list">
            <div class="wsc-row" v-for="(item,index) in cartInfo" :key="index">
                <div class="wsc-img">
                    <img :src="item.image" width="100%"/>
                </div>
                <div class="wsc-text">
                    <div class="wsc-goods-name">{{item.name}}</div>
                    <div class="wsc-control">
                        <van-stepper v-model="item.count" />
                    </div>
                </div>
                <div class="wsc-price">
                    <div>
                        {{item.price | money}}
                    </div>
                    <div>
                        {{item.count}}
                    </div>
                    <div class="wsc-red">
                        {{item.price*item.count | money}}
                    </div>    
                </div>
            </div>
        </div>
        <!-- 显示商品总价 -->
        <div class="totalMoney">
            商品总价：{{totalMoney | money}}
        </div>
     </div>
  </template>
  
  <script>
    import axios from 'axios'
    import url from '@/api.js'
    import { Toast } from 'vant'
    import {toMoney} from "@/components/filte.js"
    export default {
    created() {
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
                this.cartInfo = JSON.parse(localStorage.cartInfo);
            }
            this.isEmpoty = this.cartInfo.length > 0 ? true : false;
        },
        clearCart() {
            localStorage.removeItem('cartInfo');
            this.cartInfo = [];
        }
      },
      filters:{
          money(val) {
              return '￥' + toMoney(val);
          }
      },
      computed:{
        totalMoney(){
            var price = 0;
            this.cartInfo.forEach(item => {
                price += item.price*item.count;
            });
            localStorage.cartInfo = JSON.stringify(this.cartInfo);
            return price;
        }
      }
    }
  </script>
  
  
  <style scoped>
    .cart-title{
        height: 2rem;
        line-height: 2rem;
        background: #ffffff;
        border-bottom: 1px solid #e4e7ed;
        padding:5px;
        text-align:right;
    }
    .cart-list{
        background-color: #fff;
    }
    .wsc-row{
        display: flex;
        flex-direction:row;
        flex-wrap: nowrap;
        padding:0.5rem;
        font-size: 0.86rem;
        border-bottom: 1px solid #e4e7ed;
    }
    .wsc-img{
        flex:6;
    }
    .wsc-text{
        flex:14;
        padding-left:10px;
    }
    .wsc-control{
        padding-top: 23px;
    }
    .wsc-price{
        flex:4;
        text-align:right;
    }
    .wsc-red{color:red;}
    .totalMoney{
        text-align: right;
        background-color:#ffffff;
        border-bottom: 1px solid #e4e7ed;
        padding-top: 5px;
    }
  </style>