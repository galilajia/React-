import React, { Component } from 'react'
import { Card, Select, Input, Button, Icon, Table } from 'antd'
import Product from './product';
import { reqProducts } from "../../api"

import LinkButton from '../../components/Link-button'
import { PAGE_SIZE } from '../../utils/constants';

const Option = Select.Option
export default class ProductHome extends Component {
  state = {
    products: [],
    total: 0
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
        dataIndex: 'status',
        render: status => {
          if (status === 1) {
            return (
              <span>
                <Button type="primary">下架</Button>
                <span>在售</span>
              </span>
            )
          } else {
            return (
              <span>
                <Button type="primary">上架</Button>
                <span>已下架</span>
              </span>
            )
          }
        }
      },

      {
        title: '操作',
        width: 100,
        render: product => (
          <span>
            <LinkButton>详情</LinkButton>
            <LinkButton>修改</LinkButton>
          </span>
        )
      }
    ]
  }
  getProducts = async (pageNum) => {
    const result = await reqProducts(pageNum,PAGE_SIZE)
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
    const { products , total} = this.state
    const title = (
      <span>

        <Select value='1' >
          <Option value='1'>按名称搜索</Option>
          <Option value='2'>按描述搜索</Option>
        </Select>
        <Input type="text" style={{ width: 200, margin: '0 15px' }}></Input>
        <Button type='primary'>搜索</Button>
      </span>
    )
    const extra = (
      <Button type='primary'>
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
