// 引入koa
const Koa = require('koa');
const app = new Koa();
// 引入connect
const {connect, initSchemas} = require('./database/init.js');
const mongoose = require('mongoose');
// 引入koa-bodyparser,解析post请求体
const bodyParser = require('koa-bodyparser');
// 支持跨域
const cros = require('koa2-cors');
const Router = require('koa-router');
// 使用跨域
app.use(cros());

app.use(bodyParser());
// new出实例
let router = new Router();
// 引入user路由
let user = require('./appApi/user.js');
router.use('/user',user.routes());
let goods = require('./appApi/goods.js');
router.use('/goods',goods.routes())
// 加载路由中间件
app.use(router.routes());
app.use(router.allowedMethods());

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