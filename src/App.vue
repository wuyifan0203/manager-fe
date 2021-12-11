<script>
import { inject, onMounted } from 'vue';
export default{
  name:'app',
  mounted(){
    this.$storage.setItem('make','love');
  },
  setup(){
    // const request = inject('$request');
  //   const storage = inject('$storage');
  //   onMounted(()=>{
  //      storage.setItem('age',15);
  //      console.log('AAA');
  //   });
  //   // const userInfo = await request.get('/login');
  // storage.setItem('age',15);
  //   console.log(storage);
     
   
   
    // console.log(userInfo);
  }
};

</script>

<template>
 <router-view></router-view>
</template>

<style>

</style>
