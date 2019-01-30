// 引入koa
const Koa = require('koa');
const Router = require('koa-router');
// 引入koa-bodyparser,解析post请求体
const bodyParser = require('koa-bodyparser');
// 支持跨域
const cros = require('koa2-cors');
// new出实例
const app = new Koa();
let router = new Router();
// 使用跨域
app.use(cros());
// 加载路由中间件
app.use(router.routes());
app.use(router.allowedMethods());
app.use(bodyParser());
// 引入user路由
let user = require('./appApi/user.js');
router.use('/user',user.routes());

// 引入connect
const {connect, initSchemas} = require('./database/init.js');
const mongoose = require('mongoose');

;(async ()=>{
    await connect();
    // 调用
    initSchemas()
    // const User = mongoose.model('User')
    // let oneUser = new User({userName:'jspang2',password:'123456'})
    // oneUser.save().then(()=>{
    //     console.log('插入成功')
    // })

})();

// 监听3000窗口
app.listen(3000,()=>{
    console.log('loding')
})