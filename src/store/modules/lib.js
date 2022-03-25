import Api from '@/api';
import {filterNormalMenu} from '@/utils/common';
const state = {
    menuList: []
};

const mutations = {
    GET_MENU_LIST(state, menuList) {
        state.menuList = menuList;
    }
};

const actions = {
    async getMenuList(context,queryParams={}) {
        try {
            const menuList = await Api.getMenuList(queryParams);
            const filterMenu = filterNormalMenu(menuList,[]);
            context.commit('GET_MENU_LIST',filterMenu);
        } catch (error) {
            console.error('getMenuList', error);
        }

    }
};

export default {
    state,
    mutations,
    actions
};