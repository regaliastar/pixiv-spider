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
			var NEXT_URL = URL.split('?')[0]+NEXT;
			if(!OPTIONS){
				parse(ID,NEXT_URL);
				console.log('无option');
			}else{
				parse(ID,NEXT_URL,OPTIONS);
				console.log('有option');
			}
			
		}

	});
}

var Util = {
	getPixiver: function(ID){
		var INDEX = 'http://www.pixiv.net/member_illust.php?id='+ID;
		parse(ID,INDEX);
	},

	getCollection: function(ID,OPTIONS){
		var INDEX = 'http://www.pixiv.net/bookmark.php?id='+ID;
		parse(ID,INDEX,OPTIONS);
	}

};



module.exports = Util;