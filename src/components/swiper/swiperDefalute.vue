<template>
  <div >
      <swiper :options="swiperOption"  ref="mySwiper">  
          <!-- 这部分放你要渲染的那些内容 -->  
          <swiper-slide v-for="(item,index) in swiper" class="swiper_item" :key="index"> 
            <div>
              <img :src="item.image" width="100%" height="100%">
              <span>{{item.name}}</span>
              <p>￥{{item.price}}</p>
            </div>
          </swiper-slide>
      </swiper>  
  </div>
</template>
<script>
    import 'swiper/dist/css/swiper.css' 
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        components:{swiper,swiperSlide},
        data() {
            return {
               swiperOption: {  
                    // pagination: {
                    //   el:'.swiper-pagination'
                    // },  
                    slidesPerView: 3,   
                    paginationClickable: true,
                }
            }
        },
        props:['swiper']

    }
</script>
<style scoped>
  .swiper_item span{
    display:block; 
    white-space: nowrap; 
    max-width: 10rem;
    text-overflow: ellipsis;
    overflow: hidden; 
    font-size: 12px;
    padding: 0 10px;
    text-align: center;
  }
  .swiper_item p{padding: 0 1rem;margin: 0;color:red;}
</style>