const Koa = require('Koa')
const app = new Koa()
const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')


router.get('/insertAllGoodsInfo',async(ctx)=>{
	fs.readFile('./newGoods.json','utf-8',(err,data)=>{
		data = JSON.parse(data)
		let saveCount = 0;
		const Goods = mongoose.model('Goods')
		data.map((value,index)=>{
			console.log(value)
			let newGoods = new Goods(value)
			newGoods.save().then(()=>{
				saveCount++
				console.log("成功"+saveCount)
			}).catch(error=>{
				console.log('失败'+error)
			})
		})
	})

	ctx.body = "开始导入数据"
})

router.get('/insertAllCategory',async(ctx)=>{
	fs.readFile('./data_json/category.json','utf-8',(err,data)=>{
		data = JSON.parse(data);
		let saveCount = 0;
		const Category = mongoose.model('Category')
		data.RECORDS.map((value,index)=>{
			let newCategory = new Category(value)
			newCategory.save().then(()=>{
				saveCount++
				console.log('成功'+saveCount)
			}).catch(error=>{
				console.log('失败'+error)
			})
		})
	})

	ctx.body="开始导入数据"
})

// 商品详情数据接口
router.post('/getDetailGoodsInfo',async(ctx)=>{
	let goodsId = ctx.request.body.goodsId;
	console.log(goodsId)
	const Goods = mongoose.model('Goods');
	await Goods.findOne({ID:goodsId}).exec()
	.then(async(res)=>{
		ctx.body={code:200,message:res}
	}).catch(err=>{
		console.log(err)
		ctx.body={code:500,message:err}
	})
})

module.exports = router;
