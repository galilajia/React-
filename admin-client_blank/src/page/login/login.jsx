import React, { Component } from 'react'
//引入antd的form插件 
import { Form, Icon, Input, Button } from 'antd';
//引入自己写的login样式
import './login.less'
//引入图片内容
import logo from './images/logo.png'
//将form表单中的Form.Item标签改成Item(个人爱好)
const Item = Form.Item
class Login extends Component {
    handleSubmit = even => {
        
        //event.stoppropagation()阻止冒泡到父级元素
        //取消默认行为
        even.preventDefault()
        //获取表单中的所有值
        const values = this.props.form.getFieldsValue()
        //获取表单中特定的属性的值
        const username = this.props.form.getFieldValue('username')
        //获取表单中特定的属性的值
        const pwd = this.props.form.getFieldValue('password')
        console.log(values, username, pwd)
    
        alert('发送登陆的ajax请求')
      }
    render() {
        //获取getFieldDecorator属性用于和表单进行双向绑定
        const {getFieldDecorator} = this.props.form 
        console.log(this)       
        return (
          // 设置界面基本内容
            <div className = 'login'>
                <div className = 'login-header'>
                     <img src={logo} alt="logo"/>
                     <h1>后台管理系统</h1>
                </div>
                <div className="login-content">
          <h1>用户登陆</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
                {/* 语法见antd官网 */}
              {
                getFieldDecorator('username', { rules: [{min: 4, message: '至少输入4个字符'}]
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
                getFieldDecorator('password', {rules: [{min: 6, message: '密码最少6位'}]

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