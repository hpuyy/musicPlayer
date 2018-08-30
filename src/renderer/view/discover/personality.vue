<template>
  <div class="discover-page-container">
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
        <div class="item-logo icon-FM T-FT T-BD">&#xe606;</div>
        <div class="item-name">私人FM</div>
      </div>
      <div class="menu-item center" @click="$router.push('/recommend/songs')">
        <div class="item-logo T-FT T-BD">&#xe60e;</div>
        <div class="item-name">每日歌曲推荐</div>
      </div>
      <div class="menu-item">
        <div class="item-logo T-FT T-BD">&#xe6c5;</div>
        <div class="item-name">排行榜</div>
      </div>
    </div>
    <div class="discover-recommend">
      <header class="recommend-title">
        <span class="icon-recommend T-FT">&#xe78c;</span>
        推荐歌单
        <span class="recommend-more">更多&#xe617;</span>
      </header>
      <ul class="recommend-bd">
        <li class="recommend-item"
            v-for="(item, index) in personalized"
            @click="$router.push(`/songList?id=${item.id}`)">
          <div class="item-pic" ref="itemPic" :style="{height: picWidth}"><img :src="item.picUrl"></div>
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

  export default {
    name: "personality",
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
        personalized: [],
        loading: true,
        timer: '',
        picWidth: ''
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
        this.personalized = res.result.slice(0,15);
      });
    },
    mounted(){
      this.timer = this.$loading();
      window.addEventListener('resize', () => {
        this.picWidth = this.$refs.itemPic[0].offsetWidth + 'px';
      });
    },
    updated(){
      if(this.loading){
        clearTimeout(this.timer);
        this.$loading(true);
        this.loading = false;
      }
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

<style>

</style>