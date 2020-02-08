<template>
  <div class="schedule-left">
    <div class="contnet">
      <ul>
        <li class="list calendarBox" @mouseenter="showCom('calendarFlag')">
          <i class="el-icon-date" v-if="ciconFlag"></i>
          <span v-else>{{ day }}</span>
          <div class="box" @click="handleCal" v-show="calendarFlag">
            <calendar ref="calendarRef"/>
          </div>
        </li>
        <li class="list screen" @mouseenter="showCom('screenFlag')">
          <i class="el-icon-pie-chart"></i>
          <dl @click="handleScr" v-show="screenFlag">
            <dt>筛选任务</dt>
            <dd @click="screen('all')">全部</dd>
            <dd @click="screen('noFin')">未完成</dd>
            <dd @click="screen('fin')">已完成</dd>
          </dl>
        </li>
        <li class="list" @click="openBox">
          <i class="el-icon-circle-plus"></i>
        </li>
      </ul>
    </div>
    <div class="msgbox-box" @click="getMsgFlag" v-if="msgBoxFlag">
      <msg-box ref="msgBoxRef" @click="handleClick"/>
    </div>
  </div>
</template>

<script>
import Calendar from "../util/Calendar.vue";
import MsgBox from "../util/MsgBox.vue";

export default {
  data() {
    return {
      year: null,
      month: null,
      day: null,
      curDate: null,
      msgBoxFlag: false,
      calendarFlag: false,
      ciconFlag: true,
      screenFlag: false,
    };
  },
  components: {
    Calendar,
    MsgBox
  },
  mounted () {
    this.getTime();
    this.getCurTime();
  },
  methods: {
    handleClick (page, pageSize) {
      this.$listeners.click('page', page, pageSize);
    },

    getMsgFlag () {
      this.msgBoxFlag = this.$refs.msgBoxRef.msgBoxFlag;
    },

    handleCal () {
      this.getTime();
      this.$emit('click', 'cal', this.year, this.month, this.day);
      this.calendarFlag = false;
      if(`${this.year}-${this.month}-${this.day}` == this.curDate){
        this.ciconFlag = true;
      }else{
        this.ciconFlag = false;
      }
    },

    handleScr () {
      this.screenFlag = false;
    },

    getCurTime () {
      this.curDate = this.$refs.calendarRef.curDate;
    },

    getTime () {
      this.year = this.$refs.calendarRef.year;
      this.month = this.$refs.calendarRef.month;
      this.day = this.$refs.calendarRef.day;
    },

    showCom (msg) {
      this[msg] = true;
    },

    screen (term) {
      this.$emit('click', 'scr', term);
    },

    openBox () {
      this.msgBoxFlag = true;
    }
  }
};
</script>

<style lang="less">
@import "../../assets/style/scheduleLeft.less";
</style>