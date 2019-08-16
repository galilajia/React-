import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { withRouter } from 'react-router-dom'
//引入所有菜单选项,为的是动态添加菜单
import menuConfig from '../../config/menuConfig'
//获取想要的时间格式(不转换是格林尼治)
import { formateDate } from '../../utils/dateUtils'
//添加获取天气接口信息
import { reqWeather } from '../../api'
//自定义链接式的按钮
import LinkButton from '../Link-button'
import { Modal } from 'antd'
//引入删除本地浏览器缓存方法
import { removeUser } from "../../utils/storageUtils";
// import memoryUtils from "../../utils/memoryUtils";

import './index.less'
class Header extends Component {
    //初始化数据
    state = {
        currentTime: formateDate(Date.now()),
        dayPictureUrl: '',
        weather: ''
    }
    //编写时间更新函数
    updateTime = () => {
        this.interval = setInterval(() => {
            //接受转换后的时间
            const currentTime = formateDate(Date.now())
            //更新状态
            this.setState({
                currentTime
            })
        }, 1000)
    }
    //获取天气
    getWeather = async () => {
        //调用reqWeather方法获取想要城市的天气
        const { dayPictureUrl, weather } = await reqWeather('北京')
        this.setState({
            dayPictureUrl,
            weather
        })
    }

    getTitle = () => {
        let title = ''
        //获取路径
        const path = this.props.location.pathname
        // console.log(menuConfig)
        //遍历菜单文件，然后根据路径来获取title
        //因为有的菜单有二级菜单所以要用forEach()
        menuConfig.forEach(item => {
            if (item.key === path) {
                title = item.title
                // 如果有二级菜单
            } else if (item.children) {
                //因为最多有二级菜单所以可以用find
                const cItem = item.children.find(cItem => path.indexOf( cItem.key) === 0 )
                if (cItem) {
                    title = cItem.title
                }
            }

        })
        return title
    }
    //点击退出登录事件
    logout = () => {
        //引用antd 组件
        Modal.confirm({
            title: '你确定退出嘛?',
            content: 'Some descriptions',
            onOk: () => {
                //点击是把浏览器缓存删除
                removeUser()
                //将local缓存的用户设置为空对象
                memoryUtils.user = {}
                //退出登录后跳转到登录界面
                this.props.history.replace('/login')
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    //将要卸载前关闭定时器  Unmount卸载
    componentWillUnmount() {
        clearInterval(this.interval)
    }
        //挂载结束后代调用函数   Mount挂载
    componentDidMount() {
        this.updateTime()
        this.getWeather()
    }
    render() {
        //获取更新状态后的值
        const { currentTime, dayPictureUrl, weather } = this.state
        const user = memoryUtils.user
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className='header-top'>
                    <span> 欢迎，{user.username}</span>&nbsp;&nbsp;&nbsp;&nbsp;

                    <LinkButton onClick={this.logout} >退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        {dayPictureUrl ? <img src={dayPictureUrl} alt="weather" /> : null}
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)
