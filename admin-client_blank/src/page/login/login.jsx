import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';

import './login.less'
import logo from './images/logo.png'

const Item = Form.Item
 class Login extends Component {
    handleSubmit = e => {
    
        e.preventDefault()
    
        const values = this.props.form.getFieldsValue()
        const username = this.props.form.getFieldValue('username')
        const pwd = this.props.form.getFieldValue('password')
        console.log(values, username, pwd)
    
        alert('发送登陆的ajax请求')
      }
    render() {
        //获取
        const {getFieldDecorator} = this.props.form 
        console.log(this)       
        return (
            <div className = 'login'>
                <div className = 'login-header'>
                     <img src={logo} alt="logo"/>
                     <h1>后台管理系统</h1>
                </div>
                <div className="login-content">
          <h1>用户登陆</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>

              {
                getFieldDecorator('username', { 
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

                })(
                  <Input
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

const WrappedLoginForm = Form.create()(Login)  

export default WrappedLoginForm