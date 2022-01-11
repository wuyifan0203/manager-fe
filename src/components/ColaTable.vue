<template>
  <el-table 
  :data="data"
  :border="config.tableConfig.border"
  @select="select"
  @select-all="selectAll"
  @row-click="rowClick"
  @dblclick="dbClick"
  >
    <el-table-column
    v-for="column in config.columnConfig"
    :type="column.type"
    :fixed="column.fixed ? column.fixed:false"
    :key="column.key"
    :prop="column.prop" 
    :label="column.label"
    :width="column.width ? column.width:''" />
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
  setup(props,context) {
    const select = (selection, row)=>{
      context.emit('select',selection,row);
    };
    const selectAll = (selection)=>{
       context.emit('selectAll',selection);
    };
    const rowClick = (row, column, event)=>{
      context.emit('rowClick',row, column, event);
    };
    const dbClick = (row, column, event)=>{
      context.emit('dbClick',row, column, event);
    };
    return{
      select,
      selectAll,
      rowClick,
      dbClick
    };
      
  },
});
</script>

<style lang="sass" scoped></style>
