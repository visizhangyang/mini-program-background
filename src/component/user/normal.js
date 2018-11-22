import React, { Component } from 'react';
import {Avatar,Button,Divider,Table,Modal} from 'antd'
const confirm = Modal.confirm;
function showConfirm() {
    confirm({
      title: '确认删除此用户吗',
      content: '你将要删除选择的用户，请谨慎操作',
      okText:"确认",
      cancelText:"取消",
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
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
  }, {
    title: '国家',
    dataIndex: 'country',
    key: 'country',
    align:'center'
  }, {
    title: '省份',
    key: 'province',
    dataIndex: 'province',
    align:'center'
  }, {
    title: '城市',
    key: 'city',
    dataIndex:'city',
    align:'center'
  },{
      title: 'openid',
      key: 'openid',
      dataIndex:'openid',
      align:'center'
    },{
        title: '操作',
        key: 'action',
        align:'center',
        render: () => (
          <Button type='danger' onClick={showConfirm}>
            删除
          </Button>
        ),
      }];
class Normal extends Component{
    render(){
        let data=this.props.userData.map((user)=>{
            return Object.assign({},user,{key:user.openid})
        });
        return (
            <>
                <Table columns={columns} dataSource={data} />
            </>
        )
    }
}
export default Normal
