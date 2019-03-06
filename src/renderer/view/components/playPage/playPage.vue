<template>
  <div class="play-page">
    <div class="play-page-wrap">
      <div class="left-wrap">
        <img :src= "playInfo.album ? playInfo.album.picUrl : playInfo.al.picUrl || 'static/icon.ico'"
             alt=""
             class="album" :class="{rolling: $store.state.songList.status}">
      </div>
      <div class="right-wrap">
        <div class="title-wrap">
          <p class="title">{{playInfo.name}}</p>
          <p class="info">
            歌手：{{playInfo.artists? playInfo.artists.map((art)=>{ return art.name}).join('、') : '未知'}}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            专辑：{{playInfo.al? playInfo.al.name : '未知'}}
          </p>
        </div>
        <ul class="article" ref="article">
          <li class="article-row"
              v-for="(item ,i) in lyric" :class="{'T-FT T-TSD bolder': item.time === currentTime}">
            {{item.ly}}
          </li>
        </ul>
      </div>
    </div>
    <div class="content">

    </div>
  </div>
</template>

<script>
  export default {
    name: "playPage",
    props: {
      lyric: {
        type: Array
      },
      playInfo: {
        type: Object
      }
    },
    data(){
      return {
        currentTime: '',
        scrollInit: -180
      }
    },
    created(){
    },
    mounted() {
      this.$on('lyMarqueen', (ly) => {this.lyMarqueen(ly)});
    },
    activated(){
      this.$store.dispatch('back/setFullPath', 'playPage');
    },
    watch: {
      lyric: function(val) {
        this.scrollInit = -180;
      }
    },
    methods: {
      lyMarqueen(arg) {
        let ly = arg[0];
        this.currentTime = ly;
        this.scrollInit += 30;
        if(arg[1]) {
          this.scrollInit = -150;
          this.$refs.article.scrollTop = 0;
        }
        if(this.scrollInit >= 0) {
          let timer = setInterval(() => {
            if(Math.abs(this.$refs.article.scrollTop - this.scrollInit) > 90){
              this.$refs.article.scrollTop = this.scrollInit;
              clearInterval(timer);
            }
            else if(this.$refs.article.scrollTop > this.scrollInit){
              this.$refs.article.scrollTop -= 1;
            }
            else if(this.$refs.article.scrollTop < this.scrollInit){
              this.$refs.article.scrollTop += 1;
            }
            else{
              clearInterval(timer);
            }
          }, 15)
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "@/sass/variable.scss";

  .play-page{
    position: fixed;
    top: 30px;
    left: 0;
    width: 100%;
    height: calc(100vh - 60px);
    background-color: #fff;
    .play-page-wrap{
      width: 990px;
      margin: 0 auto;
    }
    .left-wrap{
      float: left;
      margin: 50px 100px 0 100px;
      .album{
        width: 260px;
        height: 260px;
        border-radius: 50%;
      }
      .rolling{
        animation: Roll infinite 28s linear;
      }
    }
    .title-wrap{
      .title{
        font-size: 16px;
        line-height: 20px;
        margin: 10px 0 0 0;
        font-weight: bolder;
      }
      .info{
        margin: 0;
        line-height: 30px;
        font-size: 12px;
        color: #929292;
      }
    }
    .article{
      padding: 0;
      height: 330px;
      overflow-y: scroll;
      &::-webkit-scrollbar{
        width: 8px;
        background-color: #fff;
      }
      &::-webkit-scrollbar-thumb{
        width: 8px;
        border-radius: 4px;
        background-color: #e8e8e8;
      }
      .article-row{
        font-size: 14px;
        line-height: 30px;
        list-style: none;
        .bolder{
          font-weight: bolder;
        }
      }
    }
  }

  @keyframes Roll {
    0%{ transform: rotate(0deg) }
    100%{ transform: rotate(360deg) }
  }
</style>
