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
  src: url("./assets/font/BarlowCondensed-SemiBold.ttf");
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
* {
  padding: 0;
  margin: 0;
}
@media only screen and (min-width: 320px) {
  html {
    font-size: 17px !important;
  }
}

@media only screen and (min-width: 375px) {
  html {
    font-size: 20px !important;
  }
}

@media only screen and (min-width: 400px) {
  html {
    font-size: 21.33333333px !important;
  }
}

@media only screen and (min-width: 414px) {
  html {
    font-size: 22.08px !important;
  }
}

@media only screen and (min-width: 480px) {
  html {
    font-size: 89.6px !important;
  }
<<<<<<< HEAD
}
</style>
=======
  @media only screen and (min-width: 320px) {
    html {
        font-size: 19PX !important;
    }
}

@media only screen and (min-width: 375px) {
    html {
        font-size: 20PX !important;
    }
}

@media only screen and (min-width: 400px) {
    html {
        font-size: 21.33333333PX !important;
    }
}

@media only screen and (min-width: 414px) {
    html {
        font-size: 22.08PX !important;
    }
}

@media only screen and (min-width: 480px) {
    html {
        font-size: 25.6PX !important;
    }
}
</style>
>>>>>>> 8f9c8e6d85493be14794cf98593d33cff2a9ef95
