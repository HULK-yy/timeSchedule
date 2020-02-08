<template>
    <div class="timer-up">
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
            <el-button type="info" :disabled="reset" class="resets" @click="resetBtn">重置</el-button>
            <el-button type="success" v-if="start" @click="startBtn">开始</el-button>
            <el-button type="danger" v-if="stop" @click="stopBtn">暂停</el-button>
            <el-button type="success" v-if="again" @click="againBtn">继续</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            reset: true,
            start: true,
            stop: false,
            again: false,
            timer: "",
            content: "",
            hour: '00',
            minutes: '00',
            seconds: '00'
        }
    },
    created () {
        
    },
    destroyed () {
        clearInterval(this.timer);
    },
    methods: {
        startBtn () {
            this.start = false;
            this.stop = true;
            this.timer = setInterval(this.startTimer, 1000);
        },
        stopBtn () {
            clearInterval(this.timer);
            this.stop = false;
            this.again = true;
            this.reset = false;
        },
        againBtn () {
            this.timer = setInterval(this.startTimer, 1000);
            this.again = false;
            this.reset = true;
            this.stop = true;
        },
        resetBtn () {
            if(!this.reset){
                clearInterval(this.timer);
                this.hour = '00';
                this.minutes = '00';
                this.seconds = '00';
                this.again = false;
                this.start = true;
                this.reset = true;
            }
        },
        startTimer () {
            this.seconds = ('0' + (parseInt(this.seconds) + 1)).slice(-2);
            if(parseInt(this.seconds) >= 60){
                this.minutes = ('0' + (parseInt(this.minutes) + 1)).slice(-2);
                this.seconds = '00';
            }
            if(parseInt(this.minutes) >= 60){
                this.minutes = '00';
                this.hour = ('0' + (parseInt(this.hour) + 1)).slice(-2);
            }
        }
    }
}
</script>

<style lang="less">
.timer-up{
    width: 100%;
    height: 100%;
    color: #fff;
    .time-box{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 60%;
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
    .btn-box{
        width: 100%;
        text-align: center;
        button{
            padding: 12px 30px;
        }
        button.resets{
            margin-right: 20px;
        }
    }
}
</style>