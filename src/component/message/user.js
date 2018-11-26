import React, { Component } from 'react';
import {Avatar,Button,Divider,Table,Tooltip} from 'antd'
import {connect} from 'react-redux'
class UserMes extends Component{
    columns=[{
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
        align:'center',
        render:(content)=><Tooltip title={content} placement='bottom'><span >{`${content.slice(0,8)}`}</span></Tooltip>
      }, {
            title: '发布时间',
            key: 'writeTime',
            dataIndex:'writeTime',
            align:'center'
          }];
    render(){
        if(this.columns.length===4&&this.props.user.level>=2){
            this.columns.push({
                title: '操作',
                key: 'action',
                align:'center',
                render: (action,record) => <>
                    <Button type='danger' onClick={()=>this.props.deleteMes(record.id)}>
                    删除
                    </Button>
                </>
              })
        }
        let data=this.props.userMes.map((user,index)=>{
            return Object.assign({},user,{key:user.toWho+index})
        });
        return (
            <>
                <Table columns={this.columns} dataSource={data} />
            </>
        )
    }
}
function select(state){
    return {
        user:state.userInfo
    }
}
export default connect(select)(UserMes)

