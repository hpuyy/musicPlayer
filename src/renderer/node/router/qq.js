let express = require('express');
let router = express.Router();
let superagent = require('superagent');
let _time = new Date().getTime();

//跨域请求第三方站点（QQ音乐）接口
router.post('/cgi-bin/musicu', function (req, res) {
  let sreq = superagent.post('https://u.y.qq.com/cgi-bin/musicu.fcg?'+_time).send({
    "req_0": {
      "module": "track_info.UniformRuleCtrlServer",
      "method":"GetTrackInfo",
      "param":{
        "ids":[109005773, 214003654, 214918545, 7118468, 5170189, 214360296, 214236421, 105775732, 102197504, 212808217, 213769257, 201255849, 213470055, 213978475, 212606735, 214734117, 214312256, 213266098, 108029927, 213910991, 212869977, 102384390, 213107448, 200812326, 204586755, 104690200, 105030812, 212130609, 212437019, 101806757, 212877015, 212756276, 214728709, 214305831, 200369396, 209340068, 108988867, 102699343, 212628854, 214182478, 214386093, 212859961, 208662441, 105388642, 212885807, 5092537, 105748767, 213607515, 213327162, 107192078],
        "types":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
      },
    "comm":{
      "g_tk": 5381,
      "uin":0,
      "format": "json",
      "ct":23,
      "cv":0
      }
  });
  sreq.pipe(res);
  sreq.on('end', function(){
    console.log('done2');
  });
});

router.post('/cgi-bin/musicu1', function (req, res) {
  let sreq = superagent.post('https://u.y.qq.com/cgi-bin/musicu.fcg?'+_time).send({
    "req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"6961469020","songmid":["004R2ZVY1Xt5oN","002dh98v0Clgrm","002Z4VIo3R8iGN","001qRZab27SuVa","002V8Vde2dKIEx","002XxBWy1qFQxJ","003ZFC693GZKCq","003GbiVB1LliR1","001KfZgl2P8AaH","000nNzj03CNUIT","004RiqvD4Necim","002YYV7g0FlXAp","000C0joK1H4ZMY","0001n62Q0uuzMB","000Md1wq0vnwzE","001UjSM03qjpTD","003BRuue1TFfOk","000rnXvS2DFTXb","0025oC6o2wuKEn","004XePmv4CsaEq","0025O6eU22K9Og","001nQYWD0GYxo1","002mxwrG3yeN6N","004JaCzc1KhTrU","001yYM0I30CzdP","000ocSdp4SSl6P","002NkERn2LNVI4","003vUjJp3QwFcd","000Wk6NP4NaAPo","000ffReZ1XyCS7","003YC3p31HyR96","003r8zKA1NRSNz","004R7HNg2s6dQ9","004IN7fY4WIB6w","0041gObR2QG98x","000ByvB6495lpZ","00021LgB2RC7tR","001BaZ263wqkmP","002WqezQ4dmIeT","003FFWnA3AIczD","003njByH10fleu","002lUqDY0GmcWj","0016aHoC1IyI1d","003UTRfZ12wGOs","004ecYc235Fsyp","002ZnJAb2w8Ynn","000Xv8A04LVr84","001kogHh1HTmEN","001T62iI4Ykb9h","003OUlho2HcRHC"],"songtype":[],"uin":"0","loginflag":0,"platform":"23"}},"comm":{"g_tk":5381,"uin":0,"format":"json","ct":23,"cv":0}
  });
  sreq.pipe(res);
  sreq.on('end', function(){
    console.log('done3');
  });
});

module.exports = router;
