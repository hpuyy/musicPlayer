<template>
  <div class="song-list-module">
    <header class="recommend-songs-bg">
      <div class="label">歌手</div>
      <div class="date">
        <img :src="baseUrl + playlist.artist.img1v1Url">
      </div>
      <div class="content">
        <div class="title">{{playlist.artist.name}}</div>
        <div class="operate">
          <div>
            单曲数({{playlist.artist.musicSize}})
          </div>
          <div>专辑({{playlist.artist.albumSize}})</div>
          <div>MV({{playlist.artist.mvSize}})</div>
        </div>
        <div class="explain">介绍：{{playlist.artist.briefDesc}}</div>
      </div>
      <div class="play-all"><span class="icon-play T-FT">&#xe624;</span>播放全部</div>
    </header>
    <ul class="recommend-songs-list">
      <li class="song-list-item"
          v-for="(item, index) in playlist.hotSongs"
          @click="play(index)">
        <span class="playing T-FT"
              v-if="$store.state.songList.id == item.id">
          &#xe651;
        </span>
        <span class="index" v-else>{{index + 1}}</span>
        <span class="name">{{item.name}}</span>
        <span class="type T-FT">&#xe60a;</span>
        <span class="album">{{item.al.name}}</span>
        <span class="artist">{{item.ar.map(art=>{return art.name}).join('、')}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import Artists from '@/api/music/artists';

  export default {
    name: "artistSongList",
    data(){
      return{
        playlist:{},
        saveData: false,
        timer: '',
        loading: true,
        baseUrl: 'http://localhost:9083/res/res?url='
      }
    },
    created(){
      this.$store.dispatch('back/setFullPath', this.$route.fullPath);
      this.init(this.$route.query.id);
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
      init(id){
        Artists(id).then(res => {
          this.playlist = res;
        });
      },
      play(index){
        if(!this.saveData){
          let songList = this.playlist.hotSongs.map((data, index) => {
            return Object.assign({}, {artists: data.ar}, data)
          });

          this.$store.dispatch('songList/setSongList', songList);
          localStorage.setItem('songList', JSON.stringify(songList));
        }
        this.$store.dispatch('songList/stop');
        setTimeout(() => {
          this.$store.dispatch('songList/play', index);
        },10);
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
      position: relative;
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
        max-height: 180px;
        overflow: hidden;
        width: 28%;
        text-align: center;
        margin-right: 15px;
        font-size: 60px;
        &>img{
          width: 100%;
        }
      }
      .content{
        display: inline-block;
        vertical-align: top;
        box-sizing: border-box;
        width: 65%;
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
          .subscribed{
            color: $theme-color;
          }
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
          margin-top: 10px;
          box-sizing: border-box;
          font-size: 12px;
          height: 65px;
          width: 100%;
          line-height: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          overflow-y: scroll;
          cursor: default;
          &::-webkit-scrollbar{
            width: 8px;
            cursor: pointer;
          }
          &::-webkit-scrollbar-button{
            display: none;
          }
          &::-webkit-scrollbar-track{
            width: 8px;
            cursor: pointer;
          }
          &::-webkit-scrollbar-thumb{
            background-color: #d1d1d1;
            border-radius: 10px;
            width: 8px;
            height: 10px;
            cursor: pointer;
          }
        }
      }
      .play-all{
        margin: 25px 0 0;
        font-size: 18px;
        line-height: 30px;
        color: #000;
        cursor: pointer;
        text-indent: 10px;
        padding-bottom: 10px;
        position: absolute;
        bottom: 0;
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
        cursor: pointer;
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
        .collected{
          font-family: iconfont;
          width: 20px;cursor: pointer;
          text-align: center;
          color: $theme-color;
          &:hover{
            text-shadow: 0 0 5px $theme-color;
          }
        }
        .collect{
          text-align: center;
          font-family: iconfont;
          width: 20px;cursor: pointer;
          &:hover{
            text-shadow: 0 0 5px $theme-color;
            color: $theme-color;
          }
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
