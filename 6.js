var http = require('http');
var fs = require('fs');
var path = require('path');
var nodeurl = require('url');

var mime = require('./mime.json');

http.createServer(function(req, res) {
	var url = req.url;
	var ext = path.extname(url);

	if (url.substr(0, 4) === '/get') {
		res.writeHead(200, {
			'Content-Type': 'text/html;charset=utf-8'
		});
		res.end(`
			<p>mime: ${req.headers['content-type']}</p>
			<i>data: ${JSON.stringify(nodeurl.parse(url,true).query)}</i>
		`)
	} else if (url === '/post') {
		res.writeHead(200, {
			'Content-Type': 'text/html;charset=utf-8'
		});
		var body = '';
		req.addListener('data', function(chunk) {
			body += chunk;
		})

		req.addListener('end', function() {
			res.end(`
				<p>mime: ${req.headers['content-type']}</p>
				<i>data: ${body}</p>
			`)
		})

	} else {
		res.writeHead(200, {
			'Content-Type': mime[ext]
		});
		fs.createReadStream(__dirname + url).pipe(res);
	}
}).listen(666);