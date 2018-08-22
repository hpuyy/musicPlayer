<template>
  <div id="app">
    <Frame />
    <router-view></router-view>
  </div>
</template>

<script>
  import Frame from "@/components/frame";

  export default {
    name: 'cloud-music',
    components:{
      Frame: Frame
    }
  }
</script>

<style>
  /* CSS */
</style>
