<template>
  <div class="menu-manage">
    <div class="query-form">
      <el-form :inline="true" ref="menuFormRef" :model="queryParams">
        <el-form-item label="menu name:" prop="menuName">
          <el-input
            size="small"
            v-model="queryParams.menuName"
            placeholder="please input user id"
          ></el-input>
        </el-form-item>
        <el-form-item label="menu state:" prop="menuState">
          <el-select
            size="small"
            v-model="queryParams.menuState"
            placeholder="please select menu state"
          >
            <el-option :value="1" label="normal"></el-option>
            <el-option :value="0" label="disable"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryMenu">query</el-button>
          <el-button @click="resetForm(menuFormRef)">reset</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleCreate">create</el-button>
      </div>
      <el-table
        :data="menuList"
        size="small"
        row-key="_id"
        height="600"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column
          v-for="column in menuTableConfig.columnConfig"
          :key="column.key"
          :prop="column.prop"
          :label="column.label"
          :width="column.width ? column.width : ''"
          :formatter="column.formatter"
        />
        <el-table-column label="operation" width="225">
          <template #default="scope">
            <el-button type="primary" size="mini" @click="handleInsert(scope.row)">
              insert
            </el-button>
            <el-button size="mini" @click="handleEdit(scope.row)">
              Edit
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row._id)"
            >
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form
        ref="dialogRef"
        :model="dialogForm"
        :rules="dialogRules"
        label-width="100"
      >
        <el-form-item label="parent menu" prop="parentId">
          <el-cascader
            v-model="dialogForm.parentId"
            :options="menuList"
            :props="{ checkStrictly: true, value: '_id', label: 'menuName' }"
            clearable
          ></el-cascader>
          <span>If you don't select ,a level-1 menu will be created</span>
        </el-form-item>
        <el-form-item label="menu type" prop="menuType">
          <el-radio-group v-model="dialogForm.menuType">
            <el-radio :label="1">menu</el-radio>
            <el-radio :label="2">button</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="menu name" prop="menuName" >
          <el-input
            v-model="dialogForm.menuName"
            placeholder="please input menu name"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="menu icon" prop="icon" v-show="dialogForm.menuType === 1">
          <el-input
            v-model="dialogForm.icon"
            placeholder="please input menu icon"
          ></el-input>
        </el-form-item>
        <el-form-item label="router path" prop="path" v-show="dialogForm.menuType === 1">
          <el-input
            v-model="dialogForm.path"
            placeholder="please input path"
          ></el-input>
        </el-form-item>
        <el-form-item label="menu code" prop="menuCode" v-show="dialogForm.menuType === 2">
          <el-input
            v-model="dialogForm.menuCode"
            placeholder="please input menu code"
          ></el-input>
        </el-form-item>
        <el-form-item label="component path" prop="component" v-show="dialogForm.menuType === 1">
          <el-input
            v-model="dialogForm.component"
            placeholder="please input component path"
          ></el-input>
        </el-form-item>
        <el-form-item label="menu state" prop="menuState">
          <el-radio-group v-model="dialogForm.menuState">
            <el-radio :label="1">normal</el-radio>
            <el-radio :label="0">disable</el-radio>
          </el-radio-group>
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
import { computed, defineComponent, nextTick, onMounted, reactive, ref } from "vue";
import menuTableConfig from "@/components/tableConfig/menuTableConfig";
import Api from "@/api";
import { ElMessage } from "element-plus";
import {useStore} from 'vuex';
export default defineComponent({
  name: "Menu",
  setup() {
    onMounted(() => {
      getMenuList();
    });
    //data
    const store = useStore();
    const menuFormRef = ref(null);
    const menuList = ref([]);
    const queryParams = reactive({
      menuState: null,
      menuName: "",
    });
    //dialog
    const dialogRef = ref(null);
    const dialogVisible = ref(false);
    const dialogForm = reactive({
      parentId: [null],
      menuType: 1,
      menuName: "",
      icon: "",
      path: "",
      menuCode: "",
      component: "",
      menuState: 1,
    });
    const dialogRules = reactive([
      {
        menuName: [
          {
            request: true,
            message: "please input user name!",
            trigger: "blur",
          },
          {
            min: 2,
            max: 10,
            message: "length is between 2 and 10!",
            trigger: "blur",
          },
        ],
      },
    ]);
    const action = ref("add");

    const dialogTitle = computed(() => "menu " + action.value);

    //methods
    const queryMenu = () => {
      getMenuList(queryParams);
    };
    const resetForm = (formRef) => {
      formRef.resetFields();
    };
    const handleCreate = () => {
      dialogVisible.value = true;
    };
    const handleInsert = (row) => {
      dialogVisible.value = true;
      action.value = 'add';
      dialogForm.parentId = [...row.parentId,row._id].filter(id=>id);
    };
    const handleEdit = (row) => {
      dialogVisible.value = true;
      action.value = 'edit';
      nextTick(()=>{
        Object.assign(dialogForm,row);
      });
      getMenuList();
      store.dispatch('getMenuList');
    };
    const handleDelete = async (id) => {
      await Api.menuSubmit({
        _id:id,
        action:'delete'
      });
      ElMessage.success('delete success!');
      getMenuList();
      store.dispatch('getMenuList');
    };
    //dialog
    const handleSubmit = () => {
      dialogRef.value.validate(async (valid) => {
        if (valid) {
          const params = {
            ...dialogForm,
            action: action.value,
          };
          await Api.menuSubmit(params);
          dialogVisible.value = false;
          ElMessage.success("operate success!");
          resetForm(dialogRef.value);
          getMenuList();
          store.dispatch('getMenuList');
        }
      });
    };

    const handleCancel = () => {
      dialogVisible.value = false;
      resetForm(dialogRef.value);
    };
    //api
    const getMenuList = async () => {
      try {
        menuList.value = await Api.getMenuList(queryParams);
      } catch (error) {
        throw new Error(error);
      }
    };

    return {
      queryParams,
      menuFormRef,
      menuList,
      menuTableConfig,
      queryMenu,
      resetForm,
      handleCreate,
      handleInsert,
      handleEdit,
      handleDelete,
      handleCancel,
      dialogRef,
      dialogVisible,
      dialogTitle,
      dialogForm,
      dialogRules,
      handleSubmit,
    };
  },
});
</script>


<style lang="scss" scoped>
.action {
  border-radius: 5px 5px 0px 0px;
  background: #ffffff;
  padding: 20px;
  border-bottom: 1px solid #ece8e8;
}
</style>