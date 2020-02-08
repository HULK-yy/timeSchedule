<template>
  <div class="slider">
      <div><img src="../../assets/img/img1.png"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: [
        "/img/img1.png",
        "/img/logo.png",
        "/img/logo2.png"
      ]
    };
  }
};
</script>

<style lang="less">
@import "../../assets/style/slider.less";
</style>