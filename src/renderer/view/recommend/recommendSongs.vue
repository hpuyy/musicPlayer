<template>
  <div class="recommend-songs">
    <header class="recommend-songs-bg">
      <div class="date">{{date}}</div>
      <div class="content">
        <div class="title">每日歌曲推荐</div>
        <div class="explain">根据你的音乐口味生成，每天6:00更新</div>
      </div>
      <div class="play-all"><span class="icon-play">&#xe624;</span>播放全部</div>
    </header>
    <ul class="recommend-songs-list">
      <li class="song-list-item"
          v-for="(item, index) in songList" @click="play(index)">
        <span class="index">{{index}}</span>
        <span class="collect">&#xe681;</span>
        <span class="name">{{item.name}}</span>
        <span class="type">&#xe60a;</span>
        <span class="album">{{item.album.name}}</span>
        <span class="artist">{{item.artists[0].name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import Daily from '@/api/music/recommend_songs';

  export default {
    name: "recommendSongs",
    data(){
      return{
        date: new Date().getDate(),
        songList: [],
        saveData: false
      }
    },
    created(){
      Daily().then((res)=>{
        this.songList = res.recommend;
      });
    },
    methods:{
      play(index){
        if(!this.saveData){
          this.$store.dispatch('songList/setSongList', this.songList);
          localStorage.setItem('songList', JSON.stringify(this.songList));
        }
        this.$store.dispatch('songList/play', index);
      }
    }
  }
</script>

<style lang="scss">
  @import "@/sass/variable.scss";
  .recommend-songs{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar{
      width: 10px;
    }
    &::-webkit-scrollbar-button{
      display: none;
    }
    &::-webkit-scrollbar-track{
      width: 10px;
    }
    &::-webkit-scrollbar-thumb{
      background-color: #d1d1d1;
      border-radius: 10px;
      width: 10px;
    }
    .recommend-songs-bg{
      height: 228px;
      padding: 35px 28px 0;
      box-sizing: border-box;
      border-bottom: 1px dashed #eee;
      .date{
        display: inline-block;
        width: 90px;
        height: 90px;
        line-height: 90px;
        text-align: center;
        color: $theme-color;
        background-color: #fff;
        border: 1px solid #eee;
        margin-right: 10px;
        font-size: 60px;
      }
      .content{
        display: inline-block;
        height: 90px;
        vertical-align: top;
        padding-top: 18px;
        line-height: 30px;
        box-sizing: border-box;
        .title{
          font-size: 20px;
        }
        .explain{
          font-size: 16px;
          color: #585858;
        }
      }
      .play-all{
        margin: 60px 0 10px;
        font-size: 18px;
        line-height: 30px;
        color: #000;
        cursor: pointer;
        text-indent: 10px;
        padding-bottom: 10px;
        span{
          font-family: iconfont;
          font-size: 16px;
          margin-right: 2px;
          color: $theme-color;
        }
      }
    }
    .recommend-songs-list{
      padding: 0 28px;
      margin: 0;
      list-style: none;
      .song-list-item{
        font-size: 12px;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #eee;
        &>span{
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .index{
          text-align: center;
          width: 20px;
        }
        .collect{
          text-align: center;
          font-family: iconfont;
          width: 20px;
        }
        .name{
          width: 180px;
        }
        .artist{
          float: right;
          width: 100px;
        }
        .album{
          float: right;
          width: 140px;
        }
        .type{
          font-family: iconfont;
          float: right;
          width: 20px;
          text-align: center;
          color: $theme-color;
        }
      }
    }
  }
</style>