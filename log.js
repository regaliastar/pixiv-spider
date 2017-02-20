var fs = require('fs');

function log(txt){
	var d = new Date();
	var date = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
	var time = '['+d.getHours()+'时'+d.getMinutes()+'分'+d.getSeconds()+'秒] ';

	if(!fs.existsSync('./logs/')){
		fs.mkdirSync('./logs/');
	}
	fs.appendFile('./logs/'+date+'.log','\n'+time+txt,'utf-8',function(err){
		if(err){
			throw err;
		}
	})
}

module.exports = log;