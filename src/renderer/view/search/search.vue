<template>
  <div class="search-sys-bd">
    <div style="margin-bottom: 20px;">
      <input type="text" class="search-sys-input" placeholder="发现好音乐" v-model="keywords">
      <span class="icon-search" @click="search">&#xe63b;</span>
    </div>
    <ul class="recommend-songs-list">
      <li class="song-list-item"
          v-for="(item, index) in result"
          @click="play(index)">
        <span class="playing"
              v-if="$store.state.songList.id == item.id">
          &#xe651;
        </span>
        <span class="index" v-else>{{index + 1}}</span>
        <span class="collect" @click="collect(item.id)">&#xe681;</span>
        <span class="name">{{item.name}}</span>
        <span class="type">&#xe60a;</span>
        <span class="album">{{item.album.name}}</span>
        <span class="artist">{{item.artists.map(art=>{return art.name}).join('、')}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import Search from '@/api/music/search';
  export default {
    name: "search",
    data(){
      return{
        keywords: '',
        result: []
      }
    },
    methods:{
      search(){
        Search("刘若英").then((res) => {
          this.result = res.result.songs
        });
      },
      collect(id, like = true){
        Like(id, like).then(() => {
          this.$alert('收藏成功(注:当前系统无法显示收藏状态)', '温馨提示');
        })
      },
      play(index){
        if(!this.saveData){
          this.$store.dispatch('songList/setSongList', this.result);
          localStorage.setItem('songList', JSON.stringify(this.result));
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
  .search-sys-bd{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 16px 0;
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
    position: relative;
    .icon-search{
      font-family: iconfont;
      font-size: 20px;
      display: inline-block;
      width: 25px;
      position: absolute;
      right: calc(5% + 12px);
      top: 24px;
    }
    .search-sys-input{
      border: 0;
      border-bottom: 1px solid #4d4d4d;
      text-indent: 12px;
      width: 90%;
      height: 35px;
      font-size: 16px;
      margin-left: 5%;
      &:focus{
        outline: none;
      }
    }
    .recommend-songs-list{
      padding: 0 28px 50px;
      border-top: 1px dashed #cfcfcf;
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