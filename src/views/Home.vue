<template>
  <div class="basic-layout">
    <div class="nav-side"></div>
    <div class="content-right">
      <nav class="nav-top"></nav>
      <main class="wrapper">
        <div class="main-page">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
};
</script>

<style lang="scss" scoped>
.basic-layout {
  position: relative;
  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    overflow-y: auto;
    transition: width 0.5s;
  }
  .content-right {
    margin-left: 200px;
    .nav-top {
      display: flex;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ddd;
      justify-content: space-between;
      padding: 0 20px;
    }
    .wrapper {
      background-color: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);
      .main-page {
        background-color: #fff;
        height: 100%;
      }
    }
  }
}
</style>
