<template>
  <div class="daysMatter">
    <my-header />
    <div class="content">
      <div class="title">
        DaysMatter
        <i class="el-icon-circle-plus" @click="openBox"></i>
      </div>
      <div class="task-list">
        <ul>
          <li v-for="(item, index) in taskList" :key="index">
            <p class="p-title" :class="{alreadyStyle: item.type == '起始日'}">{{ item.content }}{{ item.type == '起始日' ? '已经' : '还有' }}</p>
            <p class="p-content">{{ timeFn(item.time) }}</p>
            <p class="p-time">{{ item.time }}</p>
            <div class="p-tpl">
              <el-button type="danger" icon="el-icon-delete" circle @click="delBtn(item._id)"></el-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <page-turning :page="page" :pageSize="pageSize" :iconCount="iconCount" @click="getPage" ref="pagetol"/>
    <div class="daybox-box" @click="getMsgFlag" v-if="dayBoxFlag">
      <day-box ref="dayBoxRef" @click="getPage"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import MyHeader from "../components/home/Header.vue";
import PageTurning from '../components/util/PageTurning.vue';
import DayBox from '../components/util/DayBox.vue';
export default {
  data() {
    return {
      page: 1,
      pageSize: 8,
      iconCount: 5,
      taskList: [],
      dayBoxFlag: false
    };
  },
  components: {
    MyHeader,
    PageTurning,
    DayBox
  },
  created () {
    this.getPage(this.page - 1, this.pageSize);
  },
  methods: {
    getPage (page, pageSize) {
      axios.get('http://127.0.0.1:12306/getMatterCount', {
        params: {
          username: this.$store.state.username
        }
      }).then((resp) => {
        this.$store.commit('changeCount', resp.data.data);
        this.$refs.pagetol.generatePageTool();
      }).catch(() => {
        window.console.log('请求失败');
      });

      axios.get('http://127.0.0.1:12306/getAllMatter', {
        params: {
          username: this.$store.state.username,
          page: page,
          pageSize: pageSize
        }
      }).then((resp) => {
        let status = resp.data.status;
        let msg = resp.data.msg;
        this.taskList = resp.data.data;
        if(status == 'error'){
          window.console.log(msg);
        }
      }).catch(() => {
        window.console.log('请求失败');
      });
    },
    delBtn (id) {
      axios.post('http://127.0.0.1:12306/delMatterById', {
        id: id
      }).then((resp) => {
        if(resp.data.status == 'success'){
          this.openSuccess(resp.data.msg);
          this.getPage(0, this.pageSize);
        }
      }).catch(() => {
        window.console.log('请求失败');
      });
    },
    openBox () {
      this.dayBoxFlag = true;
    },
    getMsgFlag () {
      this.dayBoxFlag = this.$refs.dayBoxRef.dayBoxFlag;
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
    timeFn (date) {
        var dateBegin = new Date(date.replace(/-/g, "/"));        //将-转化为/，使用new Date
        var dateEnd = new Date();                                 //获取当前时间
        var dateDiff = dateEnd.getTime() - dateBegin.getTime();   //时间差的毫秒数
        var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));  //计算出相差天数
        if (Math.abs(dayDiff) == 0) {
            return '今天';
        } else {
            return Math.abs(dayDiff) + '天';
        }
    }
  }
}
</script>

<style lang="less">
@import '../assets/style/daysMatter.less';
</style>