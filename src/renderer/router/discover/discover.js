import personality from '@/view/discover/personality';
const playList = resolve => require(['@/view/discover/playList'], resolve);
const artistList = resolve => require(['@/view/discover/artistList'], resolve);

let router = [
  {
    path: '/discover',
    name: 'personality',
    meta: {
      keepAlive: true
    },
    component: personality
  },
  {
    path: '/discover/playlist',
    name: 'playList',
    meta: {
      keepAlive: true
    },
    component: playList
  },
  {
    path: '/discover/artistList',
    name: 'artistList',
    meta: {
      keepAlive: true
    },
    component: artistList
  }
];

export default router;
