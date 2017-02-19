/**
 *Date:2017/2/18
 *功能：传入作者的ID号，得到该作者所有的作品
 */

var request = require('request'),
download = require('./download'),
fs = require('fs'),
async = require('async'),
cheerio = require('cheerio'),
createOption = require('./requestHeader'),
parsePage = require('./parsePage');

function parse(ID,URL,OPTIONS){
	var INDEX = URL;
	var header = createOption(INDEX);
	request(header,function(err,res){
		if(err){
			console.log(err);
			return;
		}

		var $ = cheerio.load(res.body);
	
		//parsePage(ID,INDEX);
		if(OPTIONS){
			parsePage(ID,INDEX,OPTIONS);
		}else{
			parsePage(ID,INDEX);
		}

		var NEXT = $('.next').first().children().attr('href');
		if(NEXT){
			setTimeout(function(){
				var NEXT_URL = URL.split('?')[0]+NEXT;
				if(!OPTIONS){
					parse(ID,NEXT_URL);
				}else{
					parse(ID,NEXT_URL,OPTIONS);
				}
			},2000);
		}

	});
}

String.prototype.getRankNumber = function(){
	if(!this)	return;
	let index = this.lastIndexOf('_');
	return this.substring(index);
}

String.prototype.getUrl = function(){
	if(!this)	return;
	let index = this.lastIndexOf('_');
	return this.substring(0,index);
}

var Util = {
	getPixiver: function(ID){
		var INDEX = 'http://www.pixiv.net/member_illust.php?id='+ID;
		parse(ID,INDEX);
	},

	getCollection: function(ID,OPTIONS){
		var INDEX = 'http://www.pixiv.net/bookmark.php?id='+ID;
		parse(ID,INDEX,OPTIONS);
	},

	getGlobalRank: function(){
		var INDEX = 'http://www.pixiv.net/ranking_area.php?type=detail&no=6';
		var header = createOption(INDEX);
		request(header,function(err,res){
			if(err){
				console.log(err);
				return;
			}

			var $ = cheerio.load(res.body);

    		var filename = $('.column-title').children().first().text()+'_'+$('._about').text();
			var Urls = [];
			var host = 'http://www.pixiv.net/';
			$('.ranking-items').children().each(function(i,item){
				var part = $(this).children().first().next().children().attr('href')+'_'+$(this).attr('id')+'.';
				Urls.push(host+part);
			});
			
			async.mapLimit(Urls,3,function(url,callback){
				var rank = url.getRankNumber();
				var realUrl = url.getUrl();
				var newHeader = createOption(realUrl);
				request(newHeader,function(err,res){
					if(err){
						console.log(err);
						return;
					}

					var $ = cheerio.load(res.body);

					//原始大小图片1400*1400
					var oriImgUrl = $('img[class=original-image]').attr('data-src');
					//图片后缀
					if(oriImgUrl){
						var postfix = oriImgUrl.trim().substr(oriImgUrl.length-4) || '.png';
					}
					//图片名称
					var imgName = $('img[class=original-image]').attr('alt')+postfix || Date.now()+Math.random()*1000+postfix;
					download(oriImgUrl,rank+imgName,filename);

					callback();
				}).on('error',function(){console.log('request in async in getGlobalRank error');});
			},function(err,callback){
				if(err){
					console.log(err);
				}
				console.log('fin');
			});

		}).on('error',function(){console.log('request in getGlobalRank error');});
	}

};



module.exports = Util;