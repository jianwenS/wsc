<template>
  <div>
      <div class="navbar-div">
            <van-nav-bar
            title="列表页"/>
      </div>
      <div>
          <van-row>
              <van-col span="6">
                  <div id="leftNav">
                     <ul>
                         <li v-for="(item,index) in categroy" :class="{active:index == categroyIndex}" @click='activeNav(index,item.ID)'>{{item.MALL_CATEGORY_NAME}}</li>
                     </ul>
                  </div>
              </van-col>
              <van-col span="18">
                   <div class="tabCategort">
                        <van-tabs v-model="actives">
                                <van-tab v-for="(item, index) in categroySub" :key="index" :title="item.MALL_SUB_NAME">
                                </van-tab>
                            </van-tabs>
                   </div>
              </van-col>
          </van-row>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import {Toast} from 'vant'
import url from '@/api.js'
export default {
    created(){
        this.getCategory();
    },
    data() {
    return {
        categroy:[],
        categroyIndex:0,
        categroySub:[],
        actives:0
    }
    },
    mounted() {
        let winHeight = document.documentElement.clientHeight;
        console.log(winHeight)
        document.getElementById('leftNav').style.height = winHeight - 46 +'px';
    },
    methods: {
        getCategory(){
            axios({
                url:url.getCategoryList,
                method:'get'
            }).then(res=>{
                if(res.data.code==200){
                   this.categroy = res.data.message
                   this.getCategorySubListId(this.categroy[0].ID)
                }else{
                    Toast('服务器错误，请稍后重试!')
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        activeNav(index,id) {
            this.categroyIndex = index;
            this.getCategorySubListId(id);
        },
        getCategorySubListId(id){
            axios({
                url:url.getCategorySubList,
                method:'post',
                data:{categoryId:id}
            }).then(res=>{
                console.log(res)
                if(res.data.code==200){
                   this.categroySub = res.data.message
                }else{
                    Toast('服务器错误，请稍后重试!')
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>


<style scoped>
    #leftNav {
        background-color:skyblue;
    }
    #leftNav ul li{
       line-height: 2rem;
       border-bottom:1px solid #e4e7ed;
       padding:3px;
       box-sizing: border-box;
       font-size: 0.8rem;
       text-align:center;
    }
    #leftNav ul li.active{background:#ffffff;}
</style>