<template>
    <div class="login-wrapper">
        <div class="modal">
            <el-form  :label-position="right" :model="user" status-icon :rules="rules" ref="userform">
                <h2 class="title">MARTH</h2>
                <el-form-item label="Account" prop="userName">
                    <el-input type="text" prefix-icon="el-icon-user" v-model="user.userName"/>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input type="password" prefix-icon="el-icon-view" v-model="user.password"/>
                </el-form-item>
                 <el-form-item>
                    <el-button type="primary" class="btn-login" @click="login">Login</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { reactive, ref } from 'vue';
import Api from '../api';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'Login',
    setup() {
        // const api = inject('$api');
        const userform = ref('');
        const user = reactive({
            userName:'',
            password:''
        });
        const login=()=>{
            // console.log(userform.value);
            userform.value.validate((valid)=>{
                if(valid){
                    console.log(Api);
                    Api.userLogin(user).then(res=>{
                        console.log(res);
                    });
                }else{
                    return false;
                }
            });
        };
        const rules={
            userName:[
                {
                    required:true,message:'please input user name',trigger:'blur'
                }
            ],
            password:[
                {
                    required:true,message:'please input password',trigger:'blur'
                }
            ]
        };
        return{
            login,
            user,
            rules,
            userform
        };

    },
};
</script>
<style lang="scss" scoped>
.login-wrapper{
    display:flex;
    justify-content: center;
    align-items: center;
    background-color: #f9fcff;
    width: 100vw;
    height: 100vh;
    .modal{
        width: 500px;
        padding: 50px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0px 0px 10px 3px #cdd;
        .title{
            font-size: 50px;
            line-height: 1.5;
            text-align: center;
            margin-bottom: 30px;

        }
        .btn-login{
            width: 100%;
        }
    }
}
</style>