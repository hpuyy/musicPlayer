<template>
  <div class="player-bd">
    <div class="pic" ref="pic">
      <img :src="pic">
    </div>
    <div class="player-control">
      <div class="pre T-SD-H T-BG" @click="control('prev')">&#xe6e1;</div>
      <div class="play-bd T-SD-H T-BG">
        <span class="play"
              v-if="!this.$store.state.songList.status"
              @click="control('play')">&#xe69d;</span>
        <span class="pause"
              v-else
              @click="control('play')">&#xe647;</span>
      </div>
      <div class="next T-SD-H T-BG" @click="control('next')">&#xe718;
      </div>
    </div>
    <div class="player-process"
         @mousemove="speed($event, 'move')"
         @mouseup="speed($event, 'end')">
      <div class="music-name">
        <span class="name">{{playInfo.name || "当前无正在播放歌曲"}}</span>
        <span class="author">
          - {{playInfo.artists? playInfo.artists.map((art)=>{ return art.name}).join('、') : "未知"}}
        </span>
        <div class="timer">
          <span>{{currentTimeShow}}</span>
          <span class="timer-total"> / {{durationShow}}</span>
        </div>
      </div>
      <div class="process-track" ref="progress">
        <div class="process-content T-BG" :style="{width: percent}">
          <div class="process-thumb T-SD-H" @mousedown="speed($event, 'start')">
          </div>
        </div>
        <audio ref="music"
               src=""
               @timeupdate="progress()">
        </audio>
      </div>
    </div>
    <div class="player-type">
      <div class="collected" v-if="collected == true">&#xe69e;</div>
      <div class="un-collect" v-else>&#xe681;</div>
      <div class="sto" v-if="type == 'sto'" @click="change" >&#xe603;</div>
      <div class="solo" v-if="type == 'solo'">&#xe636;</div>
      <div class="loop" v-if="type == 'loop'">&#xe69c;</div>
    </div>
  </div>
</template>

<script>
  import MusicUrl from '@/api/music/music_url';
  const globalShortcut = require('electron').remote.globalShortcut;

  export default {
    name: "player",
    data(){
      return{
        pic: '',
        type: 'sto',
        collected: false,
        duration: 0,
        currentTime: 0,
        durationShow: '',
        currentTimeShow: '',
        percent: '',
        auto: true,
        touchStart: 0,
        total: 0,
        music: [],
        musicUrl: [],
        playInfo: {},
        playerControl: false
      }
    },
    created(){
      globalShortcut.register('CommandOrControl + Right', () => {
        this.next();
      });
      globalShortcut.register('CommandOrControl + Left', () => {
        this.prev();
      });
      globalShortcut.register('CommandOrControl + Down', () => {
        this.play();
      });
    },
    mounted(){
      MusicUrl(this.$store.state.songList.songList[0].id).then((res)=>{
        this.$refs.music.src = res.data[0].url;
        this.playInfo = this.$store.state.songList.songList[0];
        this.pic = this.playInfo.album?this.playInfo.album.picUrl : this.playInfo.al.picUrl;
        if(this.pic == undefined){
          this.pic = 'static/icon.ico';
        }
      });
    },
    watch:{
      '$store.state.songList.status': function (val, old) {
        if(val){
          let data = this.$store.state.songList;
          if(this.playerControl){
            this.$refs.music.play();
            this.playerControl = false;
          }
          else{
            if(data.isLocal){
              this.$refs.music.src = 'http://localhost:9083' + data.localMusic[data.index].url;
              this.playInfo = data.localMusic[data.index];
              this.$refs.music.play();
              this.pic = 'static/icon.ico';
              return;
            }
            MusicUrl(data.songList[data.index].id).then((res)=>{
              if(res.data[0].url == null || res.data[0].url == undefined){
                this.$alert('歌曲已下架！自动播放下一曲。', '出错了');
                this.next();
                return;
              }
              this.$refs.music.src = res.data[0].url;
              this.playInfo = data.songList[data.index];
              this.pic = this.playInfo.album?this.playInfo.album.picUrl : this.playInfo.al.picUrl;
              if(this.pic == undefined){
                this.pic = 'static/icon.ico';
              }
              this.$refs.music.play();
            });
          }
        }
        else{
          this.$refs.music.pause();
        }
      }
    },
    methods:{
      control(type){
        switch(type){
          case 'play': {
            this.play();
            break;
          }
          case 'next': this.next(); break;
          case 'prev': this.prev(); break;
        }
      },
      play(){
        if(this.$store.state.songList.status){
          this.$store.dispatch('songList/stop');
        }
        else{
          this.playerControl = true;
          this.$store.dispatch('songList/stop');
          this.$store.dispatch('songList/play', this.$store.state.songList.index);
        }
      },
      prev(){
        let index = this.$store.state.songList.index - 1;
        if(this.$store.state.songList.isLocal){
          if(index === -1) index = this.$store.state.songList.localMusic.length - 1;
        }
        else{
          if(index === -1) index = this.$store.state.songList.songList.length - 1;
        }
        this.$store.dispatch('songList/stop');
        setTimeout(()=>{this.$store.dispatch('songList/play', index)}, 10);
      },
      next(){
        let index = this.$store.state.songList.index + 1;
        if(this.$store.state.songList.isLocal){
          if(index === this.$store.state.songList.localMusic.length) index = 0;
        }
        else{
          if(index === this.$store.state.songList.songList.length) index = 0;
        }
        this.$store.dispatch('songList/stop');
        setTimeout(()=>{this.$store.dispatch('songList/play', index)}, 10);
      },
      speed(e, action){
        if(action === 'start'){
          this.auto = false;
          this.touchStart = e.pageX;
          this.total = this.$refs.progress.offsetWidth;
        }
        else if(action === 'end'){
          this.$refs.music.currentTime = this.$refs.music.duration * this.percent.replace('%', '')/100;
          this.auto = true;
        }
        else{
          if(this.auto) return;
          let change = e.pageX - this.touchStart;
          this.touchStart = e.pageX;
          let changePercent = change/this.total*100;
          this.percent = parseFloat(this.percent.toString().replace('%', '')) + changePercent +'%';
        }
      },
      progress(){
        if(!this.auto) return;
        this.duration = this.$refs.music.duration || 0;
        this.currentTime = this.$refs.music.currentTime || 0;
        this.percent = this.currentTime/this.duration*100+'%';
        this.durationShow = this.timeTransform(this.duration);
        this.currentTimeShow = this.timeTransform(this.currentTime);
        this.$refs.music.addEventListener('ended',()=>{
          this.next();
        });
      },
      timeTransform(time){
        let newTime = {};
        newTime.min = time < 600?`0${parseInt(time/60)}` : parseInt(time/60);
        newTime.sec = Math.ceil(time % 60) < 10?`0${Math.ceil(time % 60)}` : Math.ceil(time % 60);

        return `${newTime.min}:${newTime.sec}`;
      },
    }
  }
