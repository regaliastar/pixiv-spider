var fs = require('fs'),
 createOption = require('./requestHeader'),
 request = require('request');

exports.appendFile =  function (txt,filename){
	//console.log('appendFile');
	if(!fs.existsSync('./test/')){
		fs.mkdirSync('./test/');
	}
	fs.appendFile('./'+filename+'.txt',txt,'utf-8',function(err){
		if(err){
			throw err;
		}
	})
}
