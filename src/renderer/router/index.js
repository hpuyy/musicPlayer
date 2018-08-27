import Vue from 'vue'
import Router from 'vue-router'
import discover from '@/view/discover/index';

/*****************非首页展示栏目*懒加载********************************/

const recommendSongs = resolve => require(['@/view/recommend/recommendSongs'], resolve);
const songList = resolve => require(['@/view/songList/songList'], resolve);

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'discover',
      meta: {
        keepAlive: true
      },
      component: discover
    },
    {
      path: '*',
      redirect: '/'
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
      meta: {
        keepAlive: true
      },
      component: songList
    }
  ]
})
