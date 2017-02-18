var request = require('request'),
fs = require('fs'),
async = require('async'),
File = require('./functions'),
cheerio = require('cheerio'),
superagent = require('superagent'),
createOption = require('./requestHeader'),
events = require('events'),
parsePage = require('./parsePage'),
download = require('./download');

var ID = '9427';
var originUrl = 'http://www.pixiv.net/member_illust.php?id=9427';

parsePage(ID,originUrl);