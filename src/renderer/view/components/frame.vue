<template>
  <header class="frame-head T-BG">
    <span class="frame-head-back"
          v-show="$store.state.back.fullPath.length > 1"
          @click="back">
          &#xe641;
    </span>
    <span class="title">云音乐</span>
    <div class="frame-opt">
      <span class="theme">&#xe664;</span>
      <colorPicker v-model="color" id="picker" class="picker" @change="setTheme"></colorPicker>
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
      <div class="item close"
           @click="changeSize('close')">&#xe602;</div>
    </div>
  </header>
</template>

<script>
  const BrowserWindow = require('electron').remote.BrowserWindow;
  export default {
    name: "frame",
    data(){
      return{
        isMaxSize: false,
        color: ''
      }
    },
    created(){
      this.color = JSON.parse(localStorage.getItem('Theme')).color;
    },
    mounted(){
      this.setTheme();
      let el = document.getElementsByClassName('item');
      Array.prototype.map.call(el, (item) => {
        item.onmouseover = () => {
          item.classList.add('opt-hover');
        };
        item.onmouseleave = () => {
          item.classList.remove('opt-hover');
        };
        item.onclick = () => {
          item.classList.remove('opt-hover');
        };
      })
    },
    methods:{
      setTheme(){
        let link = document.createElement("style");
        let head = document.getElementsByTagName("head")[0];

        //设置主题色时现将原先的样式文件移除，虽然样式之间可以覆盖，但为了避免添加过多，还是清一下。
        document.getElementById('theme') && head.removeChild(document.getElementById('theme'));
        link.rel = "stylesheet";
        link.type = "text/css";
        link.id = "theme";
        head.appendChild(link);

        let themeData = {
          color: this.color,
        };

        let len = document.styleSheets.length - 1;
        localStorage.setItem('Theme', JSON.stringify(themeData));
        document.styleSheets[len].addRule('.T-BG', `background-color: ${this.color} !important`);
        document.styleSheets[len].addRule('.T-FT', `color: ${this.color} !important`);
        document.styleSheets[len].addRule('.T-FT-H:hover', `color: ${this.color} !important`);
        document.styleSheets[len].addRule('.T-BD', `border-color: ${this.color} !important`);
        document.styleSheets[len].addRule('.T-SD', `box-shadow: 0 0 5px 1px ${this.color} !important`);
        document.styleSheets[len].addRule('.T-SD-H:hover', `box-shadow: 0 0 5px 1px ${this.color} !important`);
        document.styleSheets[len].addRule('.T-TSD-H:hover', `text-shadow: 0 0 5px ${this.color} !important`);
        document.styleSheets[len].addRule('.T-TSD', `text-shadow: 0 0 5px ${this.color} !important`);
        document.styleSheets[len].addRule('.swiper-pagination-bullet-active', `border-color: ${this.color} !important`);
        document.styleSheets[len].addRule(':root', `--ThemeColor: ${this.color} !important`);
      },
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
          case 'close': {
            BrowserWindow.getFocusedWindow().hide();
          } break;
        }
      },
      back(){
        if(this.$store.state.back.fullPath[0] == 'playPage'){

        }
        else{
          this.$router.push(this.$store.state.back.fullPath[1] || '/');
          this.$store.dispatch('back/removePath');
        }

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
    cursor: pointer;
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
    .colorBtn{
      background-color: transparent !important;
      cursor: pointer;
    }
    .theme{
      position: relative;
      left: 20px;
      font-size: 18px;
      cursor: pointer;
      vertical-align: middle;
    }
    .picker{
      display: inline-block;
      vertical-align: middle;
    }
    -webkit-app-region: no-drag;
    display: inline-block;
    float: right;
    height: 30px;
    z-index: 1000;
    font-family: iconfont;
    .item{
      display: inline-block;
      width: 40px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
    }
    .opt-hover{
      background-color: rgba(0, 0, 0, 0.2);
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
