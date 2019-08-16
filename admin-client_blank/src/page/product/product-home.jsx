import React, { Component } from 'react'
import { Card, Select, Input, Button, Icon, Table, message } from 'antd'
// import Product from './product';
import { reqProducts, reqSearchProducts, reqUpdateProductsStatus } from "../../api"

import LinkButton from '../../components/Link-button'
import { PAGE_SIZE } from '../../utils/constants';
// import Search from 'antd/lib/transfer/search';
import memoryUtils from '../../utils/memoryUtils'


const Option = Select.Option
export default class ProductHome extends Component {
  state = {
    products: [],
    total: 0,
    searchName: '',
    searchType: 'productName'
  }
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: price => `¥${price}`
      },
      {
        title: '状态',
        width: 100,
        // dataIndex: 'status',
        render: product => {
          let btnText = '下架'
          let text = '在售'
          if (product.status === 2) {
            btnText = '上架'
            text = '已下架'
          }
          const status = product.status === 1 ? 2 : 1
          const productId = product._id
          return (
            <span>
              <Button type="primary" onClick={() => this.upProductStatus(productId, status)}>{btnText}</Button>
              <span>{text}</span>
            </span>
          )
        }
      },

      {
        title: '操作',
        width: 100,
        render: product => (
          <span>
            <LinkButton
              onClick={() => {
                memoryUtils.product = product // 将product保存到内存
                this.props.history.push(`/product/detail/${product._id}`, product)
              }}
            >详情</LinkButton>
            <LinkButton
            onClick={() => {
              this.props.history.push(`/product/addupdate`, product)
            }}
            >修改</LinkButton>
          </span>
        )
      }
    ]
  }
  upProductStatus = async (productId, status) => {
    const result = await reqUpdateProductsStatus(productId, status)
    if (result.status === 0) {
      message.success('商品更新成功')
      this.getProducts(this.pageNum)
    }
  }
  getProducts = async (pageNum) => {
    this.pageNum = pageNum
    const { searchType, searchName } = this.state
    let result
    //有值是搜索分页
    if (searchName) {
      result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
    } else {//一般分页
      result = await reqProducts(pageNum, PAGE_SIZE)
    }
    if (result.status === 0) {
      const { total, list } = result.data
      this.setState({
        total,
        products: list
      })
    }
  }
  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.getProducts(1)
  }
  render() {
    const { products, total, searchType, searchName } = this.state
    const title = (
      <span>

        <Select value={searchType} style={{ width: 150 }} onChange={
          value => this.setState({ searchType: value })}>
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input type="text" style={{ width: 200, margin: '0 15px' }} placeholder="关键字"
          value={searchName}
          onChange={
            event => this.setState({ searchName: event.target.value })}
        />
        <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
      </span>
    )
    const extra = (
      <Button type='primary' onClick={() => this.props.history.push('/product/addupdate')}>
        <Icon type="plus"></Icon>
        添加商品
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          dataSource={products}
          columns={this.columns}
          rowKey="_id"
          pagination={{
            current: this.pageNum,
            pageSize: PAGE_SIZE,
            total,
            //  onChange: (page) => {this.getProducts(page)} 
            onChange: this.getProducts
          }}
        />

      </Card>
    )
  }

}
