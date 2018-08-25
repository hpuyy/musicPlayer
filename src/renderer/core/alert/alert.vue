<template>
  <div class="module-dialog">
    <div class="box-mask">
      <div class = "box-container">
        <header class="title">{{title}}
          <span class="icon-close"
                @click="$emit('close')">&#xe602;
          </span>
        </header>
        <div class = "box-content">{{text}}</div>
        <div class="box-bottom">
          <div class="bottom-item" @click="$emit('close')">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'alert',
    props:{
      title: {
        type: String,
        require: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
    methods:{}
  }
</script>

<style lang="scss" scoped>
  @import './dialog.scss';
</style>
