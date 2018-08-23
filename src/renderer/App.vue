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
  import Frame from "@/components/frame";
  import Player from '@/components/player';
  import NavList from '@/components/navList';

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
    src: url('//at.alicdn.com/t/font_597493_8yyskb4xkx.eot');
    src: url('//at.alicdn.com/t/font_597493_8yyskb4xkx.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_597493_8yyskb4xkx.woff') format('woff'),
    url('//at.alicdn.com/t/font_597493_8yyskb4xkx.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_597493_8yyskb4xkx.svg#iconfont') format('svg');
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
  }
  #app{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .app-container{
    display: inline-block;
    vertical-align: top;
  }
</style>
