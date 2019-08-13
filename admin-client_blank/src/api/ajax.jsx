import axios from 'axios'
import qs from 'qs'
import { message } from 'antd';
//添加一个请求拦截器
axios.interceptors.request.use(config => {
    console.log(config)
    const { method, data } = config
    //判断是否携带POST请求
    if (method.toUpperCase()=== 'POST' && data instanceof Object) {
        config.data = qs.stringify(data)
    }
    return config
})
//添加一个响应拦截器
axios.interceptors.response.use(response => {
    //返回一个response.data，这样请求成功时的数据就是data
    return response.data
}, error => {
    message.error('请求异常，status：' + error.code)
    return new Promise(() => { })
}
)
export default axios