<template>
  <div class="recommend-songs">
    <header class="recommend-songs-bg">
      <div class="date T-FT">{{date}}</div>
      <div class="content">
        <div class="title">每日歌曲推荐</div>
        <div class="explain">根据你的音乐口味生成，每天6:00更新</div>
      </div>
      <div class="play-all"><span class="icon-play T-FT">&#xe624;</span>播放全部</div>
    </header>
    <ul class="recommend-songs-list">
      <li class="song-list-item"
          v-for="(item, index) in songList"
          @click="play(index)">
        <span class="playing T-FT"
              v-if="$store.state.songList.id == item.id">
          &#xe651;
        </span>
        <span class="index" v-else>{{index + 1}}</span>
        <span class="collect T-FT-H T-TSD-H" @click.stop="collect(item.id)">&#xe681;</span>
        <span class="name">{{item.name}}</span>
        <span class="type T-FT">&#xe60a;</span>
        <span class="album">{{item.album.name}}</span>
        <span class="artist">{{item.artists.map(art=>{return art.name}).join('、')}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import Daily from '@/api/music/recommend_songs';
  import Like from '@/api/music/like';

  export default {
    name: "recommendSongs",
    data(){
      return{
        date: new Date().getDate(),
        songList: [],
        saveData: false,
        timer: '',
        loading: true
      }
    },
    created(){
      this.$store.dispatch('back/setFullPath', this.$route.fullPath);
    },
    activated(){
      Daily().then((res)=>{
        this.songList = res.recommend;
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
      collect(id, like = true){
        Like(id, like).then(() => {
          if(like){
            this.$alert('收藏成功(注:当前系统无法显示收藏状态)', '温馨提示');
          }
          else{
            this.$alert('取消成功(注:当前系统无法显示收藏状态)', '温馨提示');
          }
          Daily().then((res)=>{
            this.songList = res.recommend;
          });
        })
      },
      play(index){
        if(!this.saveData){
          this.$store.dispatch('songList/setSongList', this.songList);
          localStorage.setItem('songList', JSON.stringify(this.songList));
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
  .recommend-songs{
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
        .collect{
          text-align: center;
          font-family: iconfont;
          width: 20px;
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
