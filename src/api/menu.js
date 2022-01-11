import Request from "../utils/request";

const getMenuList = ()=>{
    return Request({
        url:'/menu/list',
        method:'get',
        mock:true
    });
};

export default {
    getMenuList
};