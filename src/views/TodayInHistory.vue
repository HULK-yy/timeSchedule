<template>
  <div class="todayInHistory">
      <my-header/>
      <div class="content">
        <div class="title">
          史上今日
          <span>{{ curDate }}</span>
        </div>
        <div class="task-lists">
          <el-row class="el-row-title">
            <el-col :span="3"><div class="grid-content bg-purple">序号</div></el-col>
            <el-col :span="5"><div class="grid-content bg-purple">类型</div></el-col>
            <el-col :span="14"><div class="grid-content bg-purple-light">内容</div></el-col>
            <el-col :span="2"><div class="grid-content bg-purple">时间</div></el-col>
          </el-row>
          <el-row class="el-row-content" v-for="(item, index) in todayList" :key="item.id">
            <el-col :span="3"><div class="grid-content bg-purple">{{ index + 1 }}</div></el-col>
            <el-col :span="5"><div class="grid-content bg-purple">{{ item.type }}</div></el-col>
            <el-col :span="14"><div class="grid-content bg-purple-light">{{ item.title }}</div></el-col>
            <el-col :span="2"><div class="grid-content bg-purple">{{ item.year }}</div></el-col>
          </el-row>
        </div>
        <page-turning :page="page" :pageSize="pageSize" :iconCount="iconCount" @click="getPage" ref="pagetol" />
      </div>
      <div class="today-list">
        <div @click="screen('all')">全部</div>
        <div @click="screen('出生')">出生</div>
        <div @click="screen('大事记')">大事记</div>
        <div @click="screen('纪念日')">纪念日</div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import MyHeader from '../components/home/Header.vue';
import PageTurning from '../components/util/PageTurning.vue';
export default {
  data () {
    return {
      year: null,
      month: null,
      day: null,
      curDate: null,
      page: 1,
      pageSize: 10,
      count: 0,
      iconCount: 5,
      todayList: [],
      type: '',
    }
  },
  created () {
    // let searcheUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
    // if (!searcheUrlParams) {
    //     this.type = '';
    // }else{
    //     for (let i = 0; i < searcheUrlParams.length; i++) {
    //         if (searcheUrlParams[i].split('=')[0] == 'type') {
    //             try {
    //                 this.type = decodeURIComponent(searcheUrlParams[i].split('=')[1]);
    //             } catch (e) {
    //                 window.console.log(e);
    //             }
    //         }
    //     }
    // }
    this.getInitTime();
    this.getPage(this.page - 1, this.pageSize);
  },
  components: {
    MyHeader,
    PageTurning
  },
  methods: {
    getInitTime () {
      this.year = new Date().getFullYear();
      this.month = new Date().getMonth() + 1;
      this.day = new Date().getDate();
      this.curDate = `${this.month}-${this.day}`;
    },

    getPage (page, pageSize) {
      if(!this.type){
        axios.get('http://127.0.0.1:12306/getAllCount', {
          params: {
            date: '1-1'
          }
        }).then((resp) => {
          this.$store.commit('changeCount', resp.data.data);
          this.$refs.pagetol.generatePageTool();
        }).catch(() => {
          this.openError('请求失败');
        });

        axios.get('http://127.0.0.1:12306/getAllToday', {
          params: {
            date: '1-1',
            page: page,
            pageSize: pageSize
          }
        }).then((resp) => {
          let status = resp.data.status;
          let msg = resp.data.msg;
          if(status == 'error'){
            this.openError(msg);
          }else{
            this.todayList = resp.data.data;
          }
        }).catch(() => {
          this.openError('请求失败');
        });
      }else{
        axios.get('http://127.0.0.1:12306/getCountByType',{
          params: {
            type: this.type,
            date: '1-1'
          }
        }).then((resp) => {
          this.$store.commit('changeCount', resp.data.data);
          this.$refs.pagetol.generatePageTool();
        }).catch(() => {
          this.openError('请求失败');
        });

        axios.get('http://127.0.0.1:12306/getAllTodayByType', {
          params: {
            date: '1-1',
            type: this.type,
            page: page,
            pageSize: pageSize
          }
        }).then((resp) => {
          let status = resp.data.status;
          let msg = resp.data.msg;
          if(status == 'error'){
            this.openError(msg);
          }else{
            this.todayList = resp.data.data;
          }
        }).catch(() => {
          this.openError('请求失败');
        });
      }
    },

    screen (type) {
      if(type == 'all') {
        this.type = ''
      }else{
        this.type = type;
      }
      this.getPage(this.page - 1, this.pageSize);
      
      // window.location.href = '/todayInHistory?type=' + type;
    },
    openSuccess(msg) {
      this.$message({
          message: msg,
          type: 'success'
      });
    },
    openError(msg) {
        this.$message.error(msg);
    }
  }
}
</script>

<style lang="less">
@import '../assets/style/todayInHistory.less';
</style>