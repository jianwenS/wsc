const Router = require('koa-router');
const mongoose = require('mongoose');
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
	console.log(ctx.request.body)
    // 存到用户表
    await newUser.save().then(()=>{
    	// 成功提示信息
    	ctx.body = {
    		code:200,
    		message:'注册成功'
    	}
    })
    .catch((err)=>{
    	// 失败信息
    	ctx.body = {
    		code:500,
    		message:err
    	}
    })
})
router.post('/login',async(ctx)=>{
    // 获取密码、用户
    let {userName,password} = ctx.request.body;
    console.log(userName,password)
    // 获取user模型
    const User = mongoose.model('User');
    // 查找用户，在比对密码
    await User.findOne({userName:userName}).exec().then(async(res)=>{
        if(res){
            // new出实例
            let newUser = new User();
            await newUser.comparePassword(password,res.password)
            // 返回给前台的比对结果
            .then((isMatch)=>{
                ctx.body = {code:200,message:isMatch}
            })
            .catch(err=>{
                ctx.body = {code:500,message:err}
            })
        }else{
            ctx.body={ code:201, message:'用户名不存在'}
        }
    })
    .catch((err)=>{
        // 失败信息
        ctx.body = {
            code:500,
            message:err
        }
    })
})
// 导出路由实例
module.exports = router;