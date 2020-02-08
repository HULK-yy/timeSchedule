<template>
    <div class="day-box">
        <div class="el-msg-box">
            <div class="el-msg-box-header">
                <div class="el-msg-box-header-title">新增事件</div>
            </div>
            <div class="el-msg-box-content">
                <div class="el-msg-box-content-container">
                    <div class="msg-date">
                        <div class="ctype" :class="{active: chooseType == '起始日'}" @click="choose('起始日')">起始日</div>
                        <div class="ctype" :class="{active: chooseType == '目标日'}" @click="choose('目标日')">目标日</div>
                        <div class="chooseDate" @mouseenter="showCalendar">
                            <span v-if="ciconFlag">选择日期</span>
                            <span style="backgroundColor: #409eff;color: #fff;" v-else>{{ year }}-{{ ('0' +  month).slice(-2) }}-{{ ('0' + day).slice(-2) }}</span>
                            <div class="cal-box" @click="handleCal" v-show="calendarFlag">
                                <calendar ref="calendarRef"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="el-msg-box-content-inp">
                    <div class="msg-input">
                        <input class="msg-inp" type="text" @input="handleInput" :value="inpMsg">
                    </div>
                    <div class="el-input-errormsg" v-if="errorFlag">最大输入10个字符</div>
                </div>
            </div>
            <div class="el-msg-box-btns">
                <el-button :plain="true" @click="open1">取消</el-button>
                <el-button type="primary" :plain="true" @click="open2">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import Calendar from './Calendar.vue';
import axios from 'axios';
export default {
    data () {
        return {
            year: null,
            month: null,
            day: null,
            inpMsg: '',
            chooseType: null,
            chooseDate: null,
            errorFlag: false,
            reg: /^[\w\W]{1,10}$/,
            dayBoxFlag: true,
            calendarFlag: false,
            ciconFlag: true
        }
    },
    components: {
        Calendar
    },
    methods: {
        getTime () {
            this.year = this.$refs.calendarRef.year;
            this.month = this.$refs.calendarRef.month;
            this.day = this.$refs.calendarRef.day;
            this.chooseDate = `${this.year}-${('0' + this.month).slice(-2)}-${('0' + this.day).slice(-2)}`;
        },
        open1 () {
            this.dayBoxFlag = false;
            this.$message({
                message: '取消添加',
            });
        },
        open2 () {
            this.dayBoxFlag = false;
            axios.post('http://127.0.0.1:12306/setMattter', {
                username: this.$store.state.username,
                type: this.chooseType,
                time: this.chooseDate,
                content: this.inpMsg
            }).then((resp) => {
                if(resp.data.status == 'success'){
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.$listeners.click(0, 8);
                }else{
                    this.$message.error('添加失败');
                }
            }).catch(() => {
                window.console.log('请求失败');
            });
        },

        choose (date) {
            this.chooseType = date;
        },

        showCalendar () {
            this.calendarFlag = true;
        },

        handleInput (e) {
            this.inpMsg = e.target.value;
            let flag = this.reg.test(this.inpMsg);
            if(!flag){
                this.errorFlag = true;
                this.inpMsg = this.inpMsg.slice(0, 10);
            }else{
                this.errorFlag = false;
            }
        },

        getDay(num) {
            var today = new Date();
            var nowTime = today.getTime();
            var ms = 24*3600*1000*num;
            today.setTime(parseInt(nowTime + ms));
            var oYear = today.getFullYear();
            var oMoth = ('0' + (today.getMonth() + 1)).slice(-2);
            var oDay = ('0' + today.getDate()).slice(-2);
            return oYear + '-' + oMoth + '-' + oDay;
        },

        handleCal () {
            this.getTime();
            this.calendarFlag = false;
            if(this.year){
                this.ciconFlag = false;
            }else{
                this.ciconFlag = true;
            }
        }
    }
}
</script>

<style lang="less">
@import '../../assets/style/dayBox.less';
</style>