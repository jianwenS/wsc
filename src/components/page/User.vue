<template>
        <div>
            <div class="navbar-div">
                <van-nav-bar class="navbar-div-nav"
                    title="会员中心"
                />
            </div>
            <div class="user-message">
                <div class="user-message-img">
                    <img :src="this.imgUrl" />
                </div>
                <p>💗想</p>
            </div>
            <div class="user-list">
                <van-cell title="每日签到" icon="edit" is-link />
                <van-cell title="我的店铺" icon="shop-o" is-link />
                <van-cell title="我的动态" icon="chat-o" is-link />
                <van-cell title="我的钱包" icon="bill-o" is-link />
                <van-cell title="我的购物" icon="cart-o" is-link />
                <van-cell title="我的收藏" icon="browsing-history-o" is-link />
                <van-cell title="我的分享" icon="idcard" is-link />
                <van-cell title="收货地址" icon="location-o" is-link @click="adress"/>
            </div>
            <van-popup v-model="adressActive" :close-on-click-overlay="true" position="bottom" :overlay="true">
                <van-area :area-list="areaList" @confirm="istrue"/>
            </van-popup>
        </div>
    </template>
    
    <script>
    import axios from 'axios'
    import url from '@/api.js'
    import { Toast } from 'vant'
    export default {
       data() {
           return{
               imgUrl:require('@/assets/images/us.jpg'),
               adressActive:false,
               areaList: {
                province_list: {
                  110000: '北京市',
                  120000: '天津市'
                },
                city_list: {
                  110100: '北京市',
                  110200: '县',
                  120100: '天津市',
                  120200: '县'
                },
                county_list: {
                  110101: '东城区',
                  110102: '西城区',
                  110105: '朝阳区',
                  110106: '丰台区',
                  120101: '和平区',
                  120102: '河东区',
                  120103: '河西区',
                  120104: '南开区',
                  120105: '河北区'
                }
              }
           }
       },
       methods:{
        adress() {
            this.adressActive = true;
        },
        istrue(val) {
            console.log(val);
            this.adressActive = false;
        }
       }
    }
    </script>
    
    
    <style scoped>
        .user-message{
            width: 100%;
            height: 10rem;
            box-sizing: border-box;
            padding-top: 1.5rem;
            text-align: center;
            background:url(../../assets/images/user_bj.jpg) no-repeat;
            background-size: 100% 100%;
        }
        .user-message-img{
            width: 100%;
            display: flex;
            justify-content: center;
             align-items: center;
        }
        .user-message-img img{ width: 5rem;
            height: 5rem;
            border-radius: 50%;
        }
        .navbar-div-nav{
            background-color:#1989fa;            
        }
        .navbar-div-nav .van-nav-bar__title {
            color: #ffffff !important;
        }
    </style>