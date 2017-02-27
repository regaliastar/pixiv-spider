var express = require('express');
 path = require('path');
 routes = require('./routes/index');

var app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

routes(app);

if (module.parent) {
  module.exports = app;
} else {
  // 监听端口，启动程序
  app.listen(3000, function () {
    console.log('pixiv-Spider listening on port 3000');
  });
}


/*
var Util = require('./Util');

//教主ID：1184799
//大嘘ID：457541
var ID = '457541';

var options = {
	collection:1000
};


Util.getPixiver(ID);
//Util.getCollection(ID,options);
//Util.getGlobalRank();
//Util.getByTag('この素晴らしい世界に祝福を!',options);
//Util.getByTag('崩坏3',options);

*/