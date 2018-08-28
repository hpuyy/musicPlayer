<template>
  <div class="discover-page-container">
    <div class="discover-recommend">
      <header class="play-list-type-bd">
        <div class="choosed">
          当前选择：{{name}}
          <span class="type-btn"
                v-if="!openChoose"
                @click="open">
                展开
          </span>
          <span class="type-btn"
                v-else
                @click="open">
                收起
          </span>
        </div>
        <trsnsition name="height-change">
          <div class="type-content" v-show="openChoose">
            <div class="type-name" @click="chooseType('全部')">全部</div>
            <div class="type-name"
                 v-for="(item, index) in catlist"
                 @click="chooseType(item.name)">
                {{item.name}}
            </div>
          </div>
        </trsnsition>
      </header>
      <ul class="recommend-bd">
        <li class="recommend-item"
            v-for="(item, index) in playlist"
            @click="$router.push(`/songList?id=${item.id}`)">
          <div class="item-pic"><img :src="item.coverImgUrl"></div>
          <div class="item-name">{{item.name}}</div>
        </li>
      </ul>
      <div class="load-more" @click="loadMore">··········点击加载更多··········</div>
    </div>
  </div>
</template>

<script>
  import PlayList from '@/api/music/top_playlist';
  import CatList from '@/api/music/playlist_catlist';

  export default {
    name: "playList",
    data(){
      return{
        playlist: [],
        loading: true,
        timer: '',
        catlist: [],
        openChoose: false,
        name: '全部',
        offset: 0
      }
    },
    created(){
      PlayList().then((res)=>{
        this.playlist = res.playlists;
      });
      CatList().then((res)=>{
        this.catlist = res.sub;
      });
    },
    mounted(){
      this.timer = this.$loading();
    },
    updated(){
      if(this.loading){
        clearTimeout(this.timer);
        this.$loading(true);
        this.loading = false;
      }
    },
    methods:{
      open(){
        this.openChoose = !this.openChoose;
      },
      chooseType(name){
        this.name = name;
        PlayList(name).then((res)=>{
          this.playlist = res.playlists;
        });
        this.offset = 0;
        this.openChoose = false;
      },
      loadMore(){
        PlayList(this.name, this.offset += 20).then((res)=>{
          this.playlist = this.playlist.concat(res.playlists);
          console.log(this.playlist);
        });
      }
    }
  }
</script>

<style lang="scss">
  @import "@/sass/variable.scss";
  .height-change-enter, height-change-leave-to{
    height: 0;
  }
  .height-change-enter-active, .height-change-leave-active{
    transition: all .2s;
  }
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