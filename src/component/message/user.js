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
    title: '接收者',
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
            <Button type='danger'>
            删除
            </Button>
        </>,
      }];
class UserMes extends Component{
    render(){
        let data=this.props.userMes.map((user,index)=>{
            return Object.assign({},user,{key:user.toWho+index})
        });
        return (
            <>
                <Table columns={columns} dataSource={data} />
            </>
        )
    }
}
export default UserMes

