<template>
  <transition name="slide-left">
    <div class="user-center" v-if="$store.state.userCenter.show">
      <header class="user-center-title">
        <div class="content">账号</div>
        <div class="edit" v-show="userInfo != undefined">编辑</div>
      </header>
      <div class="user-center-login" v-show="$store.state.userCenter.userInfo.userId == undefined">
        <div class="login-item">
          <input type="text" placeholder="请输入手机号" v-model="phone">
        </div>
        <div class="login-item">
          <input type="password" placeholder="请输入密码" v-model="pwd">
        </div>
        <div class="login-item">
          <input type="button" value="登入" class="btn T-BG" @click="login">
        </div>
      </div>
      <div class="user-info">
        <div class="user-info-item">
          <div class="avator"><img :src="baseUrl + $store.state.userCenter.userInfo.avatarUrl"></div>
          <div class="nickname">{{$store.state.userCenter.userInfo.nickname}}</div>
          <div class="reg"><span>&#xe6cb;</span>签到</div>
        </div>
        <div class="user-info-item">
          <div class="info-item-msg">
            <div class="msg-num">{{detail.eventCount}}</div>
            <div class="msg-name">动态</div>
          </div>
          <div class="info-item-msg msg-center">
            <div>{{detail.follows}}</div>
            <div>关注</div>
          </div>
          <div class="info-item-msg">
            <div>{{detail.followeds}}</div>
            <div>粉丝</div>
          </div>
        </div>
      </div>
      <div class="user-grade-bd">
        <div class="user-grade-item">
          <span class="icon-grade">&#xe6cf;</span>
          <span class="grade">我的等级</span>
          <span class="icon-right">&#xe617;</span>
          <span class="item-num">lv.{{level}}</span>
        </div>
        <div class="user-grade-item">
          <span class="icon-vip">&#xe608;</span>
          <span class="grade">会员中心</span>
          <span class="icon-right">&#xe617;</span>
          <span class="item-num">
            <span v-if="detail.vipType == 0">未订购</span>
            <span v-else>已订购</span>
          </span>
        </div>
        <div class="user-grade-item" @click="test">
          <span class="icon-cart">&#xe696;</span>
          <span class="grade">积分商城</span>
          <span class="icon-right">&#xe617;</span>
          <span class="item-num">未知</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import LoginCellphone from '@/api/music/login_cellphone';
  import Refresh from '@/api/music/login_refresh';
  import GetDetail from '@/api/music/user_detail';

  export default {
    name: "userCenter",
    data(){
      return{
        userInfo: this.$store.state.userCenter.userInfo.userId,
        phone:'',
        pwd: '',
        detail: {},
        level: 0,
        baseUrl: 'http://localhost:9083/res/res?url='
      }
    },
    created(){
      if(this.userInfo !== undefined){
        Refresh().then((res)=>{
          if(res.code !== 200){
            this.$alert('登入失败！', '提示').exec.then(()=>{
              location.reload();
            });
            localStorage.removeItem('userInfo');
          }
        });
        GetDetail(this.userInfo).then((res)=>{
          this.detail = res.profile;
          this.level = res.level;
        });
      }
    },
    methods:{
      test(){
      },
      login(){
        LoginCellphone(this.phone, this.pwd).then((res)=>{
          this.userInfo = res.profile;
          localStorage.setItem('userInfo', JSON.stringify(res.profile));
          this.$store.dispatch('userCenter/Hide');
          this.$store.dispatch('userCenter/setInfo', res.profile);
          this.$alert('登入成功！', '温馨提示').exec.then(() =>{
            location.reload();
          });
        }, () => {
          this.$alert('登入失败！', '未知错误');
          localStorage.removeItem('userInfo');
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "@/sass/variable.scss";

  .user-center{
    position: absolute;
    top: 30px;
    right: 0;
    width: 320px;
    height: calc(100% - 90px);
    background-color: #fff;
    box-shadow: -1px 0 8px 1px #d4d4d4;
    z-index: 100;
    .user-center-title{
      width: 100%;
      height: 30px;
      border-bottom: 1px solid #eee;
      line-height: 30px;
      font-size: 14px;
      padding: 0 15px;
      box-sizing: border-box;
      .content{
        display: inline-block;
      }
      .edit{
        float: right;
        border: 1px solid #9e9e9e;
        width: 46px;
        height: 20px;
        text-align: center;
        line-height: 21px;
        margin-top: 5px;
        cursor: pointer;
      }
    }
    .user-center-login{
      width: 100%;
      margin-top: 40px;
      .login-item{
        text-align: center;
        input{
          width: 250px;
          height: 34px;
          text-indent: 10px;
          margin-bottom: 20px;
          font-size: 16px;
          box-sizing: border-box;
        }
        .btn{
          background-color: $theme-color;
          border: 0;
          cursor: pointer;
          color: #fff;
        }
      }
    }
    .user-info{
      width: 100%;
      height: 150px;
      padding: 0 15px;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
      .user-info-item{
        height: 75px;
        padding: 10px 0;
        box-sizing: border-box;
        line-height: 55px;
        font-size: 12px;
        &>div{
          display: inline-block;
          vertical-align: middle;
          box-sizing: border-box;
        }
        .reg{
          float: right;
          border: 1px solid #bbbbbb;
          height: 20px;
          width: 55px;
          line-height: 20px;
          text-align: center;
          margin-top: 15px;
          cursor: pointer;
          span{
            font-family: iconfont;
            font-size: 16px;
            vertical-align: -10%;
          }
        }
        .avator{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 5px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .info-item-msg{
          width: 32.5%;
          text-align: center;
          &>div{
            line-height: 22.5px;
          }
        }
      }
      .msg-center{
        border-left: 1px solid #eee;
        border-right: 1px solid #eee;
      }
    }
    .user-grade-bd{
      padding: 20px;
      box-sizing: border-box;
      .user-grade-item{
        height: 45px;
        font-size: 12px;
        line-height: 45px;
        cursor: pointer;
        [class^= 'icon-']{
          font-family: iconfont;
          vertical-align: middle;
          margin-right: 2px;
        }
        .icon-grade{
          font-size: 18px;
        }
        .icon-vip{
          font-size: 16px;
          color: #5f5f5f;
          margin-right: 3px;
        }
        .icon-cart{
          font-size: 20px;
          margin-left: -1px;
        }
        .item-num, .icon-right{
          float: right;
          margin-left: 8px;
          color: #828282;
        }
      }
    }
  }
</style>