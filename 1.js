var http = require('http');
var fs = require('fs');
var path = require('path');

//0、以node低配版静态服务器为切入点说明content-type的作用以及重要性
//1、展示浏览器兼容
http.createServer(function(req, res) {
	var url = req.url;
	fs.createReadStream(__dirname + url).pipe(res);
}).listen(666);