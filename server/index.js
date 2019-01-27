// 引入koa
const Koa = require('koa');
// new出实例
const app = new Koa();
// 引入connect
const {connect, initSchemas} = require('./database/init.js');
const mongoose = require('mongoose');

;(async ()=>{
    await connect();
    // 调用
    initSchemas()
    const User = mongoose.model('User')
    let oneUser = new User({userName:'jspang2',password:'123456'})
    oneUser.save().then(()=>{
        console.log('插入成功')
    })

})();
app.use(async(ctx)=>{
    // 在页面上输出 helloWord
    ctx.body='<h1>hello word</h1>';
})
// 监听3000窗口
app.listen(3000,()=>{
    console.log('loding')
})