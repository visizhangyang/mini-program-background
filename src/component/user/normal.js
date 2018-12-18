import React, { Component } from 'react';
import {Avatar,Button,Divider,Table,Popconfirm} from 'antd'
import {connect} from 'react-redux'
import instance from '../../axiosConf'
class Normal extends Component{
    constructor(){
        super()
        this.state={
        }
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
            }];
    }
    deleteUser(openid){
        let that=this;
        let fd=new FormData()
        fd.append('openid',openid)
        instance.post('http://www.11lang.cn/mp/deleteUser',fd).then((res)=>{
               that.props.deleteUser(openid)
        })
    }
    componentDidMount() {
        this.setState({
            userData:this.props.userData
        })
    }
    render(){
        if(this.props.user.level>=2&&this.columns.length===6){
            this.columns.push({
                title: '操作',
                key: 'action',
                align:'center',
                render: (action,record) => (
                  <Popconfirm title='确定删除吗' onConfirm={() => this.deleteUser(record.openid)}>
                    <Button type='danger'>删除</Button>
                  </Popconfirm>
                ),
            })
        }
        let userData=this.props.userData
        let data=userData.map((user)=>{
            return Object.assign({},user,{key:user.openid})
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
export default connect(select)(Normal)
