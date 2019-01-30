const Router = require('koa-router');
const mongoose = require('mongoose')
let router = new Router();
// 配置路由接口
router.get('/',async(ctx)=>{
	ctx.body = "用户操作页";
})
router.post('/register',async(ctx)=>{
    // 获取user模型
    const User = mongoose.model('User');
    // 接受前台post传过来的值
    let newUser = new User(ctx.request.body);
    // 存到用户表
    await newUser.save().then(()=>{
    	console.log(1)
    	// 成功提示信息
    	ctx.body = {
    		code:200,
    		message:'注册成功'
    	}
    })
    .catch((err)=>{
    	console.log(2)
    	// 失败信息
    	ctx.body = {
    		code:500,
    		message:err
    	}
    })
})
// 导出路由实例
module.exports = router;