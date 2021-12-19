<template>
  <div class="welcome">
    <div class="content">
      <div class="sub-title">Welcome</div>
      <div class="title">manager control system</div>
      <div class="desc">-Vue3.0+ELementPlus+Koa2+Mongo</div>
    </div>
    <div class="img">
    </div>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Welcome',
  setup() {},
};
</script>
<style lang="scss" scoped>
.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .content {
      position: relative;
      bottom:40px;
    .sub-title {
      font-size: 30px;
      line-height: 42px;
      color: #333;
    }
    .title {
      font-size: 40px;
      line-height: 62px;
      color: #409ef4;
    }
    .desc{
        text-align: right;
        font-size: 14px;
        color:#999;
    }
   
  }
   .img{
        width: 371px;
        height: 438px;
        margin-left: 105px;
        background-image: url('../assets/image/welcome.png');
       
    }
}
</style>
