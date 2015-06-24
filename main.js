var express = require('express');
var app = express();
var React = require('react');

function getJSPath(path) {
  return "/public" + path.replace(__dirname + "/page", '').replace('.jsx', '.js');
}

// server端将react组件塞进html里，并提供：
// 1. 初始数据，在#iso-data处
// 2. 要请求的js地址
function render(pagePath, data) {
  var Page = require(pagePath);
  var appHTML = React.renderToString(<Page {...data} />);
  // uncomment this line the disable isomorphic render
  // var appHTML = '';
  return `
  <html>
  <head>
    <title> Demo </title>
  </head>
  <body>
    <div id="app">${appHTML}</div>
    <script type="json/template" id="iso-data">${JSON.stringify(data)}</script>
    <script src="${getJSPath(pagePath)}"></script>
  </body>
  </html>
  `;
}

// 自定义的express模板
app.engine('jsx', function(filepath, data, callback) {
  callback(null, render(filepath, data));
});
// 模板文件都放在page目录下
app.set('views', __dirname + "/page");

// 将public目录做为静态文件目录
app.use('/public', express.static("public"));

// a fake db for todos
var todos = [
  "buy coffee",
  "close the door"
];

app.get('/', function (req, res) {
    res.render('index.jsx', {
      todos:  todos
    });
});

app.post('/api/add', function (req, res) {
  var content = req.query.content;
  todos.push(content);
});

var port = 3004;
app.listen(port, function() {
  console.log(`listening on ${port}`);
});
