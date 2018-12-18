import React, { Component } from 'react';
import {Avatar,Button,Divider,Table,Tooltip,Drawer} from 'antd'
import LoveDrawer from './drawer'
import instance from '../../axiosConf'
class Publish extends Component{
    state={
        showDrawer:false,
        data:{},
        dataGet:false
    }
    columns = [{
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
          },{
            title: '浏览数',
            key: 'watchCount',
            dataIndex:'watchCount',
            align:'center'
          },{
            title: '评论数',
            key: 'commentCount',
            dataIndex:'commentCount',
            align:'center'
          },{
            title: '点赞数',
            key: 'thumpCount',
            dataIndex:'thumpCount',
            align:'center'
          },{
            title: '操作',
            key: 'action',
            align:'center',
            render: (action,record) => <>
                <Button type='primary' onClick={()=>this.getVisitor(record.id)}>
                详细
                </Button>
            </>
          }];
    showDrawer=()=>{
        this.setState({
            showDrawer:true
        })
    }
    hideDrawer=()=>{
        this.setState({
            showDrawer:false
        })
    }
    getVisitor=(id)=>{
        let fd=new FormData()
        fd.append('id',id)
        instance.post('http://www.11lang.cn/mp/getLoveExtra',fd).then((res)=>{
            this.setState({
                data:res.data,
                dataGet:true,
                showDrawer:true
            })
        })
    }
    render(){
        let data=this.props.publishLove.map((user,index)=>{
            return Object.assign({},user,{key:user.openid+index})
        });
        return (
            <>
                <Table columns={this.columns} dataSource={data} />
                {this.state.showDrawer&&this.state.dataGet?<LoveDrawer  close={this.hideDrawer} data={this.state.data}></LoveDrawer>:null}
            </>
        )
    }
}
export default Publish

