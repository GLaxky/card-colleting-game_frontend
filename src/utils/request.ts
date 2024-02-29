import router from '@/route';
import axios from 'axios'
import { ElMessage } from 'element-plus'

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data; boundary=----' + new Date().getTime()
axios.defaults.headers.get['Content-Type'] = 'multipart/form-data; boundary=----' + new Date().getTime()
// axios.defaults.withCredentials = true


const myRequest = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // baseURL: 'http://106.14.104.157:8080/',
    // baseURL: 'http://47.103.75.231:8080/',
    baseURL:'/apis',
    timeout: 1000 ,
});

// 添加请求拦截器
myRequest.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token=localStorage.getItem('token')
    if(config.headers)
      config.headers["access-token"]=token||''

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
myRequest.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // console.log(response.data.MsgCode)
    // const router=useRouter()
    if(response.data.msgCode=="TOKEN_WRONG"||response.data.msgCode=="TOKEN_EXPIRED_OR_NOT_EXISTS"){
      router.replace('/')
      ElMessage({
        message: '请先登录噢~',
        type: 'warning',
      })
    }else if(response.data.msgCode==='PERMISSION_DENY'){
      ElMessage({
        message: '权限不足',
        type: 'error',
      })
    }
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default myRequest;
