<template>
    <div class="login">
        <div class="title-top">
            <div class="title-line"></div>
            <div class="title">LOGIN</div>
            <div class="title-line"></div>
        </div>
        <input type="text" placeholder="用 户 名" v-model="username">
        <input type="password" placeholder="密 码" v-model="password">
        <div class="btn" @click="login">登陆</div>
        <router-link tag="p" to="/register">快速注册</router-link>
        <router-link tag="p" to="/passport">忘记密码</router-link>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
            username: '',
            password: '',
            usernameReg: /^[a-zA-Z_0-9]{4,16}$/,
            passwordReg: /^[a-zA-Z_0-9]{6,16}$/,
        }
    },
    methods: {
        login () {
            if(!this.usernameReg.test(this.username)){
                this.openError('用户名必须为4-16位的字母数字下划线组成');
                return;
            }
            if(!this.passwordReg.test(this.password)){
                this.openError('密码必须为6-16位的字母数字下划线组成');
                return;
            }
            // 后端发送请求
            axios.post('http://127.0.0.1:12306/login', {
                username: this.username,
                password: this.password
            })
            .then((resp) => {
                let status = resp.data.status;
                let msg = resp.data.msg
                if(status == 'success'){
                    let cookieId = resp.data.data[0]._id;
                    document.cookie = 'cookieId' + '=' + cookieId;
                    this.openSuccess(msg);
                    this.$router.push({name: 'home'});
                    this.getUsername(resp.data.data[0]);
                }else{
                    this.openError(msg);
                }
            }).catch(() => {
                this.openError('请求失败');
            });
        },
        getUsername (res) {
            this.$store.commit('changeUsername', res.username);
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
    @import '../assets/style/login.less';
</style>