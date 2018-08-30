<template>
  <div class="recommend-songs">
    <header class="recommend-songs-bg">
      <label for="file_input">
        <div class="date T-FT" id="drag">+</div>
      </label>
      <input type="file"
             id="file_input"
             multiple="multiple"
             style="display: none"
             webkitdirectory directory @change="loadFiles" ref="files" />
      <div class="content">
        <div class="title">添加文件夹</div>
        <div class="explain">系统自动过滤音频文件，当前支持MP3、OGG、WAV</div>
      </div>
      <div class="play-all">
        <span class="icon-play T-FT">&#xe624;</span>播放全部
        <span class="mul-remove" @click="remove">
          <span v-if="!del">批量移除</span>
          <span v-else @click.stop="saveEdit">保存</span>
        </span>
      </div>
    </header>
    <ul class="recommend-songs-list">
      <li class="song-list-item"
          v-for="(item, index) in dataList"
          @click="play(index)">
        <span class="playing T-FT"
              v-if="$store.state.songList.id == item.id">
          &#xe651;
        </span>
        <span class="index" v-else>{{index + 1}}</span>
        <span class="name">{{item.name}}</span>
        <span class="type del T-FT T-TSD-H"
              v-show="del"
              @click.stop="removeLocalMusic(item.id)">&#xe602;
        </span>
        <span class="type T-FT">&#xe60a;</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import readDir from '@/js/readDir';

  export default {
    name: "localMusic",
    data(){
      return{
        songList: [],
        saveData: false,
        timer: '',
        loading: true,
        dataList: JSON.parse(localStorage.getItem('localMusic')) || [],
        del: false
      }
    },
    created(){
      this.$store.dispatch('back/setFullPath', this.$route.fullPath);
    },
    methods:{
      remove(){
        this.del = !this.del;
      },
      removeLocalMusic(id){
        for(let i = 0, len = this.dataList.length; i <= len; i++){
          if(this.dataList[i].id === id){
            this.dataList.splice(i, 1);
            break;
          }
        }
      },
      saveEdit(){
        this.del = !this.del;
        localStorage.setItem('localMusic', JSON.stringify(this.dataList));
      },
      loadFiles(){
        let url = this.$refs.files.files[0].path;
        let files = readDir(url + '\\');
        this.dataList = JSON.parse(localStorage.getItem('localMusic')) || [];
        files.map((res) => {
          if(res.filename.match(/(.mp3)|(.ogg)|(.wav)$/)){
            this.dataList.push({
              name: res.filename.replace('.mp3', ''),
              url: 'http://localhost:9082/r/loadsrc?url=' + res.path,
              id: Math.random()
            })
          }
        });
        localStorage.setItem('localMusic', JSON.stringify(this.dataList));
      },
      play(index){
        if(!this.saveData){
          this.$store.dispatch('songList/setLocalMusic', this.dataList);
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
        cursor: cell;
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
        .mul-remove{
          float: right;
          span{
            color: #000;
            font-size: 14px;
          }
          font-size: 14px;
          &:hover{
            text-shadow: 0 0 5px #747474;
          }
        }
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
        cursor: pointer;
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
        .del{
          margin-left: 5px;
          cursor: pointer;
          &:hover{
            text-shadow: 0 0 10px $theme-color;
          }
        }
        .type{
          font-family: iconfont;
          float: right;
          width: 20px;
          font-size: 14px;
          text-align: center;
          color: $theme-color;
        }
      }
    }
  }
</style>