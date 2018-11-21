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
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    align:'center',
    render:(gender)=><span>{parseInt(gender)===0?'女':'男'}</span>
  },{
    title: '向谁表白',
    dataIndex: 'toWho',
    key: 'toWho',
    align:'center',
  }, {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    align:'center'
  }, {
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

