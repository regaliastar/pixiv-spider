var fs = require('fs'),
 request = require('request'),
 log = require('./log');

String.prototype.formatFilename = function(){
    if(!this)   return;
    return this.replace(/\\/g,'.').replace(/\//g,'.');
}

//url format: http://i2.pixiv.net/c/600x600/img-master/img/2014/08/14/23/06/55/45358677_p0_master1200.jpg
function download(url,fn,author){
    if(author.indexOf('/') != -1){
        var outFile = author.split('/')[0];
        if(!fs.existsSync('./'+outFile+'/')){
            fs.mkdirSync('./'+outFile+'/');
        }
    }
    if(author !== undefined && !fs.existsSync('./'+author+'/')){
        fs.mkdirSync('./'+author+'/');
    }
    if(!url) {
        console.log("必须指定一个URL！");
        return;
    }
    if(fn.indexOf('.jpg') == -1 && fn.indexOf('.png') == -1 && fn.indexOf('.gif') == -1){
        console.log('图片名错误');
        return;
    }
    var id= url.substring(url.lastIndexOf('/')+1,url.indexOf('_'));

    var filename = fn.formatFilename();
    var reg = /i[0-9].pixiv.net/;
    var host = reg.exec(url)[0];
    var options = {
        url: url,
        headers: {
            'Accept':'image/webp,image/*,*/*;q=0.8',
            'Accept-Encoding':'gzip, deflate, sdch',
            'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
            'Connection':'keep-alive',
            'Cookie':'p_ab_id=2; _ga=GA1.2.433897734.1451647016; device_token=6160f7e569c0860ae8a99c98f017c65d; module_orders_mypage=%5B%7B%22name%22%3A%22everyone_new_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22spotlight%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22featured_tags%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22contests%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22following_new_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22mypixiv_new_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22booth_follow_items%22%2C%22visible%22%3Atrue%7D%5D; __utma=235335808.433897734.1451647016.1457359994.1457700215.45; __utmc=235335808; __utmz=235335808.1457359994.44.4.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; __utmv=235335808.|2=login%20ever=yes=1^3=plan=normal=1^5=gender=male=1^6=user_id=16664186=1; PHPSESSID=16664186_e4ae9f7c7304939796760dd4c7ea7dc1',
            'Host':host,
            'Referer':'http://www.pixiv.net/member_illust.php?mode=medium&illust_id='+id,
            'Upgrade-Insecure-Requests':1,
            'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36',

        }
    };


    request(options)
        .on('error',function(err){console.log('error in download:'+err);log('error in download:'+err+' 作者ID：'+id);again(url,filename,author);return;})
            .pipe(fs.createWriteStream('./'+author+'/'+filename))
                .on('error',function(err){console.log('error in download:'+err);log('error in download:'+err+' 作者ID：'+id);again(url,filename,author);return;})
                    .on('close', function(){console.log(filename+'下载完成');});

}

function again(url,fn,author){
    setTimeout(function(){
        download(url,fn,author);
    },10000);
}

module.exports = download;