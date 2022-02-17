import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import request from './utils/request';
import storage from './utils/storage';
import * as ElIconModules from '@element-plus/icons';
import store from './store';
// import dialog from './utils/dialog';

import config from './config';

const app=createApp(App);
app.provide('$request',request);
app.provide('$storage',storage);
// app.provide('$dialog',dialog);
app.use(router);
app.use(store);
app.use(ElementPlus, { size: 'small', zIndex: 3000 });
app.mount('#app');
for(let iconName in ElIconModules){
    app.component(iconName,ElIconModules[iconName]);
}

console.log(config);

