/**
 *Date:2017/2/18
 *功能：传入作者的ID号，得到该作者所有的作品
 */

var request = require('request'),
fs = require('fs'),
async = require('async'),
cheerio = require('cheerio'),
createOption = require('./requestHeader'),
parsePage = require('./parsePage'),
events = require('events');

function getPixiver(ID){
	var INDEX = 'http://www.pixiv.net/member_illust.php?id='+ID;
	var header = createOption(INDEX);
	request(header,function(err,res){
		if(err){
			console.log(err);
			return;
		}

		var $ = cheerio.load(res.body);
		var Urls = [];
		Urls.push(INDEX);
		$('.page-list').children().each(function(i,item){
			let partial = $(this).children().first().attr('href');
			if(partial){
				Urls.push('http://www.pixiv.net/member_illust.php'+partial);
			}
		});

		async.mapLimit(Urls,1,function(url,callback){
			parsePage(ID,url);
			callback(null);
		},function(err,callback){
			if(err){
				console.log(err);
			}
			console.log('get Pixiver success');
		});

	})
}

module.exports = getPixiver;