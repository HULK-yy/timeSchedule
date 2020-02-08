<template>
    <div class="msg-box">
        <div class="el-msg-box">
            <div class="el-msg-box-header">
                <div class="el-msg-box-header-title">添加任务</div>
            </div>
            <div class="el-msg-box-content">
                <div class="el-msg-box-content-container">
                    <div class="msg-date">
                        <div v-for="item in 3" :key="item" 
                             :class="{active: getDay(item - 1) == chooseDate}"
                             @click="choose(getDay(item - 1))"
                        >
                            {{ getDay(item - 1) }}
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
import axios from 'axios';
export default {
    data () {
        return {
            year: null,
            month: null,
            day: null,
            inpMsg: '',
            chooseDate: null,
            errorFlag: false,
            reg: /^[\w\W]{1,10}$/,
            msgBoxFlag: true
        }
    },
    created () {
        this.getInitTime();
    },
    methods: {
        getInitTime () {
            this.year = new Date().getFullYear();
            this.month = new Date().getMonth() + 1;
            this.day = new Date().getDate();
            this.chooseDate = this.year + '-' + ('0' + this.month).slice(-2) + '-' + ('0' + this.day).slice(-2);
        },
        open1 () {
            this.msgBoxFlag = false;
            this.$message({
                message: '取消添加',
            });
        },
        open2 () {
            axios.post('http://127.0.0.1:12306/setTask', {
                username: this.$store.state.username,
                date: this.chooseDate,
                task: this.inpMsg 
            }).then((resp) => {
                if(resp.data.status == 'success'){
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.$listeners.click(0, 6);
                    // window.location.href = '/schedule';
                }else{
                    this.$message.error('添加失败');
                }
            }).catch(() => {
                window.console.log('请求失败');
            })
            this.msgBoxFlag = false;
        },

        choose (date) {
            this.chooseDate = date;
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
            var ms = 24 * 3600 * 1000 * num;
            today.setTime(parseInt(nowTime + ms));
            var oYear = today.getFullYear();
            var oMoth = ('0' + (today.getMonth() + 1)).slice(-2);
            var oDay = ('0' + today.getDate()).slice(-2);
            return oYear + '-' + oMoth + '-' + oDay;
        }
    }
}
</script>

<style lang="less">
@import '../../assets/style/msgBox.less';
</style>