import React, { Component } from 'react';
import { Card, Icon,Modal, Menu} from 'antd';
import axios from 'axios'
import {connect} from 'react-redux'
const { Meta } = Card;
const confirm = Modal.confirm;
class Admin extends Component{
    constructor(props) {
        super(props);
        this.state={
            admin:[],
            visible:false,
            level:1,
            id:0
        }
    }
    showModal=(id)=>{
        this.setState({
            visible:true,
            id
        })
    }
    showConfirm=(id)=> {
        var that=this;
        confirm({
          title: '确认删除此管理员吗',
          content: '你将要删除选择的管理员，请谨慎操作',
          okText:"确认",
          cancelText:"取消",
          onOk() {
            let fd=new FormData()
            fd.append('id',id)
            axios.post('http://www.11lang.cn/mp/deleteAdmin',fd).then((res)=>{
                that.setState({
                visible:false,
                admin:that.state.admin.filter((ad)=>{
                    return ad.id===id?null:ad
                })
            })
        })
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }
    handleOk = (e) => {
        let fd=new FormData()
        fd.append('level',this.state.level)
        fd.append('id',this.state.id)
        axios.post('http://www.11lang.cn/mp/modifyLevel',fd).then((res)=>{
            this.setState({
                visible:false,
                admin:this.props.admin.map((ad,index)=>{
                    return ad.id===this.state.id?Object.assign({},ad,{level:this.state.level}):ad
                })
            })
        })
    }
    
    handleCancel = (e) => {
        this.setState({
          visible: false
        });
    }
    modifyLevel=(level)=>{
        this.setState({
            level:parseInt(level)
        })
    }
    componentDidUpdate(prevProps) {
        if(prevProps.admin!==this.props.admin){
            this.setState({
                admin:this.props.admin
            })
        }
    }
    
    render(){
        let admin=this.state.admin.length!==0?this.state.admin:this.props.admin
        let cards=admin.map((admin,index)=>{
            return <Card
                    style={{ width: 300,margin:20,display:'inline-block'}}
                    actions={[<Icon type="delete" onClick={()=>this.showConfirm(admin.id)}/>, 
                    <div onClick={()=>this.showModal(admin.id)}>{admin.level}</div>]}
                    key={index}>
                    <Meta
                    avatar={<Icon type='user' />}
                    title={admin.userName}
                    description={admin.role}
                    />
                </Card>
        })
        return (
            <>
                {cards}
                <Modal
                    title="修改权限"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    >
                    <Menu style={{width:'100%'}}  onClick={(item)=>this.modifyLevel(item.key)}>
                        <Menu.Item key={1}>1</Menu.Item>
                        <Menu.Item key={2}>2</Menu.Item>
                        <Menu.Item key={3}>3</Menu.Item>
                    </Menu>
                </Modal>
            </>
        )
    }
}
export default Admin





