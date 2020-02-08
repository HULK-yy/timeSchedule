import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/asset.less';

Vue.use(ElementUI);

Vue.config.productionTip = false;

// 获取cookie
function getCookie () {
  let cookieArr = document.cookie.split('; ');
  let temp = {};
  for(let i = 0; i < cookieArr.length; i++){
    temp[cookieArr[i].split('=')[0]] = cookieArr[i].split('=')[1];
  }
  return temp;
}

router.beforeEach((to, from, next) => {
  const needLogin = to.meta.login;
  if(needLogin){
    let temp = getCookie();
    if(temp.cookieId == undefined || temp.cookieId.length < 5){
      const toLoginFlag = window.confirm('该页面需要登陆后访问, 前往登录吗?');
      if(toLoginFlag){
        next('/login');
      }
      return;
    }
  }
  next();
});

new Vue({
  mounted () {
    let temp = getCookie();
    if(temp.cookieId && temp.cookieId.length > 10){
      axios.get('http://127.0.0.1:12306/getUsernameById', {
        params: {
          cookieId: temp.cookieId
        }
      }).then((resp) => {
        this.$store.commit('changeUsername', resp.data.data[0].username);
      }).catch(() => {
        window.console.log('请求失败');
      });
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app');