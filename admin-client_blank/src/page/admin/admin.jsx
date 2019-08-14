import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
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
            <div>
                hello{user.username}
            </div>
        )
    }
}
