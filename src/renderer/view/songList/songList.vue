<template>
  <div class="song-list-module">
    <header class="recommend-songs-bg">
      <div class="label">歌单</div>
      <div class="date">
        <img :src="playlist.coverImgUrl">
      </div>
      <div class="content">
        <div class="title">{{playlist.name}}</div>
        <div class="creator">
          <img :src="playlist.creator.avatarUrl" class="avator">
          <span>{{playlist.creator.nickname}}</span>
          <span>{{new Date(playlist.createTime).toLocaleDateString()}} 创建</span>
        </div>
        <div class="operate">
          <div>收藏({{playlist.subscribedCount}})</div>
          <div>评论({{playlist.commentCount}})</div>
          <div>分享({{playlist.shareCount}})</div>
        </div>
        <div class="tag">标签：{{playlist.tags.map(t => { return t}).join('、')}}</div>
        <div class="explain">介绍：{{playlist.description}}</div>
      </div>
      <div class="play-all"><span class="icon-play">&#xe624;</span>播放全部</div>
    </header>
    <ul class="recommend-songs-list">
      <li class="song-list-item"
          v-for="(item, index) in playlist.tracks" @click="play(index)">
        <span class="playing" v-if="$store.state.songList.id == item.id">&#xe651;</span>
        <span class="index" v-else>{{index + 1}}</span>
        <span class="collect">&#xe681;</span>
        <span class="name">{{item.name}}</span>
        <span class="type">&#xe60a;</span>
        <span class="album">{{item.al.name}}</span>
        <span class="artist">{{item.ar.map(art=>{return art.name}).join('、')}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import playList from '@/api/music/playlist_detail';

  export default {
    name: "songList",
    data(){
      return{
        playlist:{},
        saveData: false
      }
    },
    created(){
      this.$store.dispatch('back/show', true);
      playList(this.$route.query.id).then(res => {
        this.playlist = res.playlist;
      });
    },
    methods:{
      play(index){
        if(!this.saveData){
          let songList = this.playlist.tracks.map((data, index) => {
            return Object.assign({}, {artists: data.ar}, data)
          });

          this.$store.dispatch('songList/setSongList', songList);
          localStorage.setItem('songList', JSON.stringify(songList));
        }
        this.$store.dispatch('songList/stop');
        this.$store.dispatch('songList/play', index);
      }
    }
  }
</script>

<style lang="scss">
  @import "@/sass/variable.scss";
  .song-list-module{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar{
      width: 8px;
    }
    &::-webkit-scrollbar-button{
      display: none;
    }
    &::-webkit-scrollbar-track{
      width: 8px;
    }
    &::-webkit-scrollbar-thumb{
      background-color: #d1d1d1;
      border-radius: 10px;
      width: 8px;
    }
    .recommend-songs-bg{
      height: 300px;
      padding: 0 28px 0;
      box-sizing: border-box;
      border-bottom: 1px dashed #eee;
      .label{
        font-size: 12px;
        color: #6b6b6b;
        line-height: 50px;
      }
      .date{
        display: inline-block;
        min-width: 100px;
        min-height: 100px;
        max-width: 180px;
        width: 28%;
        text-align: center;
        margin-right: 15px;
        font-size: 60px;
        &>img{
          width: 100%;
          height: 100%;
        }
      }
      .content{
        display: inline-block;
        height: 90px;
        vertical-align: top;
        box-sizing: border-box;
        .title{
          font-size: 20px;
          color: #000;
          line-height: 26px;
        }
        .creator{
          height: 30px;
          line-height: 30px;
          margin-top: 6px;
          .avator{
            width: 30px;
            height: 30px;
            vertical-align: middle;
            border-radius: 50%;
            overflow: hidden;
          }
          span{
            font-size: 12px;
            margin-left: 10px;
            vertical-align: middle;
          }
        }
        .operate{
          margin-top: 10px;
          div{
            display: inline-block;
            line-height: 23px;
            font-size: 12px;
            cursor: pointer;
            margin-right: 10px;
            border: 1px solid #cbcbcb;
            height: 23px;
            box-shadow: 0 0 5px 1px #e1e1e1;
            padding: 0 5px;
          }
        }
        .tag{
          font-size: 12px;
          height: 30px;
          line-height: 30px;
        }
        .explain{
          font-size: 12px;
          height: 16px;
          line-height: 16px;
          max-width: 340px;
          width: 70%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .play-all{
        margin: 25px 0 10px;
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
      padding: 0 28px 50px;
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
        .playing{
          font-family: iconfont;
          font-size: 18px;
          color: $theme-color;
          text-align: center;
          font-weight: bolder;
          width: 20px;
        }
        .collect{
          text-align: center;
          font-family: iconfont;
          width: 20px;
        }
        .name{
          min-width: 180px;
          width: 22%;
        }
        .artist{
          float: right;
          min-width: 100px;
          width: 20%;
        }
        .album{
          float: right;
          min-width: 140px;
          width: 22%;
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