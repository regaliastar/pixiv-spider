var request = require('request'),
download = require('./download'),
fs = require('fs'),
async = require('async'),
cheerio = require('cheerio'),
createOption = require('./requestHeader'),
log = require('./log'),
parsePage = require('./parsePage');

/**
 *Date:2017/2/18
 *功能：传入作者的ID号，得到该作者所有的作品
 *	    解析页面内的NEXT的值，递归调用，将所有页面交给parsePage来处理
 */

function parse(ID,URL,OPTIONS){
	var INDEX = URL;
	var header = createOption(INDEX);
	request(header,function(err,res){
		if(err){
			console.log(err);
			return;
		}

		var $ = cheerio.load(res.body);
	
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

	}).on('error',function(){console.log('request in parse error');log('request in getByTag error');});
}

function getByTag(TAG,URL,OPTIONS){
	var INDEX = URL;
	var header = createOption(INDEX);
	request(header,function(err,res){
		if(err){
			console.log(err);
			return;
		}

		var $ = cheerio.load(res.body);

		var no_item = $('._no-item').text();
		if(no_item == '未找到任何相关结果'){
			console.log('未找到任何相关结果，请使用日文原名搜索');
			return;
		}else{
			parsePage(TAG,INDEX,OPTIONS);
		}

		var NEXT = $('.next').first().children().attr('href');	//为了解决原网页的十六进制字符串在request接收后自动转码的问题，将TAG的值直接传入
			
		if(NEXT){
			NEXT = NEXT.getQueryString(TAG);
			setTimeout(function(){
				var nextUrl = INDEX.split('?')[0]+NEXT;
				getByTag(TAG,nextUrl,OPTIONS);
			},2000);
		}

	}).on('error',function(){console.log('request in getByTag error');log('request in getByTag error');});

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

String.prototype.getQueryString = function(tag){
	if(!this)	return;
	return '?word='+encodeURI(tag)+this.substring(this.indexOf('&'));
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
				}).on('error',function(){console.log('request in async in getGlobalRank error');log('request in getByTag error');});
			},function(err,callback){
				if(err){
					console.log(err);
				}
				console.log('fin');
			});

		}).on('error',function(){console.log('request in getGlobalRank error');log('request in getByTag error');});
	},

	getByTag: function(TAG,OPTIONS){
		//encodeURI()函数将字符串转化成符合URI的格式，使得请求能够到达
		var INDEX = 'http://www.pixiv.net/search.php?word='+encodeURI(TAG);
		getByTag(TAG,INDEX,OPTIONS);
	}

};



module.exports = Util;