<template>
  <div class="contact">
    <h1>任何疑问, 请联系我</h1>
    <p class="cor">Counseling courses</p>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
              <div class="card">
                  <img src="../../assets/img/qq.png">
                  <p><img src="../../assets/img/qqCode.png"></p>
              </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
              <div class="card">
                  <img src="../../assets/img/phone.png">
                  <p class="phone">177-7115-1320</p>
              </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
              <div class="card">
                  <img src="../../assets/img/wechat.png">
                  <p><img src="../../assets/img/wxCode.png"></p>
              </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less">
@import "../../assets/style/contact.less";
</style>