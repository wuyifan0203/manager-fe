import Request from "../utils/request";

const getRoleList = () => {
    return Request({
        url: '/roles/operate',
        method: 'get',
        data: {},
    });
};

export default {
    getRoleList
};