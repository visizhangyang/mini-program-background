import React, { Component } from 'react';
import { Card, Icon,Button,Select,Modal } from 'antd';
import {connect} from 'react-redux'
const { Meta } = Card;
const confirm = Modal.confirm;
function showConfirm() {
    confirm({
      title: '确认删除此管理员吗',
      content: '你将要删除选择的管理员，请谨慎操作',
      okText:"确认",
      cancelText:"取消",
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  
class Admin extends Component{
    constructor(props) {
        super(props);
        this.state={
            visible:false
        }
    }
    showModal=()=>{
        this.setState({
            visible:true
        })
    }
    handleOk = (e) => {
        this.setState({
          visible: false,
        });
      }
    
      handleCancel = (e) => {
        this.setState({
          visible: false,
        });
      }
    render(){
        let cards=this.props.admin.map((admin,index)=>{
            return <Card
                    style={{ width: 300,margin:20,display:'inline-block'}}
                    actions={[<Icon type="delete" onClick={showConfirm}/>, 
                    <div onClick={this.showModal}>{admin.level}</div>]}
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
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
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
export default connect(select)(Admin)





