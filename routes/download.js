var express = require('express'),
 fs = require('fs'),
 path = require('path');
var router = express.Router();

router.get('/:filename',function(req,res){
	var filename = req.params.filename;
	console.log('下载请求：'+filename);
	var filepath = path.join(__dirname,'../','public',filename);
	var stats = fs.statSync(filepath);
	if(stats.isFile()){
		res.set({
			'Content-Type':'application/octet-stream',
			'Content-Disposition': 'attachment; filename='+filename,
   			'Content-Length': stats.size
		});
		fs.createReadStream(filepath).pipe(res);
	}else{
		res.end(404);
	}
})

module.exports = router;