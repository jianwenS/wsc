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
     </div>
  </template>
  
  <script>
    import axios from 'axios'
    import url from '@/api.js'
    import { Toast } from 'vant'
    export default {
    created(){
        this.goodsId = this.$route.query.goodsId;
        console.log(this.$route)
        this.getInfo();
    },
     data() {
        return {
          goodsId:'',
          goodsInfo:{}
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
                  if(res==200 && res.data) {
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
          }
      }
    }
  </script>
  
  
  <style scoped>
  </style>