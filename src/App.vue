<script>
import { inject } from 'vue';
export default{
  name:'app',
  async setup(){
    const request = inject('$request');
    const userInfo = await request.get('/login');
    console.log(userInfo);
  }
};

</script>

<template>
 <router-view></router-view>
</template>

<style>

</style>
