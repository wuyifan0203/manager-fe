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
    });
};

export default {
    userLogin,
    getUserList
};