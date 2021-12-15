import Request from "../utils/request";

export const userLogin = ({userName,password})=>{
    return Request({
        url:'/users/login',
        method:'post',
        data:{userName,password}
    });
};