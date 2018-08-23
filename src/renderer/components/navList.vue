<template>
  <div class="nav-list">
    <ul>
      <li class="nav-list-open"><div class="icon-open">&#xe667;</div></li>
      <li><div class="icon-search">&#xe63b;</div>搜索</li>
      <li class="checked"><div class="icon-music">&#xe680;</div>发现音乐 </li>
      <li><div class="icon-mv">&#xe604;</div>MV</li>
      <li><div class="icon-fri">&#xe61a;</div>朋友</li>
    </ul>
    <ul>
      <li class="nav-list-title">我的音乐</li>
      <li><div class="icon-local">&#xe605;</div>本地音乐</li>
      <li><div class="icon-down">&#xe63a;</div>下载管理</li>
      <li><div class="icon-recent">&#xe661;</div>最近播放</li>
      <li><div class="icon-cloud">&#xe654;</div>我的音乐云盘</li>
      <li><div class="icon-fm">&#xe626;</div>我的电台</li>
      <li><div class="icon-collect">&#xe63c;</div>我的收藏</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "nav-list"
  }
</script>

<style lang="scss">
  @import "@/sass/variable.scss";

.nav-list{
  width: 200px;
  height: calc(100% - 90px);
  border-right: 1px solid #eee;
  box-shadow: 0 0 3px 1px #eee inset;
  display: inline-block;
  color: #3a3a3a;
  -webkit-user-select: none;
  cursor: default;
  .checked{
    background-color: rgba(0, 0, 0, .12);
    border-left: 2px solid $theme-color;
  }
  .nav-list-open:hover{
    background-color: transparent;
    cursor: default;
  }
  ul{
    padding: 0;
    margin-bottom: 15px;
    margin-top: 0;
  }
  li{
    list-style: none;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    position: relative;
    cursor: pointer;
    &:hover{
      background-color: rgba(0, 0, 0, .08);
    }
    [class^="icon-"], [class*=" icon-"]{
      font-family: iconfont;
      width: 40px;
      display: inline-block;
      text-align: center;
      font-size: 16px;
    }
    .icon-open{
      cursor: default !important;
    }
    .icon-search{
      color: #444444;
      font-weight: bolder;
    }
    .icon-music{
      font-weight: bolder;
      color: #444444;
    }
    .icon-mv{
      font-size: 18px;
      font-weight: bolder;
    }
    .icon-fri{
      font-size: 18px;
      font-weight: bolder;
    }
    .icon-local{
      font-size: 18px;
      color: #444444;
      font-weight: bolder;
    }
    .icon-down{
      font-weight: bolder;
      font-size: 17px;
      color: #4f4f4f;
    }
    .icon-recent{
      font-size: 17px;
      font-weight: bolder;
      color: #4f4f4f;
    }
    .icon-cloud{
      font-size: 13px;
      font-weight: bolder;
      color: #444444;
    }
    .icon-fm{
      font-size: 19px;
      font-weight: bolder;
      color: #4f4f4f;
    }
    .icon-collect{
      font-size: 17px;
      font-weight: bolder;
      color: #4f4f4f;
    }
  }
  .nav-list-title{
    color: #858585;
    margin-left: 12px;
    font-weight: bolder;
    font-size: 12px;
    cursor: default;
    &:hover{
      background-color: transparent;
    }
  }
}
</style>