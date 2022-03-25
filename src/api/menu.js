import Request from "../utils/request";

const getMenuList = (params)=>{
    return Request({
        url:'/menu/list',
        method:'get',
        data: params,
        mock:false
    });
};

const menuSubmit = (params)=>{
    return Request({
        url:'/menu/operate',
        method:'post',
        data:params,
        mock:false
    });
};

export default {
    getMenuList,
    menuSubmit,
};