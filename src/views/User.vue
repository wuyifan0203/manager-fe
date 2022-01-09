<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form :inline="true">
        <el-form-item>
          <el-input
            v-model="formParams.userId"
            placeholder="please input user id"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="formParams.userName"
            placeholder="please input user name"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="formParams.state"
            placeholder="please select working state"
          >
            <el-option
              v-for="opt in optionList"
              :key="opt.key"
              :value="opt.value"
              :label="opt.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">query</el-button>
          <el-button>reset</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
export default defineComponent({
  name: 'User',
  setup() {
    const optionList = [
      { key: 'working', value: 0 },
      { key: 'probation', value: 1 },
      { key: 'intern', value: 2 },
      { key: 'departing', value: 3 },
    ];
    const formParams = reactive({
      userId: '',
      userName: '',
      state: '',
    });

    return {
      formParams,
      optionList,
    };
  },
});
</script>

<style lang="sass" scoped></style>
