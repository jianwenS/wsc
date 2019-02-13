const fs = require('fs');

fs.readFile('./goods.json','utf-8',(err,data)=>{
   let newData = JSON.parse(data);
   let i = 0;
   let pushData = [];
   newData.RECORDS.map(function(value,index) {
   	if(value.IMAGE1 != null) {
   		i++;
   		pushData.push(value)
   	}
   })
   fs.writeFile('./newGoods.json',JSON.stringify(pushData),function(err) {
		if(err){
			console.log('文件写入失败')
		}else{
			console.log('文件写入成功')
		}
	})
})