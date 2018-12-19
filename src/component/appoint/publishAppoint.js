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
        align:'center',
        render:(content)=><Tooltip title={content} placement='bottom'><span >{`${content.slice(0,8)}`}</span></Tooltip>
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
        let data=this.props.allAppoint.filter((appoint)=>appoint.publish===1).map((appoint,index)=>{
            return Object.assign({},appoint,{key:appoint.openid+index})
        });
        return (
            <>
                <Table columns={this.columns} dataSource={data} />
            </>
        )
    }
}
export default PublishAppoint

