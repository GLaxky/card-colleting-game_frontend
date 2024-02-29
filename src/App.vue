<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  <!-- <router-link to="/home"></router-link> -->
  <!-- <router-link to="/login">login</router-link> -->
  <!-- <router-view v-slot="{ Component }">
    <transition name="move" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view> -->
  <div id="app">
    <!-- <MyHeader></MyHeader> -->
    <router-view></router-view>
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MyHeader from './components/MyHeader.vue';

export default defineComponent({
  name: 'App',
  components: {
    MyHeader
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  
}

* {
    margin: 0;
    padding: 0;
}

html,
body,
#app,
.wrapper {
    width: 100%;
    /* height: 100%; */
    overflow-x: hidden;
    background-color:#fdfaec;
}
</style>
