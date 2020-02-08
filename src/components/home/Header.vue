<template>
    <div class="header">
      <div class="nav">
        <div class="nav-left">
            <router-link to="/"><img src="../../assets/img/logo.png"></router-link>
          <ul>
              <li class="sli">
                  <router-link to="/schedule">时间计划表</router-link>
                  <div class="tem">今日还有{{ noFinTask }}个未完成任务</div>
              </li>
              <li><router-link to="/timer">计时器</router-link></li>
              <li><router-link to="/daysMatter">倒数日</router-link></li>
              <li><router-link to="/todayInHistory">史上今日</router-link></li>
          </ul>
        </div>
        <div class="nav-right">
          <div class="icon" v-if="showIcon">
            <router-link to="/login">登陆</router-link>
            <router-link to="/register">注册</router-link>
          </div>
          <div class="show-name" v-if="showName">
            <span>你好, {{ username }}</span>
            <div class="tpl" @click="signout">退出</div>
          </div>
        </div>
        
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapGetters } from 'vuex';
export default {
  data () {
    return {
      curDate: null
    }
  },
  created () {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    this.curDate = year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2);
    setTimeout(() => {
      this.getNoFinTask();
    }, 200);
  },
  computed: {
    ...mapState(['username', 'noFinTask']),
    ...mapGetters(['showName', 'showIcon'])
  },
  methods: {
    signout () {
      this.$store.commit('changeUsername', '');
      this.$router.push({name: 'home'});
      document.cookie = "cookieId=' '";
    },
    getNoFinTask () {
      axios.get('http://127.0.0.1:12306/getNoFinishTask', {
        params: {
          username: this.$store.state.username,
          date: this.curDate
        }
      }).then((resp) => {
        this.$store.commit('changeNoFinTask', resp.data.data);
      }).catch(() => {
        window.console.log('请求失败');
      });
    }
  }
}
</script>

<style lang="less">
@import '../../assets/style/base.less';
.header{
  z-index: 999;
}
</style>