<template>
  <el-table :data="data">
    <el-table-column prop="date" label="Date" width="180" />
  </el-table>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ColaTable',
  props:{
      data:{
          type:Array,
          default:()=>[]
      },
      config:{
          type:Object,
          default:()=>{}
      }
  },
  setup() {},
});
</script>

<style lang="sass" scoped></style>
