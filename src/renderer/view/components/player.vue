<template>
  <div class="player-bd">
    <div class="pic" ref="pic">
      <img :src="pic">
    </div>
    <div class="player-control">
      <div class="pre" @click="control('prev')">&#xe6e1;</div>
      <div class="play-bd">
        <span class="play"
              v-if="true"
              @click="control('play')">&#xe69d;</span>
        <span class="pause"
              v-else
              @click="control('pause')">&#xe647;</span>
      </div>
      <div class="next" @click="control('next')">&#xe718;</div>
    </div>
    <div class="player-process"
         @mousemove="speed($event, 'move')"
         @mouseup="speed($event, 'end')">
      <div class="music-name">
        <span class="name">标题标题标题</span>
        <span class="author"> - 作者</span>
        <div class="timer">
          <span>{{currentTimeShow}}</span>
          <span class="timer-total"> / {{durationShow}}</span>
        </div>
      </div>
      <div class="process-track" ref="progress">
        <div class="process-content" :style="{width: percent}">
          <div class="process-thumb" @mousedown="speed($event, 'start')">
          </div>
        </div>
        <audio ref="music"
               src="static/song2.mp3"
               @timeupdate="progress()">
        </audio>
      </div>
    </div>
    <div class="player-type">
      <div class="collected" v-if="collected == true">&#xe69e;</div>
      <div class="un-collect" v-else>&#xe681;</div>
      <div class="sto" v-if="type == 'sto'">&#xe603;</div>
      <div class="solo" v-if="type == 'solo'">&#xe636;</div>
      <div class="loop" v-if="type == 'loop'">&#xe69c;</div>
    </div>
  </div>
</template>

<script>
  import readDir from '@/js/readDir';
  import NewSong from '@/api/music/personalized_newsong';
  import MusicUrl from '@/api/music/music_url';

  export default {
    name: "player",
    data(){
      return{
        pic: 'static/default_pic.jpg',
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
        bathPath: 'http://localhost:8081/r/loadsrc?url=',
        music: [],
        musicUrl: [],
        index: 0
      }
    },
    mounted(){
      // let file = readDir("C:\\Users\\Administrator\\Desktop\\文档\\");
    },
    methods:{
      control(type){
        switch(type){
          case 'play': {
            NewSong().then((res)=>{
              res.result.map((data, index) => {
                let artist = data.song.artists.map((art)=>{ return art.name; });
                artist = artist.join('、');
                this.music.push({
                  id: data.song.id,
                  mvid: data.song.mvid,
                  name: data.song.name,
                  pic: data.song.album.picUrl,
                  artist: artist
                })
            });
          });
            this.$refs.music.play();
            break;
          }
          case 'next': this.next(); break;
          case 'prev': this.prev(); break;
        }
      },
      next(){
        /*this.$refs.music.src = this.bathPath + 'C:\\Users\\Administrator\\Desktop\\HellowWorld\\vueTest\\static\\music\\song3.mp3';*/
        /*MusicUrl(this.music[this.index++].id).then((url)=>{
          this.$refs.music.src = url.data[0].url;
          this.$refs.music.play();
        });*/
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
        this.duration = this.$refs.music.duration;
        this.currentTime = this.$refs.music.currentTime;
        this.percent = this.currentTime/this.duration*100+'%';
        this.durationShow = this.timeTransform(this.duration);
        this.currentTimeShow = this.timeTransform(this.currentTime);
        this.$refs.music.addEventListener('ended',()=>{
          console.log("end");
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