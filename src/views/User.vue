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
          <el-button type="primary" @click="queryUser">query</el-button>
          <el-button @click="resetForm">reset</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleInsert">Insert</el-button>
        <el-button type="danger" @click="BatchDelete">Batch delete</el-button>
      </div>
      <el-table :data="userList" size="small" @selection-change="selectChange">
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="column in userTableConfig.columnConfig"
          :key="column.key"
          :prop="column.prop"
          :label="column.label"
          :width="column.width ? column.width : ''"
          :formatter="column.formatter"
        />
        <el-table-column label="operation" width="150">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">
              Edit
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        small
        background
        :page-size="paginationParams.pageSize"
        layout="prev, pager, next"
        :total="paginationParams.total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <el-dialog v-model="dialogVisible" title="User insert">
      <el-form
        ref="dialogRef"
        :model="dialogForm"
        :rules="userFormRules"
        label-width="100"
      >
        <el-form-item label="user name" prop="userName">
          <el-input
            v-model="dialogForm.userName"
            :disabled="action === 'edit'"
            placeholder="please input user name"
          ></el-input>
        </el-form-item>
        <el-form-item label="user Email" prop="userEmail">
          <el-input
            v-model="dialogForm.userEmail"
            :disabled="action === 'edit'"
            placeholder="please input user Email"
          >
            <template #append>.com</template>
          </el-input>
        </el-form-item>
        <el-form-item label="phone number" prop="mobile">
          <el-input
            v-model="dialogForm.mobile"
            placeholder="please input phone number"
          >
            <template #prepend>+86</template>
          </el-input>
        </el-form-item>
        <el-form-item label="job" prop="job">
          <el-input
            v-model="dialogForm.job"
            placeholder="please input job"
          ></el-input>
        </el-form-item>
        <el-form-item label="state" prop="state">
          <el-select
            v-model="dialogForm.state"
            placeholder="please select state"
          >
            <el-option
              v-for="item in state"
              :key="item.key"
              :value="item.value"
              :label="item.key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="role" prop="roleList">
          <el-select
            v-model="dialogForm.roleList"
            placeholder="please select a role"
            multiple
            style="width: 100%"
          >
            <el-option
              v-for="item in roleList"
              :key="item._id"
              :value="item._id"
              :label="item.roleName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="department" prop="deptId">
          <el-cascader
            v-model="dialogForm.deptId"
            placeholder="Please select a department"
            :options="deptList"
            :props="{
              checkStrictly: true,
              value: '_id',
              label: 'deptName',
            }"
            clearable
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">Cancel</el-button>
          <el-button type="primary" @click="handleSubmit">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRaw,
} from "vue";

import userTableConfig from "@/components/tableConfig/userTableConfig";
import { ElMessage } from "element-plus";
import Api from "@/api";
export default defineComponent({
  name: "User",
  setup() {
    const optionList = [
      { key: "all", value: 0 },
      { key: "working", value: 1 },
      { key: "probation", value: 2 },
      { key: "intern", value: 3 },
      { key: "departing", value: 4 },
    ];

    const formParams = reactive({
      userId: "",
      userName: "",
      state: "",
    });

    const paginationParams = reactive({
      total: 0,
      pageSize: 0,
      pageNum: 0,
    });

    const userList = ref([]);
    const userFormRef = ref(null);
    const selectedUser = ref([]);
    const action = ref("add");

    onMounted(() => {
      init();
      getDeptList();
      getRoleList();
    });

    const init = () => {
      getUserList();
    };

    const getUserList = async (params = {}) => {
      const { list, page } = await Api.getUserList(params);
      userList.value = list;
      paginationParams.total = page.total;
      paginationParams.pageSize = page.pageSize;
      paginationParams.pageNum = page.pageNum;
    };

    const queryUser = () => {
      const params = { ...formParams };
      getUserList(params);
    };

    const resetForm = () => {
      userFormRef.value.resetFields();
      getUserList();
    };

    const handleCurrentChange = (currentPage) => {
      paginationParams.pageSize = currentPage;
      const params = { ...paginationParams };
      getUserList(params);
    };

    const handleInsert = () => {
      action.value = "add";
      dialogVisible.value = true;
    };

    const handleEdit = (row) => {
      dialogVisible.value = true;
      action.value = "edit";
      nextTick(() => {
        console.log(row);
        Object.assign(dialogForm, row);
      });
    };

    const deleteUser = async (userIds) => {
      const res = await Api.deleteUser({
        userIds: userIds,
      });
      if (res.nModified > 0) {
        ElMessage.success("Delete success !");
        getUserList();
      }
    };

    const selectChange = (selection) => {
      selectedUser.value = selection;
    };

    const handleDelete = (row) => {
      deleteUser([row.userId]);
    };

    const BatchDelete = () => {
      if (selectedUser.value.length === 0) {
        ElMessage.error("Please select users to delete");
        return;
      }
      deleteUser(selectedUser.value.map((e) => e.userId));
    };

    //dialog
    //是否可见
    const dialogVisible = ref(false);
    //表单规则
    const userFormRules = reactive({
      userName: [
        {
          request: true,
          message: "please input user name!",
          trigger: "blur",
        },
      ],
      userEmail: [
        {
          request: true,
          message: "please input user Email!",
          trigger: "blur",
        },
      ],
      depId: [
        {
          request: true,
          message: "please select user department!",
          trigger: "blur",
        },
      ],
      mobile: [
        {
          request: true,
          pattern:
            /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/,
          message: "please input right mobile!",
          trigger: "blur",
        },
      ],
    });
    //用户状态
    const state = [
      { key: "working", value: 1 },
      { key: "probation", value: 2 },
      { key: "intern", value: 3 },
      { key: "departing", value: 4 },
    ];
    //表单内容
    const dialogForm = reactive({
      userName: "123",
      userEmail: "12@qq",
      mobile: "13995268299",
      job: "321",
      state: null,
      role: "",
      deptId: "",
    });

    const roleList = ref([]);
    const deptList = ref([]);
    const dialogRef = ref(null);

    const getDeptList = async () => {
      deptList.value = await Api.getDeptList();
    };

    const getRoleList = async () => {
      roleList.value = await Api.getRoleList();
    };

    const handleCancel = () => {
      dialogVisible.value = false;
      dialogRef.value.resetFields();
    };
    const handleSubmit = () => {
      dialogRef.value.validate(async (valid) => {
        if (valid) {
          let params = toRaw(dialogForm);
          params.userEmail += ".com";
          params.action = action.value;
          await Api.insetUser(params);
          dialogVisible.value = false;
          ElMessage.success(`user ${action.value} success!`);
          getUserList();
          dialogRef.value.resetFields();
        }
      });
    };

    return {
      formParams,
      paginationParams,
      optionList,
      userTableConfig,
      userList,
      roleList,
      deptList,
      userFormRef,
      action,
      handleEdit,
      queryUser,
      resetForm,
      selectChange,
      handleCurrentChange,
      handleDelete,
      BatchDelete,
      handleInsert,
      dialogRef,
      dialogVisible,
      userFormRules,
      dialogForm,
      state,
      handleCancel,
      handleSubmit,
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
