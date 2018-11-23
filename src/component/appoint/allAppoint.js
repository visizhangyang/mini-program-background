import React, { Component } from 'react';
import {Avatar,Button,Divider,Table} from 'antd'
class All extends Component{
    columns=[{
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
            render: (action,record) => <>
                <Button type='primary' onClick={()=>this.props.publish(record.id)}>
                发布
                </Button>
                <Divider type="vertical" />
                <Button type='danger' onClick={()=>this.props.deleteAppoint(record.id)}>
                删除
                </Button>
            </>
          }];
    render(){
        /* if(this.props.user.level>=2&&this.columns.length===7){
            this.columns.push({
                title: '操作',
                key: 'action',
                align:'center',
                render: (action,record) => <>
                    <Button type='primary' onClick={()=>this.props.publish(record.id)}>
                    发布
                    </Button>
                    <Divider type="vertical" />
                    <Button type='danger' onClick={()=>this.props.deleteAppoint(record.id)}>
                    删除
                    </Button>
                </>
              })
        } */
        let data=this.props.all.map((user)=>{
            return Object.assign({},user,{key:user.openid})
        });
        return (
            <>
                <Table columns={this.columns} dataSource={data} />
            </>
        )
    }
}
export default All

