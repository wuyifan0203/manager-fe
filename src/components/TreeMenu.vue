<template>
  <el-sub-menu index="1">
    <template #title>
      <el-icon><setting /></el-icon>
      <span>系统管理 </span>
    </template>
    <el-menu-item index="1-1">用户管理</el-menu-item>
    <el-menu-item index="1-2">菜单管理</el-menu-item>
  </el-sub-menu>
</template>

<script>
export default {
  name: 'TreeMenu',
  props: {
    userMenu: {
      type: Array,
      default() {
        return []
      },
    },
  },
  setup() {},
}
</script>

<style lang="scss" scoped></style>
