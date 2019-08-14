import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd';
import LeftNav from '../../components/Left-Nav/left-nav';
import Header from '../../components/Header/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
const {  Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render() {
        const user = memoryUtils.user
        //如果用户没登陆自动跳转登陆界面
        console.log(user)
        if (!user._id) {
            //在render中跳转用 Redirect
            return <Redirect to='/login' />
            //在事件回调函数中跳转用history.replace()
        }

        return (
            <Layout style={{ height: '100%' }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{ margin: 20, background: 'white' }}>
                        <Switch>
                            <Route path="/home" component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Redirect to="/home" />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center', color: '#aaaaaa' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}
