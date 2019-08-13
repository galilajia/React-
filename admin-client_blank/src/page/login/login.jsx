import React, { Component } from 'react'
//引入antd的form插件 
import { Form, Icon, Input, Button,message } from 'antd';
//引入自己写的login样式
import './login.less'
//引入图片内容
import logo from './images/logo.png'
import { saveUser } from "../../utils/storageUtils"
import {reqLogin} from '../../api/index'
import {Redirect} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
//将form表单中的Form.Item标签改成Item(个人爱好)
const Item = Form.Item
class Login extends Component {
  handleSubmit = even => {
    //event.stoppropagation()阻止冒泡到父级元素
    //取消默认行为
    even.preventDefault()
    //获取表单中的所有值
    // const values = this.props.form.getFieldsValue()
    // //获取表单中特定的属性的值
    // const username = this.props.form.getFieldValue('username')
    // //获取表单中特定的属性的值
    // const pwd = this.props.form.getFieldValue('password')
    // console.log(values, username, pwd)

    //统一表单验证,验证输入框中内容是否符合
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log("_____-")
        // 校验成功
        // const {username, password} = values
        // console.log('提交登陆请求', username, password)
        // const login =(username, password) => {
          // console.log('发送登陆的ajax请求', username, password)
          const result = await reqLogin(values)
          // console.log('login()', result)
          if(result.status === 0){
            //1.收集数据
           const user = result.data
            //2.保存数据
            saveUser(user)
            memoryUtils.user = user
            //3.跳转页面
            this.props.history.replace('/admin')
          }else {
            message.error('错误信息')
          }
        }
      } 
    )

    // alert('发送登陆的ajax请求')
      
  }
  //自定义设置规则
  validator = (rule, value, callback) => {
    // console.log(rule, value)
    const length = value && value.length
    const pwdReg = /^[a-zA-Z0-9_]+$/
    if (!value) {
      // callback如果不传参代表校验成功，如果传参代表校验失败，并且会提示错误
      callback('必须输入密码')
    } else if (length < 4) {
      callback('密码必须大于4位')
    } else if (length > 12) {
      callback('密码必须小于12位')
    } else if (!pwdReg.test(value)) {
      callback('密码必须是英文、数组或下划线组成')
    } else {
      callback() // 必须调用callback
    }
  }
  
  render() {
    if (memoryUtils.user._id) {
       return <Redirect to = '/admin'/>
    }
    //获取getFieldDecorator属性用于和表单进行双向绑定
    const { getFieldDecorator } = this.props.form
    // console.log(this)
    return (
      // 设置界面基本内容
      <div className='login'>
        <div className='login-header'>
          <img src={logo} alt="logo" />
          <h1>后台管理系统</h1>
        </div>
        <div className="login-content">
          <h1>用户登陆</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {/* 语法见antd官网 */}
              {
                getFieldDecorator('username', {
                  initialValue: 'admin',
                  rules: [
                    { required: true, whitespace: true, message: '必须输入用户名' },
                    { min: 4, message: '至少输入4个字符' },
                    { max: 12, message: '至少输入4个字符' },
                    { prefix: /^[a-zA-Z0-9]+$/, message: '用户名必须是英文、数组或下划线组成' },
                  ]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
                )
              }

            </Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  initialValue: '',
                  rules: [
                    {validator: this.validator },

                  ]

                })(
                  <Input
                    // 给输入框设置内容
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登  陆
</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
//经过 Form.create 包装的组件将会自带 this.props.form 属性
const WrappedLoginForm = Form.create()(Login)
//将文件暴露出去
export default WrappedLoginForm