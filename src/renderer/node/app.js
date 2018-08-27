const express = require("express");
const apicache = require("apicache");
const path = require("path");
const fs = require("fs");
const app1 = express();
let cache = apicache.middleware;

/*app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
});*/

// 跨域设置
app1.all("*", function(req, res, next) {
  if (req.path !== "/") {
    res.header("Access-Control-Allow-Credentials", true);
    // 这里获取 origin 请求头 而不是用 *
    res.header("Access-Control-Allow-Origin", req.headers["origin"] || "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
  }
  next();
});

const onlyStatus200 = (req, res) => res.statusCode === 200;

app1.use(cache("2 minutes", onlyStatus200));

app1.use(express.static(path.resolve(__dirname, "public")));

app1.use(function(req, res, next) {
  const proxy = req.query.proxy;
  if (proxy) {
    req.headers.cookie = req.headers.cookie + `__proxy__${proxy}`;
  }
  next();
});

// 因为这几个文件对外所注册的路由 和 其他文件对外注册的路由规则不一样, 所以专门写个MAP对这些文件做特殊处理
const UnusualRouteFileMap = {
  // key 为文件名, value 为对外注册的路由
  "daily_signin.js": "/daily_signin",
  "fm_trash.js": "/fm_trash",
  "personal_fm.js": "/personal_fm"
};

// 简化 路由 导出方式, 由这里统一对 router 目录中导出的路由做包装, 路由实际对应的文件只专注做它该做的事情, 不用重复写样板代码
const { createWebAPIRequest, request } = require("./util/util");
const Wrap = fn => (req, res) => fn(req, res, createWebAPIRequest, request);

// 同步读取 router 目录中的js文件, 根据命名规则, 自动注册路由
/*fs.readdirSync("./router/").reverse().forEach(file => {
  if (/\.js$/i.test(file) === false) {
    return;
  }

  let route;

  if (typeof UnusualRouteFileMap[file] !== "undefined") {
    route = UnusualRouteFileMap[file];
  } else {
    route =
      "/" +
      file
        .replace(/\.js$/i, "")
        .replace(/_/g, "/")
        .replace(/[A-Z]/g, a => {
          return "/" + a.toLowerCase();
        });
  }

  app.use(route, Wrap(require("./router/" + file)));
});*/

/*******************************************************************/
app1.use('/r', require('./readAudio/index'));

app1.use('/personalized/newsong', Wrap(require("./router/personalized_newsong")));
app1.use('/music/url', Wrap(require("./router/musicUrl")));
app1.use('/login/cellphone', Wrap(require("./router/loginCellphone")));
app1.use('/banner', Wrap(require("./router/banner")));
app1.use('/personalized', Wrap(require("./router/personalized")));
app1.use('/user/subcount', Wrap(require("./router/user_subcount")));
app1.use('/login/refresh', Wrap(require("./router/login_refresh")));
app1.use('/user/detail', Wrap(require("./router/user_detail")));
app1.use('/recommend/resource', Wrap(require("./router/recommend_resource")));
app1.use('/recommend/songs', Wrap(require("./router/recommend_songs")));
app1.use('/playlist/detail', Wrap(require("./router/playlist_detail")));
app1.use('/user/playlist', Wrap(require("./router/user_playlist")));

/*app.get('/b', function (req, res) {
  res.send(JSON.stringify({name:req.query.name, pwd: req.query.pwd}));
});*/

/*******************************************************************/

app1.listen(9082, () => {
  console.log(`server running @ http://localhost:8081`);
});
