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

console.log('url:'+str.getUrl());
console.log('rankNumber:'+str.getRankNumber());