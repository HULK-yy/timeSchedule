<template>
  <div class="timer">
      <my-header/>
      <div class="content">
        <div class="title"><span @click="handleHome">计时器</span></div>
        <div class="timer-list" v-if="flag">
          <div class="timer-left" @click="hangdleTimer(1)">
            <div class="triangle"></div>
            计时
          </div>
          <div class="timer-right" @click="hangdleTimer(0)">
            <div class="triangle"></div>
            倒计时
          </div>
        </div>
        <div class="count-box count-up" v-if="countUp">
          <timer-up/>
        </div>
        <div class="count-box count-down" v-if="countDown">
          <timer-down/>
        </div>
      </div>
  </div>
</template>

<script>
import MyHeader from '../components/home/Header.vue';
import TimerUp from '../components/timer/TimerUp.vue';
import TimerDown from '../components/timer/TimerDown.vue';
export default {
  data () {
    return {
      flag: true,
      countUp: false,
      countDown: false
    }
  },
  components: {
    MyHeader,
    TimerUp,
    TimerDown
  },
  methods: {
    hangdleTimer (res) {
      this.flag = false;
      if(res){
        this.countUp = true;
        this.countDown = false;
      }else{
        this.countDown = true;
        this.countUp = false;
      }
    },
    handleHome () {
      this.flag = true;
      this.countUp = false;
      this.countDown = false;
    }
  }
}
</script>

<style lang="less">
@import '../assets/style/timer.less';
</style>