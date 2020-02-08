<template>
    <div class="timer-down">
        <div class="time-box">
            <div class="com hour">
                <div>{{ hour }}</div>
                <span>时</span>
            </div>
            <span>:</span>
            <div class="com minute">
                <div>{{ minutes }}</div>
                <span>分</span>
            </div>
            <span>:</span>
            <div class="com second">
                <div>{{ seconds }}</div>
                <span>秒</span>
            </div>
        </div>
        <div class="btn-box">
            <el-input
                placeholder="请输入时长(分钟数)"
                v-model="inputMinute"
                clearable
                :disabled="inpDis"
                class="inp"
            >
            </el-input>
            <el-button type="success" v-if="start" @click="startBtn">开始</el-button>
            <el-button type="danger" v-if="stop" @click="stopBtn">提前结束</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            start: true,
            stop: false,
            timer: "",
            content: "",
            hour: '00',
            minutes: '00',
            seconds: '00',
            inpDis: false,
            inputMinute: ''
        }
    },
    created () {
        
    },
    destroyed () {
        clearInterval(this.timer);
    },
    methods: {
        startBtn () {
            var reg = /^[0-9]{1,3}$/;
            if(!reg.test(this.inputMinute)){
                this.inputMinute = '';
                alert('请输入数字');
                return;
            }
            this.start = false;
            this.inpDis = true;
            this.stop = true;
            let temp = parseInt(this.inputMinute);
            if(temp >= 60){
                this.hour = ('0' + parseInt(temp / 60)).slice(-2);
                this.minutes = ('0' + parseInt(temp % 60)).slice(-2);
            }else{
                this.minutes = ('0' + temp).slice(-2);
            }
            this.timer = setInterval(this.startTimer, 20);
        },
        stopBtn () {
            clearInterval(this.timer);
            this.stop = false;
            this.start = true;
            this.inpDis = false;
            this.hour = '00';
            this.minutes = '00';
            this.seconds = '00';
            this.inputMinute = '';
        },
        startTimer () {
            if(parseInt(this.hour) <=0 && parseInt(this.minutes) <= 0 && parseInt(this.seconds) <= 0){
                clearInterval(this.timer);
                alert('倒计时完成');
                return;
            }
            if(parseInt(this.seconds) <= 0){
                if(parseInt(this.minutes) <= 0){
                    this.minutes = '60';
                    this.hour = ('0' + (parseInt(this.hour) - 1)).slice(-2);
                }
                this.minutes = ('0' + (parseInt(this.minutes) - 1)).slice(-2);
                this.seconds = '60';
            }
            this.seconds = ('0' + (parseInt(this.seconds) - 1)).slice(-2);
        }
    }
}
</script>

<style lang="less">
.timer-down{
    width: 100%;
    height: 100%;
    color: #fff;
    .time-box{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 50%;
        span{
            font-size: 20px;
        }
        div.com{
            display: inline-block;
            text-align: center;
            width: 100px;
            div{
                font-size: 42px;
            }
            span{
                font-size: 14px;
            }
        }
    }
    .inp-box{
        width: 100%;
        text-align: center;
        margin-bottom: 26px;
        .inp{
            width: 210px;
        }
    }
    .btn-box{
        width: 100%;
        text-align: center;
        button{
            padding: 12px 30px;
        }
        button.resets{
            margin-right: 20px;
        }
        .inp{
            width: 170px;
            margin-right: 10px;
        }
    }
}
</style>