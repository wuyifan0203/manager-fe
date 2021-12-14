<template>
    <div class="login-wrapper">
        <div class="modal">
            <el-form  :label-position="right">
                <h2 class="title">MARTH</h2>
                <el-form-item label="Account">
                    <el-input type="text" prefix-icon="el-icon-user"/>
                </el-form-item>
                <el-form-item label="Password">
                    <el-input type="password" prefix-icon="el-icon-view"/>
                </el-form-item>
                 <el-form-item>
                    <el-button type="primary" class="btn-login">Login</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'Login',
    setup() {
        
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