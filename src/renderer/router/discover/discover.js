import personality from '@/view/discover/personality';
const playList = resolve => require(['@/view/discover/playList'], resolve);

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
  }
];

export default router;
