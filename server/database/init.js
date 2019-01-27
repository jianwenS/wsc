const mongoose = require('mongoose');
const db = 'mongodb://localhost/smile-db';
const glob = require('glob');
const {resolve} = require('path');
// 引入需所有schema目录下的js
exports.initSchemas = () =>{
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require);
}

exports.connect = () =>{
    // 连接数据库
   mongoose.connect(db);

   let maxConnectTimes = 0;

   return new Promise((resolve,reject)=>{
        // 断开连接
        mongoose.connection.on('disconnected',()=>{
            console.log('断开');
            if(maxConnectTimes <= 3) {
                maxConnectTimes++;
                mongoose.connect(db);
            }else{
                reject();
                throw new Error('数据库异常,请人工处理');
            }
        })
        // 错误
        mongoose.connection.on('error',(err)=>{
            console.log('错误');
            if(maxConnectTimes <= 3) {
                maxConnectTimes++;
                mongoose.connect(db);
            }else{
                reject(err);
                throw new Error('数据库异常,请人工处理');
            }
        })
        // 链接打开时
        mongoose.connection.once('open',()=>{
            console.log('运行中');
            resolve();
        })

    })

}