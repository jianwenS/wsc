const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// 创建唯一ID
let ObjectId = Schema.Types.ObjectId;
// 引入加密算法
const bcrypt = require('bcryptjs');
// 加密数字0-99
const SALT_WORK_FACTOR = 10;

// 创建用户表
const userSchema = new Schema({
    UserId:ObjectId,
    userName:{unique:true,type:String},
    password:String,
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
});
// 保存的时候
userSchema.pre('save',function(next) {
    // 加密
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
        if(err) return next(err);
        // 加密成功或者失败
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) return next(err);
            this.password = hash;
            next();
        })
    })
})
// 发布模型
mongoose.model('User',userSchema);