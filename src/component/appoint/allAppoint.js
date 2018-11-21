import React, { Component } from 'react';
import {Avatar,Button,Divider,Table} from 'antd'
const columns = [{
    title: '昵称',
    dataIndex: 'nickName',
    key: 'nickName',
    align:'center',
    render:(nickName,record)=><><Avatar src={record.avatarUrl}/>
    <Divider type="vertical" />
    <span>{nickName}</span></>
  }, {
    title: '主题',
    dataIndex: 'theme',
    key: 'theme',
    align:'center',
  }, {
    title: '期待的人',
    dataIndex: 'want',
    key: 'want',
    align:'center'
  }, {
    title: '详情',
    key: 'detail',
    dataIndex: 'detail',
    align:'center'
  }, {
    title: '时间',
    key: 'appointTime',
    dataIndex:'appointTime',
    align:'center'
  },{
      title: '地点',
      key: 'appointLocation',
      dataIndex:'appointLocation',
      align:'center'
    },{
        title: '发布时间',
        key: 'writeTime',
        dataIndex:'writeTime',
        align:'center'
      },{
        title: '操作',
        key: 'action',
        align:'center',
        render: () => <>
            <Button type='primary'>
            发布
            </Button>
            <Divider type="vertical" />
            <Button type='danger'>
            删除
            </Button>
        </>,
      }];
class All extends Component{
    render(){
        let data=this.props.all.map((user)=>{
            return Object.assign({},user,{key:user.openid})
        });
        return (
            <>
                <Table columns={columns} dataSource={data} />
            </>
        )
    }
}
export default All

