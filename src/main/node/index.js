let express = require('express');
let util = require('util');
let app = express();
// let proxy = require('express-http-proxy');
// let _time = new Date().getTime();
// const url=require('url');
// let superagent = require('superagent');

// app.use('/', proxy('https://u.y.qq.com'));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
});

//路由
/*let a = require("./yqq.com/testApi");
let b = require("./database/database");
app.use('/a', a);
app.use('/b', b);*/

let loadSrc = require('./readAudio/index');
app.use('/r', loadSrc);

app.get('/b', function (req, res) {
  res.send(JSON.stringify({name:req.query.name, pwd: req.query.pwd}));
});

let server = app.listen(8081, function () {

  let port = server.address().port;

  console.log("Server running at http://127.0.0.1:%s/", port)
});