<template>
  <div class="discover-page-bd">
    <div class="discover-page-title">发现音乐</div>
    <ul class="discover-page-tag">
      <li :class="['tag-name',{'checked T-FT T-BD' : $route.fullPath == '/discover'}]"
          @click="$router.push('/discover')">
        个性推荐
      </li>
      <li :class="['tag-name',{'checked T-FT T-BD' : $route.fullPath == '/discover/playlist'}]"
          @click="$router.push('/discover/playlist')">
        歌单
      </li>
      <li class="tag-name">主播电台</li>
      <li class="tag-name">最新音乐</li>
      <li class="tag-name"
          :class="['tag-name',{'checked T-FT T-BD' : $route.fullPath == '/discover/artistList'}]"
          @click="$router.push('/discover/artistList')">歌手</li>
    </ul>
    <transition name="slide">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="slide">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
  // import RecommendResource from '@/api/music/recommend_resource';

  export default {
    name: "index",
    data(){
      return{
        type: 0
      }
    },
    created(){
      this.$store.dispatch('back/setFullPath', this.$route.fullPath);
    },
    methods:{
      /*clearCookie(){
        let myDate=new Date();
        myDate.setTime(-1000);
        document.cookie = '__csrf' + "=''; expires="+myDate.toGMTString();
        localStorage.removeItem('userInfo');
      },*/
      swiper(type){
        if(type === 'in'){
          this.swiperNav = true;
        }
        else{
          this.swiperNav = false;
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "@/sass/variable.scss";
  .app-container::-webkit-scrollbar{
    width: 10px;
  }
  .app-container::-webkit-scrollbar-button{
    display: none;
  }
  .app-container::-webkit-scrollbar-track{
    width: 10px;
  }
  .app-container::-webkit-scrollbar-thumb{
    background-color: #d1d1d1;
    border-radius: 10px;
    width: 10px;
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(40px, 0, 0);
    opacity: 0;
  }
  .slide-enter-active{
    transition: all .2s;
  }
.discover-page-bd{
  position: relative;
  padding: 16px 18px;
  .discover-page-title{
    color: #6b6b6b;
    font-size: 14px;
    line-height: 16px;
  }
  .discover-page-tag{
    margin: 6px 0 0 0;
    padding: 0;
    overflow: hidden;
    border-bottom: 1px solid #dbdbdb;
    width: 100%;
    .checked.tag-name{
      color: $theme-color;
      border-bottom: 2px solid $theme-color;
    }
    li{
      float: left;
      list-style: none;
    }
    .tag-name{
      cursor: pointer;
      font-size: 16px;
      line-height: 30px;
      margin-right: 15px;
      &:hover{
        text-shadow: 0 0 5px #656565;
      }
    }
  }
  .carousel{
    width: 100%;
    position: relative;
    margin-top: 22px;
    cursor: pointer;
    img{
      width: 100%;
    }
    .swiper-pagination{
      width: 100% !important;
      bottom: 5px;
      li{
        margin: 0 3px;
        border-radius: 0;
        width: 26px;
        height: 1px;
      }
      .swiper-pagination-bullet{
        background-color: #fff;
        opacity: 1;
      }
      .swiper-pagination-bullet-active{
        background-color: $theme-color !important;
      }
    }
    .swiper-button-prev, .swiper-button-next{
      background-image: none !important;
      color: rgba(255, 255, 255, .6);
      &:focus{
        outline: none;
      }
      &:hover{
        color: #fff;
      }
    }
    .swiper-button-next::before{
      font-family: iconfont;
      content: '\e617';
      font-size: 40px;
      text-align: center;
      color: inherit;
      vertical-align: middle;
    }
    .swiper-button-prev::before{
      font-family: iconfont;
      content: '\e633';
      font-size: 40px;
      text-align: center;
      color: inherit;
      vertical-align: middle;
    }
  }
  .discover-menu{
    margin-top: 22px;
    overflow: hidden;
    width: 100%;
    .center{
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      box-sizing: border-box;
    }
    .menu-item{
      cursor: pointer;
      float: left;
      width: 33.33%;
      box-sizing: border-box;
      text-align: center;
      .item-logo{
        font-family: iconfont;
        color: $theme-color;
        border: 1px solid $theme-color;
        border-radius: 50%;
        width: 52px;
        height: 52px;
        line-height: 52px;
        margin: 0 auto;
        font-size: 28px;
      }
      .item-name{
        font-size: 12px;
        color: #242424;
        margin-top: 8px;
      }
      .icon-FM{
        font-size: 42px;
      }
    }
  }
  user-select: none;
  cursor: default;
  .discover-recommend{
    width: 100%;
    margin-top: 22px;
    line-height: 20px;
    .icon-recommend{
      font-family: iconfont;
      font-size: 20px;
      color: $theme-color;
    }
    .recommend-title{
      height: 28px;
      font-size: 16px;
      border-bottom: 1px solid #ddd;
    }
    .recommend-more{
      font-family: iconfont;
      float: right;
      color: #626262;
      font-size: 12px;
      cursor: pointer;
    }
    .recommend-bd{
      margin-top: 10px;
      padding: 0;
      margin-bottom: 0;
      width: 100%;
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .recommend-item{
        cursor: pointer;
        margin-bottom: 20px;
        list-style: none;
        .item-pic img{
          width: 100%;
          height: 100%;
        }
        .item-name{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          font-size: 15px;
          line-height: 24px;
        }
      }
      @media screen and (max-width: 870px){
        .recommend-item{
          width: 32%;
          margin-right: 2%;
          &:nth-of-type(3n){
            margin-right: 0;
          }
        }
      }
      @media screen and (min-width: 870px) and (max-width: 1100px){
        .recommend-item{
          width: 24%;
          margin-right: 1.33%;
          &:nth-of-type(4n){
            margin-right: 0;
          }
        }
      }
      @media screen and (min-width: 1100px){
        .recommend-item{
          width: 19%;
          margin-right: 1.25%;
          &:nth-of-type(5n){
            margin-right: 0;
          }
        }
      }
    }
  }
  .discover-page-container{
    max-width: 990px;
    margin: 0 auto;
  }
}
</style>
