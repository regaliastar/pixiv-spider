/*var request = require('request'),
download = require('./download'),
fs = require('fs'),
async = require('async'),
cheerio = require('cheerio'),
file = require('./file'),
createOption = require('./requestHeader'),
parsePage = require('./parsePage');

var querystring=require("querystring");
var url=require("url");

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

var str = 'http://www.pixiv.net/member_illust.php?mode=medium&illust_id=61403733_1.';
var querystr = '?word=%E3%81%93%E3%81%AE%E7%B4%A0%E6%99%B4%E3%82%89%E3%81%97%E3%81%84%E4%B8%96%E7%95%8C%E3%81%AB%E7%A5%9D%E7%A6%8F%E3%82%92%21&order=date_d&p=2';
var host = 'http://www.pixiv.net/search.php';
var konosuba = 'この素晴らしい世界に祝福を!';

var header = createOption(host+querystr);


console.log('konosuba:'+encodeURI(konosuba));*/
var log = require('./log');

log('111');
