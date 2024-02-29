/* eslint-disable */
<template>
    <div style="width: 100%;">
      <my-header></my-header>
      <router-view></router-view>
      <!-- <router-link to="login">login</router-link>
      <router-link to="register">register</router-link> -->
    </div>
    
    <!-- <router-view></router-view> -->
</template>

<script lang="ts">
import { reactive, ref } from 'vue';
import axios from 'axios';
import MyHeader from '@/components/MyHeader.vue';

export default {
  components: {
    MyHeader
  },
  setup() {

    return {

    };
  },
};
</script>

<style scoped></style>
