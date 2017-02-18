var fs = require('fs'),
 createOption = require('./requestHeader'),
 download = require('./download'),
 request = require('request');

var url = 'http://i1.pixiv.net/img-original/img/2016/12/26/00/10/12/60563056_p0.png';
var author = '9427';
//var imgHeader = createImgHeader(url);

//request(imgHeader).pipe(fs.createWriteStream('./'+author+'/'+'test.png'));
/*
var downloadImg = function(uri,filename,callback){  
    //http请求  
    request.head(uri,function(err,res,body){
        if(err){  
            console.log('err:'+err);  
            return false;  
        }
        console.log('res: '+res.body); 
        //水管式保存数据，防止未来得及记录数据又开始读取数据而导致数据丢失  
        request(imgHeader).pipe(fs.createWriteStream('./'+author+'/'+filename)).on('close',callback);       
    });  

};*/

function createImgHeader(url){
	 var cookie = 'p_ab_id=2; a_type=0; is_sensei_service_user=1; login_ever=yes; _ga=GA1.2.331475908.1487307632; device_token=4ab57657a284b5155085341f7de5d842; module_orders_mypage=%5B%7B%22name%22%3A%22recommended_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22everyone_new_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22following_new_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22mypixiv_new_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22fanbox%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22featured_tags%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22contests%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22sensei_courses%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22spotlight%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22booth_follow_items%22%2C%22visible%22%3Atrue%7D%5D; __utma=235335808.331475908.1487307632.1487307632.1487307632.1; __utmb=235335808.9.10.1487307632; __utmc=235335808; __utmz=235335808.1487307632.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; __utmv=235335808.|2=login%20ever=yes=1^3=plan=normal=1^5=gender=male=1^6=user_id=8554359=1; PHPSESSID=8554359_5a81d93dd86694b26975a1e1ef3ba29e'
    var option = {
        url: url,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-charset': 'utf8',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Cookie':cookie,
            'referer':'http://www.pixiv.net/member_illust.php?mode=medium&illust_id=60563056',
            //'Cookie': 'p_ab_id=2; login_ever=yes; visit_ever=yes; __utmt=1; PHPSESSID=16664186_b2460c5b01788fe4203ab2a97e03db90; device_token=c8454d1df1f52a450e9779a2ee0052bd; __utma=235335808.433897734.1451647016.1451647016.1451647016.1; __utmb=235335808.6.10.1451647016; __utmc=235335808; __utmz=235335808.1451647016.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmv=235335808.|2=login%20ever=yes=1^3=plan=normal=1^5=gender=male=1^6=user_id=16664186=1; _ga=GA1.2.433897734.1451647016',
            'Host': 'www.pixiv.net',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36',
        }
    };

    return option;
}

download(url);