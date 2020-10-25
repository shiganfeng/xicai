import axios from 'axios'
import { Message } from 'element-ui'

//创建axios，赋给变量service
const BASEURL = process.env.VUE_APP_BASEURL
const service = axios.create({
    baseURL: BASEURL, //http://localhost:8081/devApi/ === http://www.web-jshtml.cn/dependenciesapi
    timeout: 15000, //尽可能调长一点
})

// 添加请求拦截器
service.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    //后台需要前端这边传相关的参数
    // config.headers['Tokey'] = '111'
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    let data = response.data
    console.log(response.data)
    if (response.data.code != 0) {
        // Message({
        //     message: "Fail",
        //     type: 'error',
        //     duration: 2000
        // })
        return Promise.reject(data)
    } else {
        // Message({
        //     message: "Success",
        //     type: 'success',
        //     duration: 2000
        // })
        console.log(response)
        return response;
    }

}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default service

//使用export default时，文件import不需要{}，但不能使用多个default