# Pixiv(简称P站)爬虫

<p align="left">
	<img alt="" src="https://img.shields.io/badge/JavaScript-ES6-green.svg" />
	<img alt="MIT" src="https://img.shields.io/npm/l/express.svg" />
</p>

## 运行方式

在根目录下 `npm install`,再 `node app`

## 依赖

1. cheerio
2. request

## 实现功能

1. 遍历某ID画师的所有作品并下载 如：`Util.getPixiver(ID)`
2. 遍历某ID画师收藏夹下的所有作品，选择条件下载 如：`Util.getCollection(ID,options)`
3. 查最近一周内全站最热门top100的作品并下载 如：`Util.getGlobalRank()`
4. 支持搜索功能，可根据关键字(tag)搜索想要的作品 如：`Util.getByTag('この素晴らしい世界に祝福を!',options)`

## tips
有时候若出现 `Error: read ECONNRESET` 报错，过一段时间在重试就好，原因可能是P站主动断开了我方连接