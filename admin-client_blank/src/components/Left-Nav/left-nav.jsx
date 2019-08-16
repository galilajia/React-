import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import logo from '../../page/login/images/logo.png'
import './index.less'
import { Menu, Icon } from 'antd'

import menuList from '../../config/menuConfig'
const { SubMenu, Item } = Menu
class LeftNav extends Component {
    //封装列表的方法
    getMenuNodes2 = (menuList) => {
        //返回菜单标签的值
        return menuList.reduce((pre, item) => {
            //获取路径
            const path = this.props.location.pathname
            //判断惨淡是否含有子菜单
            if (!item.children) {
                pre.push(
                    <Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Item>
                )
            } else {
                // 当前item的children中某个item的key与当前请求的path相同, 当前item的key就是openKey
                //查询第一个打开的曹丹或者是子菜单
                const cItem = item.children.find(cItem =>  path.indexOf(cItem.key) === 0)
                console.log(cItem)
                if (cItem) {
                    // 保存openKey
                    this.openKey = item.key
                }
                pre.push(
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {
                            this.getMenuNodes2(item.children)
                        }
                    </SubMenu>
                )
            }
            //没必须返回前一个pre
            return pre
        }, [])
    }
    componentWillMount() {
        //界面渲染之前将菜单放到页面上，高性能
        this.menuNodes = this.getMenuNodes2(menuList)
    }
    render() {
        //重新获取路径
        let path = this.props.location.pathname 
        if(path.indexOf('/product')===0){
            path = '/product'
        }
        console.log('path', path, this.openKey)
        return (
            <div className='left-nav'>
                <Link to='/home' className='left-nav-header'>
                    <img src={logo} alt="logo" />
                    <h1> 硅谷后台</h1>
                </Link>
                <Menu
                    theme="dark"
                    mode="inline"
                    //选中当前的界面
                    selectedKeys={[path]}
                    // defaultSelectedKeys={[this.openKey]}
                    //默认打开菜单选项
                    defaultOpenKeys={[this.openKey]}
                >
                    {/* 将菜单渲染到页面中 */}
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}
export default withRouter(LeftNav)
