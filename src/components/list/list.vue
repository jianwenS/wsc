<template>
    <div>
        <van-row gutter="20">
            <van-col span="12" v-for="(item,index) in list" :key="index" class="goods_info">
                <img v-lazy="item.image"/>
                <p>{{item.goodsName}}</p>
                <p class="red">{{item.mallPrice | money}}</p>
            </van-col>
        </van-row>
    </div>
</template>
<script>
    import {toMoney} from '@/components/filte.js'
    export default {
        props:['list'],
        data() {
            return {
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
    .goods_info{
        font-size: 14px;
        height: 10rem;
        text-align: center;
    }
    .goods_info img{
        height: 7rem;
    }
    .red{color:red;}
</style>