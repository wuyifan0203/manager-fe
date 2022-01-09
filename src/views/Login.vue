<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form
        :label-position="right"
        :model="user"
        status-icon
        :rules="rules"
        ref="userform"
      >
        <h2 class="title">MARTH</h2>
        <el-form-item label="Account" prop="userName">
          <el-input
            type="text"
            prefix-icon="el-icon-user"
            v-model="user.userName"
          />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            type="password"
            prefix-icon="el-icon-view"
            v-model="user.password"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login" @click="login"
            >Login</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from 'vue';
import $store from '../store/index';
import $router from '../router/index';
import Api from '../api';
export default {
  name: 'Login',
  setup() {
    const userform = ref('');
    const user = reactive({
      userName: '',
      password: '',
    });
    const login = () => {
      userform.value.validate(async (valid) => {
        if (valid) {
          const res = await Api.userLogin(user);
          $store.commit('setUserInfo',res);
          $router.push('/welcome');
        } else {
          return false;
        }
      });
    };
    const rules = {
      userName: [
        {
          required: true,
          message: 'please input user name',
          trigger: 'blur',
        },
      ],
      password: [
        {
          required: true,
          message: 'please input password',
          trigger: 'blur',
        },
      ],
    };
    return {
      login,
      user,
      rules,
      userform,
    };
  },
};
</script>
<style lang="scss" scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fcff;
  width: 100vw;
  height: 100vh;
  .modal {
    width: 500px;
    padding: 50px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 10px 3px #cdd;
    .title {
      font-size: 50px;
      line-height: 1.5;
      text-align: center;
      margin-bottom: 30px;
    }
    .btn-login {
      width: 100%;
    }
  }
}
</style>
