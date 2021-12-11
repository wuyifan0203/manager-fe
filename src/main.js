import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import request from './utils/request';
import storage from './utils/storage';

import config from './config';

const app=createApp(App);
app.config.globalProperties.$request = request;
app.config.globalProperties.$storage = storage;
app.provide('$request',request);
app.provide('$storage',storage);
app.use(router);
app.use(ElementPlus);
app.mount('#app');

console.log(config);

