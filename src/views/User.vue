<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form :inline="true" ref="userFormRef" :model="formParams">
        <el-form-item label="user ID:" prop="userId">
          <el-input
            size="small"
            v-model="formParams.userId"
            placeholder="please input user id"
          ></el-input>
        </el-form-item>
        <el-form-item label="user name:" prop="userName">
          <el-input
            size="small"
            v-model="formParams.userName"
            placeholder="please input user name"
          ></el-input>
        </el-form-item>
        <el-form-item label="state:" prop="state">
          <el-select
            size="small"
            v-model="formParams.state"
            placeholder="please select working state"
          >
            <el-option
              size="small"
              v-for="opt in optionList"
              :key="opt.key"
              :value="opt.value"
              :label="opt.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="queryUser"
            >query</el-button
          >
          <el-button size="small" @click="resetForm">reset</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" size="small">Query</el-button>
        <el-button type="danger" size="small">Batch delete</el-button>
      </div>
      <el-table :data="userList" size="small">
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="column in userTableConfig.columnConfig"
          :key="column.key"
          :prop="column.prop"
          :label="column.label"
          :width="column.width ? column.width : ''"
        />
        <el-table-column label="operation" width="150">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        small
        background
        v-model:currentPage="paginationParams.pageNum"
        :page-size="paginationParams.pageSize"
        layout="prev, pager, next"
        :total="paginationParams.total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue';

import userTableConfig from '@/components/tableConfig/userTableConfig';
import Api from '@/api';
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

    const paginationParams = reactive({
      total:0,
      pageSize:0,
      pageNum:0
    });

    const userList = ref([]);
    const userFormRef = ref(null);

    onMounted(() => {
      init();
    });

    const init =  () => {
      getUserList();
    };

    const getUserList= async(params={})=>{
      const { list, page } = await Api.getUserList(params);
      userList.value = list;
      paginationParams.total = page.total;
      paginationParams.pageSize = page.pageSize;
      paginationParams.pageNum = page.pageNum;
    };

    const queryUser = () => {
      const params = {...formParams};
      getUserList(params);
    };

    const resetForm = () => {
      userFormRef.value.resetFields();
      getUserList();
    };

    const handleCurrentChange = (currentPage) => {
      paginationParams.pageSize = currentPage;
      const params = {...paginationParams};
      getUserList(params);
    };

    return {
      formParams,
      paginationParams,
      optionList,
      userTableConfig,
      userList,
      userFormRef,
      queryUser,
      resetForm,
      handleCurrentChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-manage {
  .action {
    border-radius: 5px 5px 0px 0px;
    background: #ffffff;
    padding: 20px;
    border-bottom: 1px solid #ece8e8;
  }
  .pagination {
    text-align: right;
    padding: 10px;
  }
}
</style>
