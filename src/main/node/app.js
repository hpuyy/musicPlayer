const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const request = require('./util/request')
const exec = require('child_process').exec
const cache = require('apicache').middleware

fs.mkdir('D:\\cloud-music',function(error){
  console.warn(error);
  if(error) return false;
});
fs.mkdir('D:\\cloud-music\\cache',function(error){
  console.warn(error);
  if(error) return false;
});
fs.mkdir('D:\\cloud-music\\banner',function(error){
  console.warn(error);
  if(error) return false;
});

const app = express()

// CORS
app.use((req, res, next) => {
  if(req.path !== '/' && !req.path.includes('.')){
    res.header({
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
      'Content-Type': 'application/json; charset=utf-8'
    })
  }
  next()
})

// cookie parser
app.use((req, res, next) => {
  req.cookies = {}, (req.headers.cookie || '').split(/\s*;\s*/).forEach(pair => {
    let crack = pair.indexOf('=')
    if(crack < 1 || crack == pair.length - 1) return
    req.cookies[decodeURIComponent(pair.slice(0, crack)).trim()] = decodeURIComponent(pair.slice(crack + 1)).trim()
  })
  next()
})

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// cache
app.use(cache('2 minutes', ((req, res) => res.statusCode === 200)))

// static
// app.use(express.static(path.join(__dirname, 'public')))

// router
const special = {
  'daily_signin.js': '/daily_signin',
  'fm_trash.js': '/fm_trash',
  'personal_fm.js': '/personal_fm'
}

/*fs.readdirSync(path.join(__dirname, 'module')).reverse().forEach(file => {
  if(!(/\.js$/i.test(file))) return
  let route = (file in special) ? special[file] : '/' + file.replace(/\.js$/i, '').replace(/_/g, '/')
  let question = require(path.join(__dirname, 'module', file))

  app.use(route, (req, res) => {
    let query = Object.assign({}, req.query, req.body, {cookie: req.cookies})
    question(query, request)
      .then(answer => {
        console.log('[OK]', decodeURIComponent(req.originalUrl))
        res.append('Set-Cookie', answer.cookie)
        res.status(answer.status).send(answer.body)
      })
      .catch(answer => {
        console.log('[ERR]', decodeURIComponent(req.originalUrl))
        if(answer.body.code =='301') answer.body.msg = '需要登录'
        res.append('Set-Cookie', answer.cookie)
        res.status(answer.status).send(answer.body)
      })
  })
})*/

/*******************************************************************/
app.use('/r', require('./readAudio/index'));
app.use('/res', require('./getRes/index'));
app.use('/bannerRes', require('./getRes/getBanner'));
app.use('/personalized/newsong', Wrap(require("./router/personalized_newsong")));
app.use('/song/url', Wrap(require("./router/song_url")));
app.use('/login/cellphone', Wrap(require("./router/login_cellphone")));
app.use('/banner', Wrap(require("./router/banner")));
app.use('/personalized', Wrap(require("./router/personalized")));
app.use('/user/subcount', Wrap(require("./router/user_subcount")));
app.use('/login/refresh', Wrap(require("./router/login_refresh")));
app.use('/user/detail', Wrap(require("./router/user_detail")));
app.use('/recommend/resource', Wrap(require("./router/recommend_resource")));
app.use('/recommend/songs', Wrap(require("./router/recommend_songs")));
app.use('/playlist/detail', Wrap(require("./router/playlist_detail")));
app.use('/user/playlist', Wrap(require("./router/user_playlist")));
app.use('/top/playlist', Wrap(require("./router/top_playlist")));
app.use('/playlist/catlist', Wrap(require("./router/playlist_catlist")));
app.use('/playlist/subscribe', Wrap(require("./router/playlist_subscribe")));
app.use('/like', Wrap(require("./router/like")));
app.use('/search', Wrap(require("./router/search")));
app.use('/artist/list', Wrap(require("./router/artist_list")));
app.use('/artists', Wrap(require("./router/artists")));
app.use('/lyric', Wrap(require("./router/lyric")));

function Wrap(question) {
  return (req, res) => {
    let query = Object.assign({}, req.query, req.body, {cookie: req.cookies})
    question(query, request)
      .then(answer => {
        console.log('[OK]', decodeURIComponent(req.originalUrl))
        res.append('Set-Cookie', answer.cookie)
        res.status(answer.status).send(answer.body)
      })
      .catch(answer => {
        console.log('[ERR]', decodeURIComponent(req.originalUrl))
        if(answer.body.code =='301') answer.body.msg = '需要登录'
        res.append('Set-Cookie', answer.cookie)
        res.status(answer.status).send(answer.body)
      })
  }

}
/*******************************************************************/

app.listen(9083, () => {
  console.log(`server running @ http://localhost:9083`);
});
