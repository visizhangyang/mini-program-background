import React, { Component } from 'react';
import {Avatar,Button,Divider,Table,Tooltip} from 'antd'
import {connect} from 'react-redux'
class All extends Component{
    constructor(){
        super()
        this.columns=[{
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
            className:"loveContent",
            key: 'content',
            align:'center',
            render:(content)=><Tooltip title={content} placement='bottom'><span >{`${content.slice(0,8)}`}</span></Tooltip>
          }, {
                title: '发布时间',
                key: 'writeTime',
                dataIndex:'writeTime',
                align:'center'
              }];
    }
    
    render(){
        if(this.props.user.level>=2&&this.columns.length===5){
            this.columns.push({
                title: '操作',
                key: 'action',
                align:'center',
                render: (action,record) => <>
                    <Button type='primary' onClick={()=>this.props.publish(record.id)}>
                    发布
                    </Button>
                    <Divider type="vertical" />
                    <Button type='danger' onClick={()=>this.props.deleteLove(record.id)}>
                    删除
                    </Button>
                </>
              })
        }
        let data=this.props.allLove.map((user,index)=>{
            return Object.assign({},user,{key:user.openid+index})
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
export default connect(select)(All)

