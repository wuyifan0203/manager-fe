import Request from "../utils/request";

const getDeptList = () => {
    return Request({
        url: '/dept/list',
        method: 'get',
        data: {},
    });
};

export default {
    getDeptList
};