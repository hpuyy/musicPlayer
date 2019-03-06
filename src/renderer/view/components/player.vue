<template>
  <div class="player-bd">
    <div class="player-wrap">
      <div class="pic T-SD-H"
           ref="pic"
           @click="showPlayPage">
        <img v-if="pic !== 'static/icon.ico'" :src="baseUrl + pic">
        <img else :src="pic">
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
            <span>{{currentTimeShow.replace(/\.\d*/, '')}}</span>
            <span class="timer-total"> / {{durationShow.replace(/\.\d*/, '')}}</span>
          </div>
        </div>
        <div class="process-track" ref="progress">
          <div class="process-content T-BG" :style="{width: percent}">
            <div class="process-thumb T-SD-H" @mousedown="speed($event, 'start')">
            </div>
          </div>
          <audio ref="music"
                 src="">
          </audio>
        </div>
      </div>
      <div class="player-type">
        <div class="type-item collected" v-if="collected == true">&#xe69e;</div>
        <div class="type-item un-collect" v-else>&#xe681;</div>
        <div class="type-item sto" v-if="type == 'sto'">&#xe603;</div>
        <div class="type-item solo" v-if="type == 'solo'">&#xe636;</div>
        <div class="type-item loop" v-if="type == 'loop'">&#xe69c;</div>
        <div class="type-item list" @click="listCon = !listCon">&#xe6be;</div>
      </div>
      <div class="player-list-bd" v-show="listCon" @click="listCon = false"></div>
      <transition name="scale">
        <div class="player-list" v-show="listCon">
          <div class="list-item" v-for="(item, index) in playList" @click="listPlay(index)">
            <div class="grid playing T-FT"
                 v-if="$store.state.songList.id == item.id">
              &#xe651;
            </div>
            <div class="grid" v-else>{{index + 1}}</div>
            <div class="">{{item.name}}</div>
          </div>
        </div>
      </transition>
    </div>
    <transition name="slide-up">
      <playPage v-show="$store.state.back.fullPath[0] == 'playPage'" :lyric="lyric" :playInfo="playInfo" ref="playPage"></playPage>
    </transition>
  </div>
</template>

