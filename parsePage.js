/**
 *功能：传入作者的ID号和URL，从缩略图中找到原图并下载
 *originUrl format: http://www.pixiv.net/member_illust.php?id=9427
 */

var request = require('request'),
fs = require('fs'),
async = require('async'),
cheerio = require('cheerio'),
createOption = require('./requestHeader'),
events = require('events'),
download = require('./download');

function parsePage(ID,originUrl){

	var header = createOption(originUrl);
	request(header,function(err,res){
		if(err){
			console.log(err);
			return;
		}
		var $ = cheerio.load(res.body);
		var Urls = [];

		$('._image-items').children().each(function(i,elem){
			Urls.push('http://www.pixiv.net'+$(this).children().first().attr('href'));

		});
		console.log('共有：'+Urls.length+'个URL等待处理');
		async.mapLimit(Urls,5,function(url,callback){
			console.log('正在访问：'+url);
			var imgHeader = createOption(url);
			request(imgHeader,function(err,res){
				if(err){
					console.log(err);
					return;
				}
				var $ = cheerio.load(res.body);
			//中等大小图片600*600
			var midImgUrl = $('._layout-thumbnail').children().first().attr('src');
			//原始大小图片1400*1400
			var oriImgUrl = $('img[class=original-image]').attr('data-src');
			//图片后缀
			if(oriImgUrl){
				var postfix = oriImgUrl.trim().substr(oriImgUrl.length-4) || '.png';
			}
			
			//图片名称
			var imgName = $('img[class=original-image]').attr('alt')+postfix || Date.now()+Math.random()*1000+postfix;

			download(oriImgUrl,imgName,ID);
			
			callback();		//若没有callback(),则只会执行并行数量的任务
		});
		},function(err,callback){
			if(err){
				console.log(err);
			}
			console.log('fin');
		})

	})	

}

module.exports = parsePage;