/**
 *Date:2017/2/18
 *功能：传入作者的ID号和URL，从一个页面内的所有缩略图中找到原图并下载
 *originUrl format: http://www.pixiv.net/member_illust.php?id=9427
 */

var request = require('request'),
fs = require('fs'),
async = require('async'),
cheerio = require('cheerio'),
createOption = require('./requestHeader'),
log = require('./log');
download = require('./download');

function parsePage(ID,originUrl,OPTIONS){
	console.log('originUrl:'+originUrl);
	var header = createOption(originUrl);
	request(header,function(err,res){
		if(err){
			console.log(err);
			return;
		}
		console.log('正在访问：'+originUrl);
		var $ = cheerio.load(res.body);
		var Urls = [];
		if(!OPTIONS){
			$('._image-items').children().each(function(i,elem){
				Urls.push('http://www.pixiv.net'+$(this).children().first().attr('href'));
			});
		}else{
			$('._image-items').children().each(function(i,elem){
				let Colle = $(this).children().last().children().children().text().trim() || '0';
				var collection = OPTIONS.collection || 10000;
				if(Colle >= collection){
					Urls.push('http://www.pixiv.net/'+$(this).children().first().attr('href'));
				}

			});
		}

		console.log('共有：'+Urls.length+'个URL等待处理');
		async.mapLimit(Urls,2,function(url,callback){
			console.log('正在访问：'+url);
			if(!url){return;}
			var imgHeader = createOption(url);
			request(imgHeader,function(err,res){
				if(err){
					console.log(err);
					log(err);
					return;
				}
				var $ = cheerio.load(res.body);

				//得到作者ID
				var authorId = $('.user-link').first().attr('href').split('=')[1]+'_';
				//原始大小图片1400*1400
				var oriImgUrl = $('img[class=original-image]').attr('data-src');
				//图片后缀
				if(oriImgUrl){
					var postfix = oriImgUrl.trim().substr(oriImgUrl.length-4) || '.png';
			
				//图片名称
					var imgName = $('img[class=original-image]').attr('alt')+postfix || Date.now()+Math.random()*1000+postfix;
					if(!OPTIONS){
						download(oriImgUrl,authorId+imgName,ID);
					}else{
						download(oriImgUrl,authorId+imgName,ID+'/collection');
					}
				}else{
					var mutilName = $('.ui-expander-target').children('.title').text().formatFilename();
					parseMutil(ID+'/'+mutilName,$);
				}
			
				callback();		//若没有callback(),则只会执行并行数量的任务
			}).on('error',function(){console.log('request in async in parsePage.js error');log('request in async in parsePage.js error');});
		},function(err,callback){
			if(err){
				console.log(err);
				log(err);
			}
			console.log('fin');
		})

	}).on('error',function(){console.log('request in parsePage.js error');log('request in parsePage.js error');})	

}

/**
 *Date:2017/2/21
 *解析包含多幅图的图包并下载
 *
 *传入参数：$是当前页面，fn指的是创建的文件夹的路径
 */
function parseMutil(fn,$){
	var url = 'http://www.pixiv.net/'+$('._work.multiple').first().attr('href');
	var header = createOption(url);
	request(header,function(err,res){
		if(err){
			console.log(err);
			log(err);
			return;
		}
		console.log('正在访问：'+url);
		var $ = cheerio.load(res.body);

		var Urls = [];
		$('.item-container').each(function(i,item){
			Urls.push($(this).children('.image').attr('data-src'));
		});

		if(Urls.length == 0)	return;
		var count = 0;
		async.mapLimit(Urls,2,function(url,callback){
			var postfix = url.trim().substr(url.length-4) || '.png';
			count++;
			var imgName = count+''+postfix || Date.now()+Math.random()*1000+postfix;
			download(url,imgName,fn);

			callback();
		},function(err,callback){
			if(err){
				console.log(err);
				log(err);
			}
			console.log('fin');
		})

	}).on('error',function(){console.log('request in parseMutil in parsePage.js error');log('request in parseMutil in parsePage.js error');});

}

String.prototype.formatFilename = function(){
    if(!this)   return;
    return this.replace(/\\/g,'.').replace(/\//g,'.');
}

exports.parsePage = parsePage;
exports.parseMutil = parseMutil;