<template>
  <div class="discover-page-container" ref="container">
    <div class="discover-recommend">
      <header class="play-list-type-bd">
        <div class="choosed">
          选择歌手：
          <span class="type-btn T-FT"
                v-if="!openChoose"
                @click="open">
                展开
          </span>
          <span class="type-btn T-FT"
                v-else
                @click="open">
                收起
          </span>
        </div>
        <div class="type-content" v-show="openChoose">
          <div class="type-name T-TSD-H T-FT-H" :class="{ 'T-FT T-TSD': cat == 1001}" @click="chooseType(1001)">华语男歌手</div>
          <div class="type-name T-TSD-H T-FT-H" :class="{ 'T-FT T-TSD': cat == 1002}" @click="chooseType(1002)">华语女歌手</div>
          <div class="type-name T-TSD-H T-FT-H" :class="{ 'T-FT T-TSD': cat == 1003}" @click="chooseType(1003)">华语组合</div>
          <div class="type-name T-TSD-H T-FT-H" :class="{ 'T-FT T-TSD': cat == 2001}" @click="chooseType(2001)">欧美男歌手</div>
          <div class="type-name T-TSD-H T-FT-H" :class="{ 'T-FT T-TSD': cat == 2002}" @click="chooseType(2002)">欧美女歌手</div>
          <div class="type-name T-TSD-H T-FT-H" :class="{ 'T-FT T-TSD': cat == 2003}" @click="chooseType(2003)">欧美组合</div>
          <div class="type-name T-TSD-H T-FT-H" :class="{ 'T-FT T-TSD': cat == 6001}" @click="chooseType(6001)">日本男歌手</div>
          <div class="type-name T-TSD-H T-FT-H" :class="{ 'T-FT T-TSD': cat == 6002}" @click="chooseType(6002)">日本女歌手</div>
          <div class="type-name T-TSD-H T-FT-H" :class="{ 'T-FT T-TSD': cat == 6003}" @click="chooseType(6003)">日本组合</div>
          <div class="type-name T-TSD-H T-FT-H" :class="{ 'T-FT T-TSD': cat == 7001}" @click="chooseType(7001)">韩国男歌手</div>
          <div class="type-name T-TSD-H T-FT-H" :class="{ 'T-FT T-TSD': cat == 7002}" @click="chooseType(7002)">韩国女歌手</div>
          <div class="type-name T-TSD-H T-FT-H" :class="{ 'T-FT T-TSD': cat == 7003}" @click="chooseType(7003)">韩国组合</div>
          <div class="type-name T-TSD-H T-FT-H" :class="{ 'T-FT T-TSD': cat == 4001}" @click="chooseType(4001)">其他男歌手</div>
          <div class="type-name T-TSD-H T-FT-H" :class="{ 'T-FT T-TSD': cat == 4002}" @click="chooseType(4002)">其他女歌手</div>
          <div class="type-name T-TSD-H T-FT-H" :class="{ 'T-FT T-TSD': cat == 4003}" @click="chooseType(4003)">其他组合</div>
        </div>
        <div class="type-content" v-show="openChoose">
          <span class="type-name T-TSD-H T-FT-H"
                :class="{ 'T-FT T-TSD': initial == ''}"
                @click="chooseType(cat, '')">全部
          </span>
          <span class="type-name T-TSD-H T-FT-H"
                v-for="(item, index) in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"
                :class="{ 'T-FT T-TSD': initial == item}"
                @click="chooseType(cat, item)">{{item}}
          </span>
        </div>
      </header>
      <ul class="recommend-bd">
        <li class="recommend-item"
            v-for="(item, index) in playerlist"
            @click="$router.push(`/artist/songList?id=${item.id}&type=artist`)">
          <div class="item-pic" ref="itemPic"><img :src="baseUrl + item.picUrl"></div>
          <div class="item-name">{{item.name}}</div>
        </li>
      </ul>
      <div class="load-more T-TSD-H" @click="loadMore">··········点击加载更多··········</div>
    </div>
  </div>
</template>

<script>
  import ArtistList from '@/api/music/artist_list';

  export default {
    name: "artistList",
    data(){
      return{
        playerlist: [],
        loading: true,
        timer: '',
        openChoose: false,
        cat: 1001,
        initial: '',
        offset: 0,
        baseUrl: 'http://localhost:9083/res/res?url='
      }
    },
    created(){
      ArtistList(this.cat, this.initial).then((res)=>{
        this.playerlist = res.artists;
      });
    },
    mounted(){
      this.$loading();
    },
    updated(){
      if(this.loading){
        this.$loading(true);
        this.loading = false;
      }
    },
    methods:{
      open(){
        this.openChoose = !this.openChoose;
      },
      chooseType(cat, initial = ''){
        this.cat = cat;
        this.initial = initial;
        ArtistList(this.cat, this.initial).then((res)=>{
          this.playerlist = res.artists;
        });
        this.offset = 0;
        this.openChoose = false;
      },
      loadMore(){
        ArtistList(this.cat, this.initial, this.offset += 20).then((res)=>{
          this.playerlist = this.playerlist.concat(res.artists);
        });
      }
    }
  }
</script>

<style lang="scss">
  @import "@/sass/variable.scss";
  .load-more{
    text-align: center;
    padding: 10px 0;
    cursor: pointer;
    color: #818181;
    &:hover{
      text-shadow: 0 0 5px $theme-color;
      color: #fff;
    }
  }
  .play-list-type-bd{
    width: 100%;
    font-size: 14px;
    .choosed{
      line-height: 12px;
      font-size: 12px;
      margin-bottom: 10px;
      .type-btn{
        float: right;
        color: $theme-color;
        cursor: pointer;
        &:hover{
          font-size: 14px;
        }
      }
    }
    .type-content{
      overflow: hidden;
      .type-name{
        float: left;
        line-height: 14px;
        margin: 5px 7px 5px 5px;
        font-size: 12px;
        color: #8c8c8c;
        cursor: pointer;
        border-radius: 5px;
        &:hover{
          text-shadow: 0 0 3px $theme-color;
          color: $theme-color;
        }
      }
    }
  }
</style>
