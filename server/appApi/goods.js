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

router.get('/insertAllCategorySub',async(ctx)=>{
    fs.readFile('./data_json/category_sub.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0 
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((value,index)=>{
            console.log(value)
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(()=>{
                saveCount++
                console.log('成功插入'+saveCount)
            }).catch(error=>{
                console.log('插入失败:'+error)
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
//大类商品数据接口
router.get('/getCategoryList',async(ctx)=>{
   try{
	   const Category = mongoose.model('Category');
	   let result = await Category.find().exec();
	   console.log(1)
	   console.log(result)
	   ctx.body = {code:200,message:result}
   }catch(err){
	ctx.body={code:500,message:err}
   }
})
//小类商品数据接口
router.post('/getCategorySub',async(ctx)=>{
	try{
		let categoryId = ctx.request.body.categoryId;
		const CategorySub = mongoose.model('CategorySub');
		let result = await CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec();
		ctx.body = {code:200,message:result}
	}catch(err){
	 ctx.body={code:500,message:err}
	}
 })
 //根据小类商品获取商品详情数据接口
router.post('/getCategoryByCategorySubId',async(ctx)=>{
	try{
		let cateorySubId = ctx.request.body.cateorySubId;
		const CategorySub = mongoose.model('Goods');
		let result = await Category.find({SUB_ID:cateorySubId}).exec();
		ctx.body = {code:200,message:result}
	}catch(err){
	 ctx.body={code:500,message:err}
	}
 })

module.exports = router;
