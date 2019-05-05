import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import alert from './core/alert'
import loading from './core/loading'
import colorPicker from './core/vue-color-picker'

Vue.use(colorPicker);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;
Vue.prototype.$alert = alert;
Vue.prototype.$loading = loading;

// 路由拦截
router.beforeEach((to, from, next) => {
  if (to.fullPath === '/recommend/songs') {
    if(!localStorage.getItem('userInfo')) {
      alert('该功能需要登入！');
      return;
    }
  }
  next()
});

new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app');
