webpackJsonp([4],{Qfyp:function(e,s){},sBRj:function(e,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var t=a("//Fk"),n=a.n(t),c=a("mtWM"),i=a.n(c),r={name:"music-search",data:function(){return{searchText:"",searchType:1,content:[]}},mounted:function(){},methods:{searchMusic:function(){this.content=[];var e,s=this;(e=this.searchText,new n.a(function(s,a){i.a.get("/soso/fcgi-bin/search_for_qq_cp",{params:{w:e,format:"json",inCharset:"utf8",outCharset:"utf-8",notice:0,catZhida:1,p:1,perpage:20,n:20,g_tk:5381,platform:"h5",needNewCode:1,zhidaqu:1,t:0,flag:1,ie:"utf-8",sem:1,aggr:0,remoteplace:"txt.mqq.all"}}).then(function(e){s(e.data.song.list)})})).then(function(e){console.log(e),s.content=e})}}},o={render:function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("div",[a("header",[a("i",{staticClass:"icon-back",on:{click:function(s){e.$router.push("/index/findMusic")}}},[e._v("\n       \n    ")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.searchText,expression:"searchText"}],staticClass:"search-box",attrs:{type:"text",placeholder:"搜索  #发现好歌#"},domProps:{value:e.searchText},on:{keyup:function(s){if(!("button"in s)&&e._k(s.keyCode,"enter",13,s.key))return null;e.searchMusic()},input:function(s){s.target.composing||(e.searchText=s.target.value)}}}),e._v(" "),a("div",{staticClass:"searxh-nav",on:{click:function(s){e.searchMusic()}}},[a("nav",{class:{checked:1===e.searchType},on:{click:function(s){e.searchType=1}}},[e._v("单曲")]),e._v(" "),a("nav",{class:{checked:100===e.searchType},on:{click:function(s){e.searchType=100}}},[e._v("歌手")]),e._v(" "),a("nav",{class:{checked:10===e.searchType},on:{click:function(s){e.searchType=10}}},[e._v("专辑")]),e._v(" "),a("nav",{class:{checked:1e3===e.searchType},on:{click:function(s){e.searchType=1e3}}},[e._v("歌单")]),e._v(" "),a("nav",{class:{checked:1002===e.searchType},on:{click:function(s){e.searchType=1002}}},[e._v("用户")])])]),e._v(" "),a("div",{staticClass:"content"},[a("ul",{directives:[{name:"show",rawName:"v-show",value:1===e.searchType,expression:"searchType === 1"}]},e._l(e.content,function(s,t){return a("li",{staticClass:"songs"},[a("div",{staticClass:"name"},[e._v(e._s(s.songname))]),e._v(" "),a("div",{staticClass:"artist"},[e._v(e._s(s.singer[0].name))])])})),e._v(" "),a("ul",{directives:[{name:"show",rawName:"v-show",value:100===e.searchType,expression:"searchType === 100"}]},e._l(e.content.artists,function(s,t){return a("li",{staticClass:"artists"},[a("img",{attrs:{src:s.img1v1Url}}),e._v(" "),a("div",{staticClass:"name"},[e._v(e._s(s.name)),a("span",{directives:[{name:"show",rawName:"v-show",value:void 0!==s.alia,expression:"item.alia!==undefined"}]},[e._v(" ("+e._s(s.alias[0])+")")])])])})),e._v(" "),a("ul",{directives:[{name:"show",rawName:"v-show",value:10===e.searchType,expression:"searchType === 10"}]},e._l(e.content.albums,function(s,t){return a("li",{staticClass:"albums artists"},[a("img",{attrs:{src:s.picUrl}}),e._v(" "),a("div",[a("div",{staticClass:"name"},[e._v(e._s(s.name))]),e._v(" "),a("div",[e._v(e._s(s.artist.name))])])])})),e._v(" "),a("ul",{directives:[{name:"show",rawName:"v-show",value:1e3===e.searchType,expression:"searchType === 1000"}]},e._l(e.content.playlists,function(s,t){return a("li",{staticClass:"play-lists artists"},[a("img",{attrs:{src:s.coverImgUrl}}),e._v(" "),a("div",[a("div",{staticClass:"name"},[e._v(e._s(s.name))]),e._v(" "),a("div",[e._v(e._s(s.creator.nickname))])])])})),e._v(" "),a("ul",{directives:[{name:"show",rawName:"v-show",value:1002===e.searchType,expression:"searchType === 1002"}]},e._l(e.content.userprofiles,function(s,t){return a("li",{staticClass:"users artists"},[a("img",{attrs:{src:s.avatarUrl}}),e._v(" "),a("div",[a("div",{staticClass:"name"},[e._v(e._s(s.nickname))])])])}))])])},staticRenderFns:[]};var l=a("VU/8")(r,o,!1,function(e){a("Qfyp")},"data-v-20dec89c",null);s.default=l.exports}});
//# sourceMappingURL=4.44a1b0c0c445a3a471f1.js.map