<template>
  <div class="home">
    <my-header/>
    <slider/>
    <contact/>
    <footer>Copyright 2019</footer>
  </div>
</template>

<script>
import MyHeader from '../components/home/Header.vue';
import Slider from '../components/home/Slider.vue';
import Contact from '../components/home/Contact.vue';

export default {
  components: {
    MyHeader,
    Slider,
    Contact
  }
}
</script>

<style lang="less">
  footer{
    width: 100%;
    height: 50px;
    background-color: #1e212a;
    text-align: center;
    line-height: 50px;
    color: #fff;
  }
</style>