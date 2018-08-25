<template>
  <div class="discover-page-bd">
    <div class="discover-page-title">发现音乐</div>
    <ul class="discover-page-tag">
      <li class="tag-name checked">个性推荐</li>
      <li class="tag-name">歌单</li>
      <li class="tag-name">主播电台</li>
      <li class="tag-name">最新音乐</li>
      <li class="tag-name">歌手</li>
    </ul>
    <div class="carousel"
         @mouseover="swiper('in')"
         @mouseout="swiper('out')">
      <swiper :options="swiperOption">
        <swiper-slide><img :src="banner[0].picUrl"></swiper-slide>
        <swiper-slide><img :src="banner[1].picUrl"></swiper-slide>
        <swiper-slide><img :src="banner[2].picUrl"></swiper-slide>
        <swiper-slide><img :src="banner[3].picUrl"></swiper-slide>
        <swiper-slide><img :src="banner[4].picUrl"></swiper-slide>
        <swiper-slide><img :src="banner[5].picUrl"></swiper-slide>
        <swiper-slide><img :src="banner[6].picUrl"></swiper-slide>
        <swiper-slide><img :src="banner[7].picUrl"></swiper-slide>
      </swiper>
      <!--以下看需要添加-->
      <div class="swiper-button-next" v-show="swiperNav"></div>
      <div class="swiper-button-prev" v-show="swiperNav"></div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="discover-menu">
      <div class="menu-item">
        <div class="item-logo icon-FM">&#xe606;</div>
        <div class="item-name">私人FM</div>
      </div>
      <div class="menu-item center" @click="$router.push('/recommend/songs')">
        <div class="item-logo">&#xe60e;</div>
        <div class="item-name">每日歌曲推荐</div>
      </div>
      <div class="menu-item">
        <div class="item-logo">&#xe6c5;</div>
        <div class="item-name">排行榜</div>
      </div>
    </div>
    <div class="discover-recommend">
      <header class="recommend-title">
        <span class="icon-recommend">&#xe78c;</span>
        推荐歌单
        <span class="recommend-more">更多&#xe617;</span>
      </header>
      <ul class="recommend-bd">
        <li class="recommend-item" v-for="(item, index) in personalized">
          <div class="item-pic"><img :src="item.picUrl"></div>
          <div class="item-name">{{item.name}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import Banner from '@/api/music/banner';
  import Personalized from '@/api/music/personalized';
  // import RecommendResource from '@/api/music/recommend_resource';

  export default {
    name: "index",
    data(){
      return{
        swiperOption: {
          loop:true,
          autoplay: {
            delay: 3800, //自动切换的时间间隔，单位ms
            stopOnLastSlide: false, //当切换到最后一个slide时停止自动切换
            disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。
            waitForTransition: true, //等待过渡完毕。自动切换会在slide过渡完毕后才开始计时。
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            progressbarOpposite: true, //使进度条分页器与Swiper的direction参数相反
            bulletElement : 'li', //设定分页器指示器（小点）的HTML标签。
            dynamicBullets: false,  //动态分页器，当你的slide很多时，开启后，分页器小点的数量会部分隐藏。
            dynamicMainBullets: 2, //动态分页器的主指示点的数量
            clickable: true, //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
          },
          navigation: {
            nextEl: '.swiper-button-next', //前进按钮的css选择器或HTML元素。
            prevEl: '.swiper-button-prev', //后退按钮的css选择器或HTML元素。
            hideOnClick: true, //点击slide时显示/隐藏按钮
            disabledClass: 'my-button-disabled', //前进后退按钮不可用时的类名。
            hiddenClass: 'my-button-hidden', //按钮隐藏时的Class
          },
          effect : 'coverflow',
          slidesPerView: 2,
          centeredSlides: true,
          coverflowEffect: {
            rotate: 30,
            stretch: 10,
            depth: 60,
            modifier: 2,
            slideShadows : true
          },
          speed: 700,
        },
        swiperNav: false,
        banner: [],
        personalized: []
      }
    },
    components:{
      swiper: swiper,
      swiperSlide: swiperSlide
    },
    created(){
      Banner().then((res)=>{
        this.banner = res.banners
      });
      Personalized().then((res)=>{
        this.personalized = res.result.slice(0,9);
      });
    },
    mounted(){
      /*if(this.$store.state.userCenter.userInfo.userId != undefined){
        RecommendResource().then(()=>{

        });
      }*/
    },
    methods:{
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
.discover-page-bd{
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
      color: #000;
      line-height: 30px;
      margin-right: 15px;
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
      .recommend-item{
        cursor: pointer;
        margin-bottom: 20px;
        width: 30%;
        list-style: none;
        float: left;
        &:nth-of-type(3n){
          margin-right: 0;
        }
        margin-right: 5%;
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
    }
  }
}
</style>