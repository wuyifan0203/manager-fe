import Request from "../utils/request";

export const getNoticeCount = ()=>{
    return Request({
        url:'/leave/count',
        method:'get'
    });
};