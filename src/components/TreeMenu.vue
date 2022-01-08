<template>
  <template v-for="menu in userMenu">
    <el-sub-menu
      :key="menu._id"
      v-if="menu.children && menu.children.length > 0 && menu.children[0].menuType == 1"
      :index="menu.path"
    >
      <template #title>
        <i :class="menu.icon"></i>
        <span>{{ menu.menuName }} </span>
      </template>
      <TreeMenu :userMenu="menu.children"></TreeMenu>
    </el-sub-menu>
    <el-menu-item v-else-if="menu.menuType == 1" :index="menu.path" :key="menu._id">
      {{ menu.menuName}}
    </el-menu-item>
  </template>
</template>

<script>
export default {
  name: 'TreeMenu',
  props: {
    userMenu: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup() {},
};
</script>

<style lang="scss" scoped></style>
