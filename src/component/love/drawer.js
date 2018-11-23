import { Drawer, Avatar, List ,Divider} from 'antd';
import React, { Component } from 'react';

class LoveDrawer extends Component {
  render(){
      console.log(this.props.data)
      return (
          <>
            <Drawer onClose={this.props.close} visible={true} closable={false} >
            <Divider >访客</Divider>
            <List dataSource={this.props.data.visitor} renderItem={(item)=>{
                    return (
                        <>
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatarUrl} ></Avatar>}
                                    title={item.nickName}
                                ></List.Item.Meta>
                            </List.Item>
                        </>
                    )
                }}>
                </List>
                <Divider >评论</Divider>
                <List dataSource={this.props.data.comment} renderItem={(item)=>{
                    return (
                        <>
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatarUrl} ></Avatar>}
                                    title={item.nickName}
                                    description={item.content}
                                ></List.Item.Meta>
                            </List.Item>
                        </>
                    )
                }}>
                </List>
            </Drawer>
          </>
      )
  }
 
}
export default LoveDrawer