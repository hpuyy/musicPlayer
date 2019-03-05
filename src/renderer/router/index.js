import Vue from 'vue'
import Router from 'vue-router'
import discover from '@/view/discover/index';
import discover_r from './discover/discover';

/*****************非首页展示栏目*懒加载********************************/

const recommendSongs = resolve => require(['@/view/recommend/recommendSongs'], resolve);
const songList = resolve => require(['@/view/songList/songList'], resolve);
const artistSongList = resolve => require(['@/view/songList/artistSongList'], resolve);
const search = resolve => require(['@/view/search/search'], resolve);
const localMusic = resolve => require(['@/view/localMusic/localMusic'], resolve);


Vue.use(Router);

export default new Router({
  routes: [
    {path: "/", redirect: "/discover"},
    {
      path: '/',
      name: 'discover',
      children: discover_r,
      meta: {
        keepAlive: true
      },
      component: discover
    },{
      path: '/recommend/songs',
      name: 'recommendSongs',
      meta: {
        keepAlive: true
      },
      component: recommendSongs
    },{
      path: '/songList',
      name: 'songList',
      component: songList
    },{
      path: '/artist/songList',
      name: 'artistSongList',
      component: artistSongList
    },{
      path: '/search',
      name: 'search',
      component: search,
      meta: {
        keepAlive: true
      }
    },{
      path: '/localMusic',
      name: 'localMusic',
      component: localMusic,
      meta: {
        keepAlive: true
      }
    }
  ]
})
