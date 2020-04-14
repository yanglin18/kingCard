<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
  export default {
    name: "App"
  };
</script>

<style>
  @font-face {
    font-family: Barlow;
    src: url('./assets/font/BarlowCondensed-SemiBold.ttf');
  }

  #app {
    font-family: Barlow, "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    cursor: pointer;
    /* margin-top: 60px; */
  }

  input {
    outline: none;
  }
</style>