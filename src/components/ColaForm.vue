<template>
   <el-form 
   :ref="formRef" 
   :model="form" 
   label-width="120px"
   :label-position="right"
   rules=""
   size=""
   disabled=""
   >
    <el-form-item 
    v-for="item in itemList"
    :key="item.prop"
    :label="item.label"
    :prop="item.prop"
    :size="item.size"
    >
    <el-col :span="item._col">
     <el-input 
     v-if="item.type === 'input'"
     v-model="item.value"
     :placeholder="item.placeholder"
     />
     <el-select
     v-else-if="item.type === 'select'"
     v-model="item.value" 
     :placeholder="item.placeholder">
        <el-option
        v-for="option in item.options"
        :key="option.key"
        :label="option.label" 
        :value="option.value"/>
     </el-select>
     <el-switch
     v-else-if="item.type === 'switch'"
     v-model="item.value"
     />
      <el-checkbox-group
      v-else-if="item.type === 'checkbox-group'"
      v-model="item.value">
        <el-checkbox
        v-for="checkbox in item.group"
        :key="checkbox.key"
        :label="checkbox.label" 
        :name="checkbox.name"/>
      </el-checkbox-group>
    <el-radio-group
      v-else-if="item.type === 'radio-group'"
      v-model="item.value">
        <el-radio
        v-for="radio in item.group"
        :key="radio.key"
        :label="radio.label"/>
      </el-radio-group>
      <el-button
      v-else-if="item.type === 'button'"
      :type="item.buttonType" 
      @click="item.handler(formRef)"/>
    </el-col>
    </el-form-item>
  </el-form>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        
    },
});
</script>

<style lang="scss" scoped>

</style>
