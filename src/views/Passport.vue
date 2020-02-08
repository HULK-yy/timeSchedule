<template>
    <div class="passport">
        <div class="logo-top">
            <div class="nav">
                <router-link to="/"><img src="../assets/img/logo2.png"></router-link>
                <div class="nav-right">
                    已有账号？
                    <router-link to="/login">登陆</router-link>
                </div>
            </div>
        </div>
        <div class="content">
            <span>重置密码</span>
            <div class="wrapper">
                <input type="text" placeholder="用 户 名" v-model="username" v-if="fri">
                <input type="text" placeholder="邮 箱" v-model="email" v-if="fri">
                <input type="password" placeholder="密 码" v-model="password" v-if="flag">
                <input type="password" placeholder="确 认 密 码" v-model="againPas" v-if="flag">
                <input type="text" placeholder="验 证 码" v-model="code" v-if="flag">
                <div class="btn" v-if="fri" @click="getCode">获取验证码</div>
                <div class="btn" v-if="flag" @click="confirmRes">确认修改</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
            fri: true,
            flag: false,
            username: '',
            email: '',
            password: '',
            againPas: '',
            code: '',
            usernameReg: /^[a-zA-Z_0-9]{4,16}$/,
            emailReg: /^([a-zA-Z0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
        }
    },
    methods: {
        getCode () {
            if(!this.usernameReg.test(this.username)){
                this.openError('用户名必须为4-16位的字母数字下划线组成');
                return;
            }
            if(!this.emailReg.test(this.email)){
                this.openError('邮箱格式不正确');
                return;
            }
            // 后端请求, 先判定有没有此邮箱注册信息
            axios.get('http://127.0.0.1:12306/getCode', {
                params: {
                    username: this.username,
                    email: this.email
                }
            }).then((resp) => {
                if(resp.data.status == 'error'){
                    this.openError(resp.data.msg);
                    return;
                }
                this.openSuccess(resp.data.msg);
                this.fri = false;
                this.flag = true;
            }).catch(() => {
                this.openError('请求错误');
            });
        },
        confirmRes () {
            if(this.password != this.againPas){
                this.openError('两次密码输入不一致');
                return;
            }
            // 后端请求
            axios.post('http://127.0.0.1:12306/updatePas', {
                username: this.username,
                password: this.password,
                code: this.code
            }).then((resp) => {
                let msg = resp.data.msg;
                let status = resp.data.status;
                if(status == 'error'){
                    this.openError(msg);
                }else{
                    this.openSuccess(msg);
                    this.$router.push({name: 'login'});
                }
            }).catch(() => {
                this.openError('请求错误');
            });
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
    }
}
</script>

<style lang="less">
    @import '../assets/style/passport.less';
</style>