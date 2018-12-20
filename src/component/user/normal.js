import React, { Component } from 'react';
import {Avatar,Button,Divider,Table,Popconfirm,Modal,Input} from 'antd'
import {connect} from 'react-redux'
import instance from '../../axiosConf'
class Normal extends Component{
    constructor(){
        super()
        this.state={
            showModal:false,
            mes:'',
            toWho:''
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
    contactUser(openid){

    }
    showModal=(id)=>{
        this.setState(()=>{
            return {
                showModal:true,
                toWho:id
            }
        })
    }
    hideModal=()=>{
        this.setState({
            showModal:false
        })
    }
    addMes=()=>{
        let that=this;
        let date=new Date()
        let year=date.getFullYear();
        let month=date.getMonth()+1;
        month=month>=10?month:('0'+month.toString())
        let day=date.getDate();
        day=day>=10?day:('0'+day.toString())
        let hour=date.getHours();
        hour=hour>=10?hour:('0'+hour.toString())
        let min=date.getMinutes();
        min=min>=10?min:('0'+min.toString())

        let writeTime=year+'-'+month+'-'+day+' '+hour+':'+min;
        let fd=new FormData()
        let nickName=this.props.user.userName
        let avatarUrl='http://www.11lang.cn/static/img/admin.jpg'
        fd.append('nickName',nickName)
        fd.append('avatarUrl',avatarUrl)
        fd.append('toWho',this.state.toWho)
        fd.append('content',this.state.mes)
        fd.append('writeTime',writeTime)
        instance.post('http://www.11lang.cn/mp/addDetailMes',fd).then((res)=>{
            that.setState({
                showModal:false
            })
        })
    }
    handleChange=(e)=>{
        this.setState({
            mes:e.target.value
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
                  <>
                    <Button type='primary' onClick={()=>this.showModal(record.openid)} style={{marginRight:10}}>留言</Button>                    
                    <Popconfirm title='确定删除吗' onConfirm={() => this.deleteUser(record.openid)}>
                        <Button type='danger'>删除</Button>
                    </Popconfirm>
                  </>
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
                <Modal visible={this.state.showModal} title='给用户留言' cancelText='取消' okText='确认' 
                onCancel={this.hideModal} 
                onOk={this.addMes}
                closable={false}>
                <Input placeholder='新消息' onChange={this.handleChange}/>
            </Modal>
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
