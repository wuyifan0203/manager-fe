import Request from "../utils/request";

const userLogin = ({ userName, password }) => {
    return Request({
        url: '/users/login',
        method: 'post',
        data: { userName, password },
        mock: false
    });
};

const getUserList = (params) =>{
    return Request({
        url: '/users/list',
        method: 'get',
        data: params,
        mock:false
    });
};

const deleteUser = (params) =>{
    return Request({
        url: '/users/delete',
        method: 'post',
        data: params,
        mock:false
    });
};

const insetUser =  (params) =>{
    return Request({
        url: '/users/operate',
        method: 'post',
        data: params,
        mock:false
    });
};

export default {
    userLogin,
    getUserList,
    deleteUser,
    insetUser
};