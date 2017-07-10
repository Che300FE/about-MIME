var http = require('http');
var fs = require('fs');
var path = require('path');
var nodeurl = require('url');

var mime = require('./mime.json');


//0、get请求，从页面链接请求，表单请求，ajax请求（原生&jquery）说明mime类型在get请求中的作用！
// 		----> ajax不设置请求头&设置请求头
//1、修改响应头，展示页面在浏览器中的不同表现  
var str = 'http://www.che300.com?a=1&b=2&c=3'
console.log(nodeurl.parse(str,true).query)
http.createServer(function(req, res) {
	var url = req.url;
	var ext = path.extname(url);

	if (url.substr(0,4) === '/get') {
		res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
		res.end(`
			<p>mime: ${req.headers['content-type']}</p>
			<i>data: ${JSON.stringify(nodeurl.parse(url,true).query)}</i>
		`)
	} else {
		res.writeHead(200,{'Content-Type': mime[ext]});
		fs.createReadStream(__dirname + url).pipe(res);
	}
}).listen(666);