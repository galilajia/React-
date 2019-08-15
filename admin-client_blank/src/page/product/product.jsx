import React, { Component } from 'react'
import { Route ,Redirect , Switch} from 'react-router-dom'

import ProductHome from './product-home'
import ProductDetail from './product-detail'
import ProductAddUpdate from './product-add-update'
/**
 * 商品管理
 */
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path = '/product' component={ProductHome}></Route>
        <Route path = '/product/detail/:id' component={ProductDetail}></Route>
        <Route path = '/product/addupdate' component={ProductAddUpdate}></Route>
        <Redirect to='/product' />
      </Switch>
    )
  }
}
