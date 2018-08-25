import Vue from 'vue'
import Router from 'vue-router'
// const discover = resolve => require(['@/view/discover/index'], resolve);
import discover from '@/view/discover/index';
const recommendSongs = resolve => require(['@/view/recommend/recommendSongs'], resolve);
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'discover',
      component: discover
    },
    {
      path: '*',
      redirect: '/'
    },{
      path: '/recommend/songs',
      name: 'recommendSongs',
      component: recommendSongs
    }
  ]
})
