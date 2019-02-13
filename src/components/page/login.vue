<template>
  <div class="register">
    <p>用户登录</p>
    <div class="register_img">
       <img src="../../assets/images/timg.png">
    </div>
      <van-field required v-model="registerFrom.userName" placeholder="请输入用户名"  icon="clear" @click-icon="registerFrom.userName = ''"/>
      <van-field required v-model="registerFrom.password" type="password" placeholder="请输入密码" icon="clear" @click-icon="registerFrom.password = ''"/>
      <van-button @click='loginUser' size="large" type="primary">立即登录</van-button>
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/api.js'
  import { Toast } from 'vant'
  export default {
    data() {
      return {
        registerFrom:{
          userName:'',
          password:''
        }
      }
    },
    methods: {
      loginUser() {
        axios({
            url: url.login,
            method: 'post',
            data:this.registerFrom
        })
        .then((res)=> {
          console.log(res)
          if(res.data.code == 200){
            Toast.success(res.data.message);
            this.$router.push('/');
          }else if(res.data.code == 201){
            Toast.success(res.data.message);
          }
        })
        .catch((err)=> {
          console.log(err)
          Toast.fail('注册失败');
        })
      }
    }
  }
</script>


<style scoped>
  .register{
    padding:.5rem;
    background-color:#2f91d8;
    height: 100%;
    box-sizing: border-box;
  }
  .register_img{ 
    height: 13rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .van-field{
    margin-bottom: 1rem;
    border-radius: 5px;
  }
  .register>p{
    font-size: 16px;
    color: #ffffff;
  }
  .van-button--large{
    height: 2.3rem;
    line-height: 2.3rem;
    border-radius: 5px;
  }
</style>