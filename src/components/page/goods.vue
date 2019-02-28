<template>
    <div class="goods">
        <div class="navbar-div">
            <van-nav-bar
                title="商品详情"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
            />
        </div>
        <div class="topimage-div">
            <img :src="goodsInfo.IMAGE1" width="100%"/>
        </div>
        <div class="goodsInfo">
            <div class="goods-price">{{goodsInfo.ORI_PRICE | money}}</div>
            <div class="goods-names">{{goodsInfo.NAME}}</div>
            <van-tabs class="vat_tab" sticky :swipeable="true">
                <van-tab title="商品详情">
                    <div class="details_good details_van" v-html="goodsInfo.DETAIL"></div>
                </van-tab>
                <van-tab class="details_van" title="商品评论">功能制作中······</van-tab>
            </van-tabs>
            <van-goods-action>
                    <van-goods-action-mini-btn
                      icon="chat-o"
                      text="客服"
                      @click="onClickMiniBtn"
                    />
                    <van-goods-action-mini-btn
                      icon="cart-o"
                      text="购物车"
                      @click="onClickMiniBtn"
                    />
                    <van-goods-action-big-btn
                      text="加入购物车"
                      @click="onClickBigBtn"
                    />
                    <van-goods-action-big-btn
                      primary
                      text="立即购买"
                      @click="onClickBigBtn"
                    />
                  </van-goods-action>
        </div>
     </div>
  </template>
  
  <script>
    import axios from 'axios'
    import url from '@/api.js'
    import { Toast } from 'vant'
    import {toMoney} from "@/components/filte.js"
    export default {
    created(){
        this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId
        this.getInfo();
    },
     data() {
        return {
          goodsId:'',
          goodsInfo:{},
          active:'1'
        }
      },
      methods: {
          getInfo() {
            axios({
                  url:url.DetailGoodsInfo,
                  method:'post',
                  data:{goodsId:this.goodsId}
              })
              .then(res=>{
                  console.log(res)
                  if(res.data.code==200) {
                      this.goodsInfo = res.data.message;
                  } else {
                      Toast('数据获取失败，请重新获取')
                  }
              })
              .catch(err=>{
                  console.log(err)
              })
          },
          onClickLeft() {
              this.$router.go(-1);
          },
          onClickMiniBtn() {
            Toast('点击图标');
         },
         onClickBigBtn() {
             let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : [];
             console.log(cartInfo)
             let isHaveGoods = cartInfo.find(cart => cart.goodsId == this.goodsId);
             console.log(isHaveGoods)
             if(!isHaveGoods) {
                 let newGoodsInfo = {
                     goodsId:this.goodsInfo.ID,
                     name:this.goodsInfo.NAME,
                     price:this.goodsInfo.PRESENT_PRICE,
                     image:this.goodsInfo.IMAGE1,
                     count:1
                 }
                 cartInfo.push(newGoodsInfo);
                 localStorage.cartInfo = JSON.stringify(cartInfo);
                 Toast.success('添加成功');
             }else{
                Toast.success('已经有此商品');
             }
             this.$router.push({name:'Cart'})
         }
      },
      filters:{
        money(val) {
              return '￥'+ toMoney(val);
        }
      }
    }
  </script>
  
  
  <style scoped>
    .goodsInfo{
        padding-bottom:3rem;
    }
    .goods-price{
        font-size: 20px;
        color:red;padding: 0 .5rem;
        box-sizing: border-box;
    }
    .goods-names{font-size: 20px;color:#000000;padding: 0 .5rem;
        box-sizing: border-box;}
    .details_good{font-size: 0;}
    .vat_tab .details_van{
        margin-top: .5rem;
    }
  </style>