<script>
  import MusicUrl from '@/api/music/music_url';
  import Lyric from '@/api/music/lyric';
  import playPage from './playPage/playPage';

  const globalShortcut = require('electron').remote.globalShortcut;
  const BrowserWindow = require('electron').remote.BrowserWindow;

  export default {
    name: "player",
    data() {
      return {
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
        lyric: [],
        lyricTemp: [],
        playInfo: {},
        playerControl: false,
        listCon: false,
        isBack: false,
        baseUrl: 'http://localhost:9083/res/res?url='
      }
    },
    created() {
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
    mounted() {
     this.getMusic(this.$store.state.songList.songList[0].id, true);
     setInterval(() => {
       this.progress();
     }, 100)
    },
    watch: {
      '$store.state.songList.status': function (val, old) {
        if (val) {
          let data = this.$store.state.songList;
          if (this.playerControl) {
            this.$refs.music.play();
            this.playerControl = false;
          } else {
            if (data.isLocal) {
              this.$refs.music.src = 'http://localhost:9083' + data.localMusic[data.index].url;
              this.playInfo = data.localMusic[data.index];
              this.$refs.music.play();
              this.pic = 'static/icon.ico';
              return;
            }
            this.getMusic(data.songList[data.index].id);
          }
        } else {
          this.$refs.music.pause();
        }
      }
    },
    computed: {
      playList: function () {
        let list;
        let data = this.$store.state.songList;
        if (!data.isLocal) {
          list = data.songList;
        } else {
          list = data.localMusic;
        }
        return list
      }
    },
    methods: {
      control(type) {
        switch (type) {
          case 'play': {
            this.play();
            break;
          }
          case 'next':
            this.next();
            break;
          case 'prev':
            this.prev();
            break;
        }
      },
      play() {
        if (this.$store.state.songList.status) {
          this.$store.dispatch('songList/stop');
        } else {
          this.playerControl = true;
          this.$store.dispatch('songList/stop');
          this.$store.dispatch('songList/play', this.$store.state.songList.index);
        }
      },
      prev() {
        let index = this.$store.state.songList.index - 1;
        if (this.$store.state.songList.isLocal) {
          if (index === -1) index = this.$store.state.songList.localMusic.length - 1;
        } else {
          if (index === -1) index = this.$store.state.songList.songList.length - 1;
        }
        this.$store.dispatch('songList/stop');
        setTimeout(() => {
          this.$store.dispatch('songList/play', index)
        }, 10);
      },
      next() {
        let index = this.$store.state.songList.index + 1;
        if (this.$store.state.songList.isLocal) {
          if (index === this.$store.state.songList.localMusic.length) index = 0;
        } else {
          if (index === this.$store.state.songList.songList.length) index = 0;
        }
        this.$store.dispatch('songList/stop');
        setTimeout(() => {
          this.$store.dispatch('songList/play', index)
        }, 10);
      },
      listPlay(index) {
        this.$store.dispatch('songList/stop');
        setTimeout(() => {
          this.$store.dispatch('songList/play', index);
        }, 10);
      },
      speed(e, action) {
        if (action === 'start') {
          this.auto = false;
          this.touchStart = e.pageX;
          this.total = this.$refs.progress.offsetWidth;
        } else if (action === 'end') {
          if (this.auto) return;
          this.$refs.music.currentTime = this.$refs.music.duration * this.percent.replace('%', '') / 100;
          this.auto = true;
          this.lyricTemp = [...this.lyric];
          this.isBack = true;
        } else {
          if (this.auto) return;
          let change = e.pageX - this.touchStart;
          this.touchStart = e.pageX;
          let changePercent = change / this.total * 100;
          this.percent = parseFloat(this.percent.toString().replace('%', '')) + changePercent + '%';
        }
      },
      progress() {
        if (!this.auto || !this.$refs.music) return;
        this.duration = this.$refs.music.duration || 0;
        this.currentTime = this.$refs.music.currentTime || 0;
        this.percent = this.currentTime / this.duration * 100 + '%';
        this.durationShow = this.timeTransform(this.duration);
        this.currentTimeShow = this.timeTransform(this.currentTime + 0.5);

        if(this.$store.state.back.fullPath[0] == 'playPage'){
          for(let i in this.lyricTemp){
            if(this.lyricTemp[i] && this.lyricTemp[i].time <= `[${this.currentTimeShow.slice(0, 8)}]`){
              this.$refs.playPage.$emit('lyMarqueen', [this.lyricTemp[i].time, this.isBack]);
              this.lyricTemp.shift();
              this.isBack = false;
            }
            else break;
          }
        }

        this.$refs.music.addEventListener('ended', () => {
          this.next();
        });
      },
      timeTransform(time) {
        let newTime = {};
        newTime.min = time < 600 ? `0${parseInt(time / 60)}` : parseInt(time / 60);
        newTime.sec = Math.floor(time % 60) < 10 ? `0${time % 60}` : time % 60;

        return `${newTime.min}:${newTime.sec}`;
      },
      getMusic(id, isStop) {
        MusicUrl(id).then((res) => {
          let data = this.$store.state.songList;
          if (res.data[0].url == null || res.data[0].url == undefined) {
            this.$alert('歌曲已下架！自动播放下一曲。', '出错了');
            this.next();
            return;
          }
          this.$refs.music.src = res.data[0].url;
          this.playInfo = data.songList[data.index];
          this.pic = this.playInfo.album ? this.playInfo.album.picUrl : this.playInfo.al.picUrl;
          if (this.pic == undefined) {
            this.pic = 'static/icon.ico';
          }
          isStop || this.$refs.music.play();
        });
        Lyric(id).then((res) => {
          this.lyric = [];
          let lyric = res.lrc.lyric.split(/\n/);
          for(let i in lyric){
            let ly = lyric[i].replace(/\[\d*:\d*\.\d*\]/g, '');
            let time = `${lyric[i].split(/\]/)[0]}]`;
            time = time.match(/\[\d*:\d*\.\d*\]/)? time : '';
            if(ly == '' || time == '') continue;
            this.lyric.push({ly: ly, time: time});
          }
          this.lyricTemp = [...this.lyric];
        });
      },
      showPlayPage() {
        if(this.$store.state.back.fullPath[0] === 'playPage'){
          this.$store.dispatch('back/removePath');
        }
        else{
          this.$store.dispatch('back/setFullPath', 'playPage');
        }
      }
    },
    components: {
      playPage: playPage
    }
  }
</script>

<style lang="scss">
  @import "@/sass/variable.scss";

  .player-bd, .player-wrap{
    -webkit-user-select: none;
    cursor: default;
    width: 100%;
    height: 60px;
    border-top: 1px solid #f4f4f4;
    box-shadow: 0 -2px 5px 1px #f2f2f2;
    position: fixed;
    bottom: 0;
    z-index: 100;

    .player-list-bd {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }

    .player-list {
      position: absolute;
      width: 260px;
      height: 350px;
      top: -370px;
      right: 0;
      background-color: #fff;
      box-shadow: -2px 0 6px 1px #d9d9d9;
      padding: 0 10px 20px;
      overflow-y: scroll;
      transform-origin: bottom right;

      .list-item {
        display: grid;
        cursor: pointer;
        grid-template-columns: 1fr 8fr;
        height: 40px;
        width: 100%;
        font-size: 12px;
        line-height: 40px;
        border-bottom: 1px solid #eee;

        .grid {
          text-indent: 5px;
        }

        .playing {
          font-family: iconfont;
          font-size: 16px;
          font-weight: bolder;
        }
      }

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-button {
        display: none;
      }

      &::-webkit-scrollbar-track {
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #d1d1d1;
        border-radius: 3px;
        width: 6px;
      }
    }

    & > div {
      float: left;
    }

    .pic {
      width: 60px;
      height: 60px;
      cursor: pointer;

      &:hover{
        box-shadow: 0 0 16px 3px var(--ThemeColor) !important;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }

    .player-control {
      font-family: iconfont;
      color: #fff;
      height: 60px;
      line-height: 60px;
      padding: 0 20px 0 10px;

      .pre, .play-bd, .next {
        &:hover {
          box-shadow: 0 0 5px 1px $theme-color;
        }
      }

      & > div {
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

      .play-bd {
        width: 33px;
        height: 33px;
        line-height: 33px;

        span {
          display: inline-block;
          width: 100%;
          height: 100%
        }

        .play {
          position: relative;
          left: 1.5px;
        }
      }
    }

    .player-process {
      width: calc(100% - 369px);
      height: 60px;

      .music-name {
        font-size: 12px;
        height: 40px;
        line-height: 40px;
        white-space: nowrap;
        color: #2f2f2f;
        position: relative;

        .author {
          color: #929292;
        }

        .timer {
          position: absolute;
          right: 0;
          top: 0;
          font-size: 12px;
          height: 100%;

          .timer-total {
            color: #adadad;
          }
        }
      }

      .process-track {
        width: 100%;
        height: 2px;
        background-color: #d4d4d4;

        .process-content {
          background-color: $theme-color;
          height: 100%;
          width: 0;
          position: relative;
        }

        .process-thumb {
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

          &:hover {
            box-shadow: 0 0 6px 1px $theme-color;
          }

          background-color: rgba(255, 255, 255, 0.51);

          .dot {
            background-color: $theme-color;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            margin: 5px;
          }
        }
      }
    }

    .player-type {
      height: 60px;
      line-height: 60px;
      font-family: iconfont;
      padding-left: 20px;

      & > .type-item {
        cursor: pointer;
        display: inline-block;
        width: 35px;
        text-align: center;
        font-size: 16px;
      }
    }

    .scale-enter-active, .scale-leave-active {
      transition: all .3s;
    }

    .scale-enter, .scale-leave-active {
      transform: scale3d(.5, .5, 1);
      opacity: 0;
    }
  }
  .player-wrap{
    background-color: #fff;
  }
  .slide-up-enter-active, .slide-up-leave-active{
    transition: all .2s;
  }
  .slide-up-leave-to{
    transform: translate3d(0, 30%, 0);
    opacity: 0;
  }
  .slide-up-enter{
    opacity: .4;
  }
</style>
