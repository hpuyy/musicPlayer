<template>
  <header class="frame-head">
    <span class="frame-head-back"
          v-show="$route.fullPath !== '/discover'"
          @click="back">
          &#xe641;
    </span>
    <span class="title">网易云音乐</span>
    <div class="frame-opt">
      <div class="item min" @click="changeSize('min')">&#xe6b7;</div>
      <div class="item max"
           @click="changeSize('max')"
           v-if="!isMaxSize">
          &#xe601;
      </div>
      <div class="item restore"
           @click="changeSize('restore')"
           v-else>
          &#xe7fe;
      </div>
      <div class="item close" @click="changeSize('close')">&#xe602;</div>
    </div>
  </header>
</template>

<script>
  const BrowserWindow = require('electron').remote.BrowserWindow;
  export default {
    name: "frame",
    data(){
      return{
        isMaxSize: false
      }
    },
    methods:{
      changeSize(type){
        switch (type){
          case 'min':BrowserWindow.getFocusedWindow().minimize(); break;
          case 'max':
            BrowserWindow.getFocusedWindow().maximize();
            this.isMaxSize = true;
            break;
          case 'restore':
            BrowserWindow.getFocusedWindow().restore();
            this.isMaxSize = false;
            break;
          case 'close': BrowserWindow.getFocusedWindow().hide(); break;
        }

      },
      back(){
        this.$router.push(this.$store.state.back.fullPath[1] || '/');
        this.$store.dispatch('back/removePath');
      }
    }
  }
</script>

<style lang="scss">
  @import '@/sass/variable.scss';

.frame-head{
  background-color: $theme-color;
  height: 30px;
  width: 100%;
  -webkit-app-region: drag;
  line-height: 30px;
  color: #fff;
  font-size: 12px;
  .frame-head-back{
    font-family: iconfont;
    color: #fff;
    font-size: 18px;
    display: inline-block;
    vertical-align: top;
    -webkit-app-region: no-drag;
    height: 100%;
    text-align: center;
    width: 46px;
    &:hover{
      background-color: rgba(0, 0, 0, .2);
    }
  }
  .title{
    font-size: inherit;
    color: #fff;
    font-weight: lighter;
    padding-left: 10px;
  }
  .frame-opt{
    -webkit-app-region: no-drag;
    display: inline-block;
    float: right;
    height: 30px;
    overflow: hidden;
    z-index: 1000;
    font-family: iconfont;
    .item{
      display: inline-block;
      width: 40px;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
    .item:hover{
      background-color: rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
    .min{
      font-size: 12px;
    }
    .max, .close{
      font-size: 10px;
    }
    .restore{
      font-size: 11px;
    }
  }
}
</style>