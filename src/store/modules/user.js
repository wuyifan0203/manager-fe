import storage from "../utils/storage";

const state = {
    userInfo:'' || storage.getItem('userInfo')
};

const mutations = {
    SET_UserInfo(state,userInfo){
        state.userInfo=userInfo;
        storage.setItem('userInfo',userInfo);
    }
};

export default {
    state,
    mutations
};