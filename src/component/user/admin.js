import React, { Component } from 'react';
import { Card, Icon,Modal, Menu} from 'antd';
import {connect} from 'react-redux'
import {DELETE_ADMIN,MODIFY_LEVEL} from '../../api/api'
import fetch from '../../api/fetch'
const { Meta } = Card;
const confirm = Modal.confirm;
class Admin extends Component{
    constructor(props) {
        super(props);
        this.state={
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
            fetch(DELETE_ADMIN,fd).then(()=>{
                that.setState({
                    visible:false
                })
                that.props.deleteAdmin(id)
            })
            /* instance.post('http://www.11lang.cn/mp/deleteAdmin',fd).then((res)=>{
                that.setState({
                visible:false
            })
            that.props.deleteAdmin(id)
        }) */
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
        fetch(MODIFY_LEVEL,fd).then(()=>{
            this.setState({
                visible:false
            })
            this.props.modifyLevel(this.state.id,this.state.level)
        })
        /* instance.post('http://www.11lang.cn/mp/modifyLevel',fd).then((res)=>{
            this.setState({
                visible:false
            })
            this.props.modifyLevel(this.state.id,this.state.level)
        }) */
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
    
    render(){
        let admin=this.props.admin
        let cards=admin.map((admin,index)=>{
            return <Card
                    style={{ width: 300,margin:20,display:'inline-block'}}
                    actions={this.props.user.level===3?[<Icon type="delete" onClick={()=>this.showConfirm(admin.id)}/>, 
                    <div onClick={()=>this.showModal(admin.id)}>{admin.level}</div>]:null}
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
function select(state){
    return {
        isLogin:state.isLogin,
        user:state.userInfo
    }
}
export default connect(select)(Admin)





