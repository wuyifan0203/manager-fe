import Request from "../utils/request";

export const getMenuList = ()=>{
    return Request({
        url:'/menu/list',
        method:'get',
        mock:true
    });
};