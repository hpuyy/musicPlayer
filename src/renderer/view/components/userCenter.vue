<template>
  <transition name="slide-left">
    <div class="user-center" v-if="$store.state.userCenter.show">
      <header class="user-center-title">
        <div class="content">账号</div>
        <div class="edit" v-show="userInfo != undefined">编辑</div>
      </header>
      <div class="user-center-login" v-show="userInfo == undefined">
        <div class="login-item">
          <input type="text" placeholder="请输入手机号" v-model="phone">
        </div>
        <div class="login-item">
          <input type="password" placeholder="请输入密码" v-model="pwd">
        </div>
        <div class="login-item">
          <input type="button" value="登入" class="btn" @click="login">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import LoginCellphone from '@/api/music/login_cellphone';

  export default {
    name: "userCenter",
    data(){
      return{
        userInfo: this.$store.state.userCenter.userInfo.userId,
        phone:'',
        pwd: ''
      }
    },
    mounted(){
      console.log(this.userInfo)
    },
    methods:{
      login(){
        LoginCellphone(this.phone, this.pwd).then((res)=>{
          localStorage.setItem('userInfo', JSON.stringify(res.profile));
          this.$store.dispatch('userCenter/Hide');
          this.$store.dispatch('userCenter/setInfo', res.profile);
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
  }
</style>