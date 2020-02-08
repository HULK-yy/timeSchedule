<template>
    <div class="register">
        <div class="title-top">
            <div class="title-line"></div>
            <div class="title">REGISTER</div>
            <div class="title-line"></div>
        </div>
        <input type="text" placeholder="用 户 名" v-model="username">
        <input type="text" placeholder="邮 箱" v-model="email">
        <input type="password" placeholder="密 码" v-model="password">
        <input type="password" placeholder="确 认 密 码" v-model="repeatPas">
        <div class="btn" @click="register">注册</div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
            username: '',
            email: '',
            password: '',
            repeatPas: '',
            usernameReg: /^[a-zA-Z_0-9]{4,16}$/,
            emailReg: /^([a-zA-Z0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            passwordReg: /^[a-zA-Z_0-9]{6,16}$/,
        }
    },
    methods: {
        register () {
            if(!this.usernameReg.test(this.username)){
                this.openError('用户名必须为4-16位的字母数字下划线组成');
                return;
            }
            if(!this.emailReg.test(this.email)){
                this.openError('邮箱格式不正确');
                return;
            }
            if(!this.passwordReg.test(this.password)){
                this.openError('密码必须为6-16位的字母数字下划线组成');
                return;
            }
            if(this.password != this.repeatPas){
                this.openError('两次密码输入不一致');
                return;
            }
            // 后端请求
            axios.post('http://127.0.0.1:12306/register', {
                username: this.username,
                password: this.password,
                email: this.email
            }).then((resp) => {
                let status = resp.data.status;
                let msg = resp.data.msg
                if(status == 'success'){
                    this.openSuccess(msg);
                    this.$router.push({name: 'login'});
                }else{
                    this.openError(msg);
                }
            }).catch(() => {
                this.openError('请求失败');
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
    @import '../assets/style/register.less';
</style>