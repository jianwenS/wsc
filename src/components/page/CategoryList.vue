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
                        <van-tabs v-model="actives" @click="onClickCategorySub">
                            <van-tab v-for="(item, index) in categroySub" :key="index" :title="item.MALL_SUB_NAME">
                            </van-tab>
                        </van-tabs>
                   </div>
                <div id="list-div">
                <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                >
                <van-pull-refresh v-model="isLoading" @refresh="onRefresh">             
                <div class="list-item"
                    v-for="(item,index) in goodList"
                    :key="index"
                    @click="clickUrl(item.ID)"
                >
                    <div class="list-item-img">
                        <img :src="item.IMAGE1" width="100%" :onerror="errurl"/>
                    </div>
                    <div class="list-item-text">
                        <div>{{item.NAME}}</div>
                        <div>{{item.ORI_PRICE | money}}</div>
                    </div>
                </div>
               </van-pull-refresh>
                </van-list>
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
import {toMoney} from '@/components/filte.js'
export default {
    created(){
        this.getCategory();
    },
    data() {
    return {
        categroy:[],
        categroyIndex:0,
        categroySub:[],
        actives:0,
        list:[],
        loading:false,
        finished:false,
        isLoading: false,
        page:1,
        categorySubId:'',
        goodList:[],
        errurl:'this.src="'+require('@/assets/images/err.png')+'"'
    }
    },
    mounted() {
        let winHeight = document.documentElement.clientHeight;
        document.getElementById('leftNav').style.height = winHeight - 46 +'px';
        document.getElementById('list-div').style.height = winHeight - 90-50 +'px';
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
            this.page = 1;
            this.finished = false;
            this.goodList = [];
            this.getCategorySubListId(id);
        },
        getCategorySubListId(id){
            axios({
                url:url.getCategorySubList,
                method:'post',
                data:{categoryId:id}
            }).then(res=>{
                if(res.data.code==200){
                   this.categroySub = res.data.message;
                   this.actives = 0;
                   this.categorySubId = this.categroySub[0].ID;
                   this.onLoad();
                }else{
                    Toast('服务器错误，请稍后重试!')
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        // 上拉加载
        onLoad() {
            setTimeout(() => {
                this.categorySubId = this.categorySubId ? this.categorySubId  : this.categroySub[0].ID;
                this.getGoodsList();
            }, 1000);
        }, 
        onRefresh() {
            setTimeout(() => {
                this.$toast('刷新成功');
                this.isLoading = false;
                this.finished = false;
                this.list=[]; 
                this.onLoad();
            }, 500);
        },
        onClickCategorySub(index,title){
            this.categoryId = this.categroySub[index].ID;
            this.goodList = [];
            this.finished = false;
            this.page = 1;
            this.onLoad();
        },
        getGoodsList() {
            axios({
                url:url.getCategoryByCategorySubId,
                method:'post',
                data:{
                    categorySubId:this.categorySubId,
                    page:this.page
                }
            }).then(res=>{
                if(res.data.code == 200 && res.data.message.length){
                    this.page++;
                    this.goodList = this.goodList.concat(res.data.message);
                }else{
                    this.finished = true;
                }
                this.loading = false;
            }).catch(err=>{
                console.log(err)
            })
        },
        clickUrl(id) {
            this.$router.push({name:'Goods',params:{goodsId:id}});
        }
    },
    filters:{
        money(val) {
            return '￥' + toMoney(val);
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
    #list-div{
        overflow: scroll;
    }
    .list-item{
        display:flex;flex-direction:row;
        font-size: 0.8rem;
        border-bottom:1px solid #f0f0f0;
        background-color:#ffffff;
        padding:5px;
    }
    .list-item-img{flex:8;}
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
</style>