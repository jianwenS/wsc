<template>
  <div>
    <div class="seach_bar">
      <van-row>
        <van-col span="3"><img class="search_img" :src="locationIcon"></van-col>
        <van-col span="16">
          <input type="text" class="search-input" placeholder="查找"/>
        </van-col>
        <van-col span="5"><van-button size="mini">查找</van-button></van-col>
      </van-row>
     </div>
      <div class="lun_bar">
         <van-swipe :autoplay="3000">
              <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                  <img :src="banner.image" width="100%"/>
              </van-swipe-item>
          </van-swipe>
      </div>
         <!-- tab_bar -->
      <div class="tab_bar">
          <div v-for = "(cate,index) in category" :key="index">
            <img v-lazy="cate.image" width="100%">
            <span>{{cate.mallCategoryName}}</span>
          </div>
      </div>
      <!-- banner -->
      <div>
          <img v-lazy="addBanner" width="100%" />
      </div>
      <!-- 商品推荐 -->
      <div class="goods_tj">
          <h3>商品推荐</h3>
          <swiperDefalute :swiper="swiperData"></swiperDefalute>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import swiperDefalute from '../swiper/swiperDefalute'
export default {
  data () {
    return {
      locationIcon: require('../../assets/images/location.png'),
      bannerPicArray:[],
      category:[],
      addBanner:null,
      swiperData:[]
    }
  },
  components:{swiperDefalute},
  created() {
    axios({
      url:'https://www.easy-mock.com/mock/5c45ceb40714c82b4138334e/example/index',
      method:'get'
    })
    .then(res => {
      console.log(res)
      let {category,advertesPicture,slides,hotGoods} = res.data.data;
      this.category = category;
      this.addBanner = advertesPicture.PICTURE_ADDRESS;
      this.bannerPicArray = slides;
      this.swiperData = hotGoods;
    })
    .catch(error => {
      console.log(error)
    })
  }
}
</script>


<style scoped>
.seach_bar{
  height: 2.2rem;
  background-color: #e5017b;
  line-height: 2.2rem;
  text-align: center;
}
.search_img{
  width:1rem;
  padding-left: .5rem;
}
.lun_bar{
      max-height:20rem;
      overflow: hidden;
      clear:both;
}
.search-input{
      width:100%;
      height: 1.3rem;
      border-top:0px;
      border-left:0px;
      font-size: 14px;
      border-right:0px;
      border-bottom: 1px solid 1px !important ;
      background-color: #e5017d;
      color:#fff;
  }
  .location-icon{
      padding-top: .2rem;
      padding-left: .3rem;
  }
  .tab_bar{
    background-color: #fff;
    margin: 0 .3rem .3rem .3rem;
    display: flex;
    flex-direction:row;
    flex-wrap:nowrap;
  }
  .tab_bar div{
    padding: .3rem;
    text-align: center;
    font-size: 12px;
  }
  .tab_bar div>img{
    width: 3rem;
  }
  /*商品推荐*/
  .goods_tj h3{
    width: 100%;
    color:#d82084;
    margin-bottom:0;
    height: 1.5rem;
    font-size: 16px;
    padding:0 .3rem;
    border-bottom: 1px solid #cccccc;
    -webkit-box-sizing:border-box;
  }
</style>
