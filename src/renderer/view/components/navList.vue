<template>
  <div class="nav-list">
    <div class="nav-list-bd">
      <ul>
        <li class="nav-list-open"><div class="icon-open">&#xe667;</div></li>
        <li @click="navGuide('/search')"
            :class="{checked: $route.fullPath == '/search'}">
          <div class="icon-search">&#xe63b;</div>
          搜索
        </li>
        <li :class="{checked: $route.fullPath.match(/^(\/discover)|(\/recommend)|(\/songList)/)}">
          <div class="icon-music">&#xe680;</div>
          发现音乐
        </li>
        <li><div class="icon-mv">&#xe604;</div>MV</li>
        <li><div class="icon-fri">&#xe61a;</div>朋友</li>
      </ul>
      <ul>
        <li class="nav-list-title">我的音乐</li>
        <li><div class="icon-local">&#xe605;</div>本地音乐</li>
        <li><div class="icon-down">&#xe63a;</div>下载管理</li>
        <li><div class="icon-recent">&#xe661;</div>最近播放</li>
        <li><div class="icon-cloud">&#xe654;</div>我的音乐云盘</li>
        <li><div class="icon-fm">&#xe626;</div>我的电台</li>
        <li><div class="icon-collect">&#xe63c;</div>我的收藏</li>
      </ul>
      <ul>
        <li class="nav-list-title">我的歌单</li>
        <li v-for="(item, i) in playList"
            @click="gotoList(item.id)">
          <div class="icon-song-list" v-if="i === 0">&#xe681;</div>
          <div class="icon-song-list" v-else>&#xe760;</div>
          {{item.name}}
        </li>
      </ul>
    </div>
    <footer class="user-msg">
      <img :src="$store.state.userCenter.userInfo.avatarUrl"
           class="user-avator"
           @click="userCenter" alt="请登入">
      <span class="user-name">{{$store.state.userCenter.userInfo.nickname}}</span>
      <span class="icon-setting">&#xe65b;</span>
      <span class="icon-mail">&#xe68b;</span>
    </footer>
  </div>
</template>

<script>
  import UserPlaylist from '@/api/music/user_playlist';

  export default {
    name: "nav-list",
    data(){
      return{
        playList: [],
        type: 2
      }
    },
    created(){
      UserPlaylist(this.$store.state.userCenter.userInfo.userId).then(res => {
        this.playList = res.playlist;
      });
    },
    watch:{
      '$store.state.playlistRe.reload': function () {
        UserPlaylist(this.$store.state.userCenter.userInfo.userId).then(res => {
          this.playList = res.playlist;
        });
      }
    },
    methods:{
      userCenter(){
        if(this.$store.state.userCenter.show)
          this.$store.dispatch('userCenter/Hide');
        else{
          this.$store.dispatch('userCenter/Show');
        }
      },
      gotoList(id){
        this.$router.push(`/songList?id=${id}`);
      },
      navGuide(url){
        this.$router.push(url);
      }
    }
  }
</script>

<style lang="scss">
  @import "@/sass/variable.scss";

.nav-list{
  width: 200px;
  height: calc(100% - 90px);
  box-sizing: border-box;
  border-right: 1px solid #eee;
  box-shadow: 0 0 4px 1px #eee;
  float: left;
  color: #000;
  -webkit-user-select: none;
  cursor: default;
  position: relative;
  .nav-list-bd{
    width: 100%;
    overflow-y: scroll;
    height: calc(100% - 100px);
    margin-top: 40px;
    .icon-song-list{
      font-family: iconfont;
      font-size: 16px;
      vertical-align: middle;
      color: #343434;
      font-weight: bolder;
    }
    &::-webkit-scrollbar{
      width: 6px;
    }
    &::-webkit-scrollbar-button{
      width: 6px;
    }
    &::-webkit-scrollbar-track{
      background-color: rgba(0, 0, 0, 0);
      width: 6px;
    }
    &::-webkit-scrollbar-thumb{
      background-color: #d5d5d5;
      border-radius: 6px;
      width: 6px;
    }
  }
  .checked{
    background-color: rgba(0, 0, 0, .12);
    border-left: 2px solid $theme-color;
  }
  .nav-list-open{
    position: absolute;
    top: 0;
    left: 0;
  }
  .nav-list-open:hover{
    background-color: transparent;
    cursor: default;
  }
  ul{
    padding: 0;
    margin-bottom: 15px;
    margin-top: 0;
  }
  li{
    list-style: none;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    position: relative;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    &:hover{
      background-color: rgba(0, 0, 0, .08);
      text-shadow: 3px 3px 1px #7f7f7f;
    }
    [class^="icon-"], [class*=" icon-"]{
      font-family: iconfont;
      width: 40px;
      display: inline-block;
      text-align: center;
      font-size: 16px;
    }
    .icon-open{
      cursor: default !important;
    }
    .icon-search{
      color: #444444;
      font-weight: bolder;
    }
    .icon-music{
      font-weight: bolder;
      color: #444444;
    }
    .icon-mv{
      font-size: 18px;
      font-weight: bolder;
      color: #444444;
    }
    .icon-fri{
      font-size: 18px;
      font-weight: bolder;
      color: #444444;
    }
    .icon-local{
      font-size: 18px;
      color: #444444;
      font-weight: bolder;
    }
    .icon-down{
      font-weight: bolder;
      font-size: 17px;
      color: #4f4f4f;
    }
    .icon-recent{
      font-size: 17px;
      font-weight: bolder;
      color: #4f4f4f;
    }
    .icon-cloud{
      font-size: 13px;
      font-weight: bolder;
      color: #444444;
    }
    .icon-fm{
      font-size: 19px;
      font-weight: bolder;
      color: #4f4f4f;
    }
    .icon-collect{
      font-size: 17px;
      font-weight: bolder;
      color: #4f4f4f;
    }
  }
  .nav-list-title{
    color: #858585;
    margin-left: 12px;
    font-weight: bolder;
    font-size: 12px;
    cursor: default;
    &:hover{
      background-color: transparent;
      text-shadow: none;
    }
  }
  .user-msg{
    width: 200px;
    box-sizing: border-box;
    height: 60px;
    border-top: 1px solid #eee;
    line-height: 60px;
    vertical-align: middle;
    padding: 0 10px;
    position: absolute;
    bottom: 0px;
    left: 0;
    .user-avator{
      width: 30px;
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
      cursor: pointer;
    }
    .user-name{
      display: inline-block;
      width: 93px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      vertical-align: middle;
      font-size: 12px;
    }
    .icon-mail{
      font-family: iconfont;
      color: #000;
      float: right;
      margin-right: 10px;
    }
    .icon-setting{
      font-family: iconfont;
      float: right;
    }
  }
}
</style>