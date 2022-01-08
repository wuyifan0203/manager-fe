<template>
  <div class="basic-layout">
    <div :class="['nav-side', isCollaps ? 'fold' : 'unfold']">
      <!-- 系统logo -->
      <div class="logo">
        <img src="../assets/logo.png" alt="" class="img" />
        <span :style="{ display: isCollaps ? 'none' : 'block' }">manager</span>
      </div>
      <!-- 菜单栏 -->
      <el-menu
        :default-active="activeMenu"
        class="nav-menu"
        router
        :collapse="isCollaps"
        background-color="#001529"
        text-color="#fff"
      >
      <TreeMenu :userMenu="userMenu.menuList"></TreeMenu>
      </el-menu>
    </div>
    <div :class="['content-right', isCollaps ? 'fold' : 'unfold']">
      <nav class="nav-top">
        <div class="nav-left">
          <div class="menu-fold" @click="showMenu">
            <el-icon><fold /></el-icon>
          </div>
          <div class="bread">bread</div>
        </div>
        <div class="user-info">
          <el-badge :is-dot="Boolean(noticeCount)" class="notice" type="danger">
            <el-icon><bell /></el-icon>
          </el-badge>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="user-link">
              {{ userInfo.userName }}
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email"
                  >Email:{{ userInfo.userEmail }}</el-dropdown-item
                >
                <el-dropdown-item command="exit">exit</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </nav>
      <main class="wrapper">
        <div class="main-page">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import store from '../store';
import router from '../router';
import api from '../api';

import TreeMenu from './TreeMenu.vue';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components:{
    TreeMenu
  },
  setup() {
    onMounted(() => {
      init();
    });
    //data
    const isCollaps = ref(false);
    const userInfo = reactive(store.state.user.userInfo);
    const noticeCount = ref(0);
    const userMenu = reactive({menuList:[]});
    const activeMenu = ref('');
    // methods
    const init = async() => {
      try {
        const count = await api.getNoticeCount();
        const list = await api.getMenuList();
        noticeCount.value=count;
        userMenu.menuList=list;
      } catch (error) {
        console.error(error);
      }
    };
    const showMenu = () => {
      isCollaps.value = !isCollaps.value;
    };
    const handleCommand = (key) => {
      if (key === 'email') {
        return false;
      }
      store.commit('setUserInfo', '');
      userInfo.userName = '';
      userInfo.userEmail = '';
      router.replace('./login');
    };
    return {
      handleCommand,
      userInfo,
      activeMenu,
      showMenu,
      isCollaps,
      noticeCount,
      userMenu
    };
  },
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
    // overflow-y: auto;
    transition: width 0.5s;
    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;
      .img {
        margin: 0 16px;
        width: 32px;
        height: 32px;
      }
    }
    .nav-menu {
      height: calc(100vh - 50px);
      border-right: none;
    }
    &.fold {
      width: 64px;
    }
    &.unfold {
      width: 200px;
    }
  }
  .content-right {
    margin-left: 200px;
    &.fold {
      margin-left: 64px;
    }
    &.unfold {
      margin-left: 200px;
    }
    .nav-top {
      display: flex;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ddd;
      justify-content: space-between;
      padding: 0 20px;
      .nav-left {
        display: flex;
        align-items: center;
        .menu-fold {
          margin-right: 15px;
        }
      }
      .user-info {
        .notice {
          line-height: 10px;
          margin-right: 15px;
        }
        .user-link {
          cursor: pointer;
          color: #409eff;
        }
      }
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