</script>

<style lang="scss">
  @import "@/sass/variable.scss";

.player-bd{
  -webkit-user-select:none;
  cursor: default;
  width: 100%;
  height: 60px;
  border-top: 1px solid #f4f4f4;
  box-shadow: 0 -2px 5px 1px #f2f2f2;
  position: fixed;
  bottom: 0;
  overflow: hidden;
  &>div{
    float: left;
  }
  .pic{
    width: 60px;
    height: 60px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .player-control{
    font-family: iconfont;
    color: #fff;
    height: 60px;
    line-height: 60px;
    padding: 0 30px;
    .pre, .play-bd, .next{
      &:hover{
        box-shadow: 0 0 5px 1px $theme-color;
      }
    }
    &>div{
      display: inline-block;
      background-color: $theme-color;
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      text-align: center;
      cursor: pointer;
      font-size: 12px;
      margin-left: 10px;
    }
    .play-bd{
      width: 33px;
      height: 33px;
      line-height: 33px;
      span{
        display: inline-block;
        width: 100%;
        height: 100%
      }
      .play{
        position: relative;
        left: 1.5px;
      }
    }
  }
  .player-process{
    width: calc(100% - 369px);
    height: 60px;
    .music-name{
      font-size: 12px;
      height: 40px;
      line-height: 40px;
      white-space: nowrap;
      color: #2f2f2f;
      position: relative;
      .author{
        color: #929292;
      }
      .timer{
        position: absolute;
        right: 0;
        top: 0;
        font-size: 12px;
        height: 100%;
        .timer-total{
          color: #adadad;
        }
      }
    }
    .process-track{
      width: 100%;
      height: 2px;
      background-color: #d4d4d4;
      .process-content{
        background-color: $theme-color;
        height: 100%;
        width: 0;
        position: relative;
      }
      .process-thumb{
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid #d9d9d9;
        box-shadow: 0 0 4px 1px #d9d9d9;
        box-sizing: border-box;
        position: absolute;
        right: -8px;
        top: -7px;
        cursor: pointer;
        &:hover{
          box-shadow: 0 0 6px 1px $theme-color;
        }
        background-color: rgba(255, 255, 255, 0.51);
        .dot{
          background-color: $theme-color;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          margin: 5px;
        }
      }
    }
  }
  .player-type{
    height: 60px;
    line-height: 60px;
    font-family: iconfont;
    padding-left: 15px;
    &>div{
      cursor: pointer;
      display: inline-block;
      width: 40px;
      text-align: center;
      font-size: 16px;
    }
  }
}
</style>