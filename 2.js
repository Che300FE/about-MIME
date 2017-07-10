var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('./mime.json');
/*
0、响应头加入content-type，展示浏览器兼容
1、定义：Content-Type，内容类型，一般是指网页中存在的Content-Type，
用于定义网络文件的类型和网页的编码，决定浏览器将以什么形式、什么编码读取这个文件，
这就是经常看到一些Asp网页点击的结果却是下载到的一个文件或一张图片的原因。
2、ContentType属性指定响应的 HTTP内容类型。如果未指定 ContentType，默认为TEXT/HTML。
3、请求头、响应头
*/
http.createServer(function(req, res) {
	var url = req.url;
	var ext = path.extname(url);
	res.writeHead(200,{'Content-Type': mime[ext]});
	fs.createReadStream(__dirname + url).pipe(res);
}).listen(666);