import axios from 'axios';
import { ElMessage } from 'element-plus';
import config from '../config';
import router from '../router';
import storage from './storage';

const TOKEN_INVALID = 'token 已过期，请重新登录。';
const NETWORK_ERROR = '网络故障，请稍后再试.';

// 生成axios实例对象
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000,
});

//请求拦截
service.interceptors.request.use((req) => {
  // TODO
  const headers = req.headers;
  const { token } = storage.getItem('userInfo') || {};
  if (!headers.Authorization) {
    headers.Authorization = 'Bearer ' +  token;
  }
  return req;
});

// 相应拦截
service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data;
  if (code === 200) {
    //   ElMessage.success(msg)
    return data;
  } else if (code === 500001) {
    ElMessage.error(TOKEN_INVALID);
    setTimeout(() => {
      router.push('/login');
    }, 1500);
    return Promise.reject(TOKEN_INVALID);
  } else {
    ElMessage.error(msg || NETWORK_ERROR);
    return Promise.reject(msg || NETWORK_ERROR);
  }
});

function request (options) {
  options.method = options.method || 'get';
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data;
  }
  let isMock = config.mock;
  if (typeof options.mock != 'undefined') {
    isMock = options.mock;
  }

  if (config.env === 'prod') {
    service.defaults.baseURL = config.baseApi;
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
  }
  return service(options);
}

const methods = ['get', 'post', 'update', 'delete'];
methods.forEach(method => {
  request[method] = (url, data, options) => {
    return request({
      url,
      method,
      data,
      ...options
    });
  };

});
export default request;
