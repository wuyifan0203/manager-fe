import Request from "../utils/request";

const getNoticeCount = ()=>{
    return Request({
        url:'/leave/count',
        method:'get',
        mock:true
    });
};

export default {
    getNoticeCount
};