<template>
  <div id="app">
    <Frame></Frame>
    <NavList></NavList>
    <div class="app-container">
      <router-view></router-view>
    </div>
    <Player></Player>
  </div>
</template>

<script>
  import Frame from "@/view/components/frame";
  import Player from '@/view/components/player';
  import NavList from '@/view/components/navList';

  export default {
    name: 'cloud-music',
    components:{
      Frame: Frame,
      Player: Player,
      NavList:NavList
    }
  }
</script>

<style>
  @font-face {
    font-family: 'iconfont';  /* project id 597493 */
    src: url('//at.alicdn.com/t/font_597493_bkg3bkypw2d.eot');
    src: url('//at.alicdn.com/t/font_597493_bkg3bkypw2d.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_597493_bkg3bkypw2d.woff') format('woff'),
    url('//at.alicdn.com/t/font_597493_bkg3bkypw2d.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_597493_bkg3bkypw2d.svg#iconfont') format('svg');
  }
  body::-webkit-scrollbar{
    width: 15px;
  }
  body::-webkit-scrollbar-button{
    display: none;
  }
  body::-webkit-scrollbar-track{
    background-color: #8bb0ff;
    width: 15px;
  }
  body::-webkit-scrollbar-thumb{
    width: 15px;
  }
  body{
    overflow: hidden;
    font-family: 宋体 微软雅黑;
  }
  #app{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .app-container{
    overflow-y: auto;
    vertical-align: top;
    height: calc(100% - 90px);
  }
</style>
