<template>
  <div class="schedule">
    <my-header />
    <div class="content">
      <div class="title">任务列表</div>
      <div class="task-list">
        <ul>
          <li v-for="(item, index) in taskList" :key="index" :class="{active: item.isFinish == 1}">
            <i class="el-icon-notebook-2"></i>
            <div class="task-msg">
              <p class="text">{{ item.task }}</p>
              <p class="time">{{ item.addDate }}</p>
            </div>
            <div class="tpl">
              <el-button type="success" icon="el-icon-check" circle @click="finishBtn(item._id)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="delBtn(item._id)"></el-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="page-tool">
      <page-turning :page="page" :pageSize="pageSize" :iconCount="iconCount" @click="getPage" ref="pagetol" />
    </div>
    <div class="nav-list">
      <schedule-left @click="allScreen"/>
    </div>
  </div>
</template>

<script>
import MyHeader from "../components/home/Header.vue";
import ScheduleLeft from '../components/schedule/ScheduleLeft.vue';
import PageTurning from '../components/util/PageTurning.vue';
import axios from 'axios';
export default {
  data() {
    return {
      year: null,
      month: null,
      day: null,
      curDate: null,
      page: 1,
      pageSize: 6,
      iconCount: 5,
      type: '',
      typeScr: '',
      taskList: [],
    };
  },
  created () {
    this.getUrlHash();
    this.getInitTime();
    this.getPage(this.page - 1, this.pageSize);
  },
  methods: {
    getUrlHash () {
      let searcheUrlParams = location.hash.indexOf('#') > -1 ? location.hash.split('#')[1].split('&') : '';
      if (!searcheUrlParams) {
        this.type = '';
      }else{
        for (let i = 0; i < searcheUrlParams.length; i++) {
          if (searcheUrlParams[i].split('=')[0] == 'type') {
            try {
              this.type = decodeURIComponent(searcheUrlParams[i].split('=')[1]);
            } catch (e) {
              window.console.log(e);
            }
          }
        }
      }
    },
    getInitTime () {
      this.year = new Date().getFullYear();
      this.month = new Date().getMonth() + 1;
      this.day = new Date().getDate();
      this.curDate = this.year + '-' + ('0' + this.month).slice(-2) + '-' + ('0' + this.day).slice(-2);
    },
    allScreen (type) {
      let tempArr = [...arguments];
      if(type == 'cal'){
        this.year = tempArr[1];
        this.month = tempArr[2];
        this.day = tempArr[3];
        this.curDate = `${this.year}-${('0' + this.month).slice(-2)}-${('0' + this.day).slice(-2)}`;
        window.location.hash = '';
        this.type = '';
        this.getPage(this.page - 1, this.pageSize);
      }else if(type == 'scr'){
        this.typeScr = tempArr[1];
        window.location.hash = 'type=' + this.typeScr;
        this.getUrlHash();
        this.getPage(this.page - 1, this.pageSize);
      }else if(type == 'page'){
        this.getPage(tempArr[1], tempArr[2]);
      }
    },
    openSuccess(msg) {
      this.$message({
          message: msg,
          type: 'success'
      });
    },
    openError(msg) {
        this.$message.error(msg);
    },
    getPage (page, pageSize) {
      if(!this.type){
        axios.get('http://127.0.0.1:12306/getTaskAllCount', {
          params: {
            username: this.$store.state.username,
            date: this.curDate
          }
        }).then((resp) => {
          this.$store.commit('changeCount', resp.data.data);
          this.$refs.pagetol.generatePageTool();
        }).catch(() => {
          this.openError('请求失败');
        });

        axios.get('http://127.0.0.1:12306/getTaskAllToday', {
          params: {
            username: this.$store.state.username,
            date: this.curDate,
            page: page,
            pageSize: pageSize
          }
        }).then((resp) => {
          let status = resp.data.status;
          let msg = resp.data.msg;
          this.taskList = resp.data.data;
          if(status == 'error'){
            this.openError(msg);
          }
        }).catch(() => {
          this.openError('请求失败');
        });
      }else{
        axios.get('http://127.0.0.1:12306/getTaskCountByType',{
          params: {
            type: this.type,
            username: this.$store.state.username,
            date: this.curDate
          }
        }).then((resp) => {
           this.$store.commit('changeCount', resp.data.data);
           this.$refs.pagetol.generatePageTool();
        }).catch(() => {
          this.openError('请求失败');
        });

        axios.get('http://127.0.0.1:12306/getTaskAllTodayByType', {
          params: {
            username: this.$store.state.username,
            date: this.curDate,
            type: this.type,
            page: page,
            pageSize: pageSize
          }
        }).then((resp) => {
          let status = resp.data.status;
          let msg = resp.data.msg;
          this.taskList = resp.data.data;
          if(status == 'error'){
            this.openError(msg);
          }
        }).catch(() => {
          this.openError('请求失败');
        });
      }
    },
    finishBtn (id) {
      axios.post('http://127.0.0.1:12306/finishTaskById', {
        id: id
      }).then((resp) => {
        window.console.log(resp)
        this.getPage(0, this.pageSize);
      }).catch(() => {
        window.console.log('请求失败');
      });
    },
    delBtn (id) {
      axios.post('http://127.0.0.1:12306/delTaskById', {
        id: id
      }).then((resp) => {
        window.console.log(resp)
        this.getPage(0, this.pageSize);
      }).catch(() => {
        window.console.log('请求失败');
      });
    }
  },
  components: {
    ScheduleLeft,
    MyHeader,
    PageTurning,
  }
};
</script>

<style lang="less">
@import '../assets/style/schedule.less';
</style>