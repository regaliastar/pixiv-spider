# 基于 nodejs 的Pixiv(简称P站)爬虫

## 运行方式

```
node app
```

## 依赖

1. cheerio
2. request

## tips
有时候若出现 `Error: read ECONNRESET` 报错，过一段时间在重试就好，原因可能是P站主动断开了我方连接