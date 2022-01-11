import axios from 'axios'
import { message } from 'antd';
const configBaseUrl = 'http://localhost:8181';
// 创建axios实例
const Service = axios.create({
  timeout: 5000,
  baseURL: configBaseUrl,
})

// 请求拦截器
Service.interceptors.request.use(config => {
  let { headers } = config;
  headers = {...headers, 
            // 'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
  config.headers = headers;
  return config;
})

// 响应拦截器
Service.interceptors.response.use(response => {
  return response.data;
}, error => {
  const msg = error.Message !== undefined ? error.Message : '';
  message.error(`网络请求出错, ${msg}`);
  return Promise.reject(error);
})

export default Service