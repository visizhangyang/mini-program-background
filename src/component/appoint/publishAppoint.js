import React, { Component } from 'react';
import {Avatar,Divider,Table,Tooltip} from 'antd'
class PublishAppoint extends Component{
    columns = [{
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
          }];
    render(){
        let data=this.props.publishAppoint.map((user)=>{
            return Object.assign({},user,{key:user.openid})
        });
        return (
            <>
                <Table columns={this.columns} dataSource={data} />
            </>
        )
    }
}
export default PublishAppoint

