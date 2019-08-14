/* 
包含n个接口请求函数的模块, 每个函数的返回值都是promise对象
根据接口文档编写
*/
import jsonp from 'jsonp'
import ajax from './ajax'
import { message } from 'antd';
const BASE = ''
//1.登录
/* export function reqLogin({username, password}) {
  return ajax.post('/login', {username, password})
} */
export const reqLogin = ({ username, password }) => ajax.post(BASE + './login', { username, password }, 'POST')
//2.添加用户
export const reqAddUser = (user) => ajax({
  url: BASE + '/manage/user/add',
  method: 'POST',
  data: user
})
export const reqWeather= (city)=>{
  //接收地址
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
  return new Promise((response,reject)=>{
    //读文档使用jsonp模块
    jsonp(url, {}, (err,data)=>{
      if(!err && data.error === 0){
        //根据接送文件获取想要的值
        const {dayPictureUrl,weather} = data.results[0].weather_data[0]
        //将接受的值以成功的方式传送出去
        response({dayPictureUrl,weather})
      }else{
        message.error('天气数据引入失败')
      }
    })
  })

}
