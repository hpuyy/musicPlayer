<template>
  <div id="app">
    <Frame />
    <NavList />
    <div class="app-container">
      <transition name="opacity">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>
      <transition name="opacity">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </transition>
    </div>
    <UserCenter />
    <Player />
  </div>
</template>

<script>
  import Frame from "@/view/components/frame";
  import Player from '@/view/components/player';
  import NavList from '@/view/components/navList';
  import UserCenter from '@/view/components/userCenter';

  export default {
    name: 'cloud-music',
    components:{
      Frame: Frame,
      Player: Player,
      NavList:NavList,
      UserCenter: UserCenter
    }
  }
</script>

<style>
/*  @font-face {
    font-family: 'iconfont';  !* project id 597493 *!
    src: url('//at.alicdn.com/t/font_597493_lxtqalp95h.eot');
    src: url('//at.alicdn.com/t/font_597493_lxtqalp95h.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_597493_lxtqalp95h.woff') format('woff'),
    url('//at.alicdn.com/t/font_597493_lxtqalp95h.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_597493_lxtqalp95h.svg#iconfont') format('svg');
  }*/
  @font-face {
    font-family: 'iconfont';
    src: url('./font/iconfont.eot');
    src: url('./font/iconfont.eot?#iefix') format('embedded-opentype'),
    url('./font/iconfont.woff') format('woff'),
    url('./font/iconfont.ttf') format('truetype'),
    url('./font/iconfont.svg#iconfont') format('svg');
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
    user-select: none;
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
    overflow-x: hidden;
  }
  .slide-left-enter-active, .slide-left-leave-to{
    transition: all .3s;
  }
  .slide-left-enter, .slide-left-leave-to{
    transform: translate3d(100%, 0, 0);
    opacity: .5;
  }
  .opacity-enter-active, .opacity-leave-to{
    transition: all .3s;
  }
  .opacity-enter, .opacity-leave-to{
    transform: scale3d(.5, .5, 1);
    opacity: 0;
  }
</style>
