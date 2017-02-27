var express = require('express'),
 fs = require('fs'),
 path = require('path');
var router = express.Router();

router.get('/',function(req,res){
	var filePath = path.join(__dirname, './','../','public');
	fs.readdir(filePath, function(err, results){
		if(err) throw err;
		if(results.length>0){
			var files = [];
			results.forEach(function(file){
				if(fs.statSync(path.join(filePath, file)).isFile()){
					files.push(file);
				}
			})
			res.render('home', {files:files});
		}else{
			res.end('当前目录下没有文件');
		}
	});
})

module.exports = router;