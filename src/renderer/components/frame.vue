<template>
  <header class="frame-head">
    网易云音乐
    <div class="frame-opt">
      <div class="item" @click="changeSize('min')">1</div>
      <div class="item" @click="changeSize('max')">2</div>
      <div class="item" @click="changeSize('close')">3</div>
    </div>
  </header>
</template>

<script>
  const BrowserWindow = require('electron').remote.BrowserWindow;
  export default {
    name: "frame",
    methods:{
      changeSize(type){
        switch (type){
          case 'min':BrowserWindow.getFocusedWindow().minimize(); break;
          case 'max':BrowserWindow.getFocusedWindow().maximize(); break;
          case 'close':BrowserWindow.getFocusedWindow().hide(); break;
        }

      }
    }
  }
</script>

<style lang="scss">
  @import '@/sass/variable.scss';

.frame-head{
  background-color: $theme-color;
  height: 28px;
  width: 100%;
  -webkit-app-region: drag;
  line-height: 28px;
  color: #fff;
  font-size: 14px;
  .frame-opt{
    -webkit-app-region: no-drag;
    display: inline-block;
    float: right;
    height: 28px;
    overflow: hidden;
    z-index: 1000;
    .item{
      display: inline-block;
      width: 40px;
      height: 28px;
      line-height: 28px;
      text-align: center;
    }
    .item:hover{
      background-color: #ff7d6e;
      cursor: pointer;
    }
  }
}
</style>