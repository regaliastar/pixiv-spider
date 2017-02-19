# 基于 nodejs 的Pixiv(简称P站)爬虫

## 运行方式

```
node app
```

## 依赖

1. cheerio
2. request

## 实现功能

1. 遍历某ID画师的所有作品并下载
2. 遍历某ID画师收藏夹下的所有作品，选择条件下载
3. 查最近一周内全站最热门top100的作品并下载

## tips
有时候若出现 `Error: read ECONNRESET` 报错，过一段时间在重试就好，原因可能是P站主动断开了我方连接