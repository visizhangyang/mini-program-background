import React, { Component } from 'react';
import LeftMenu from '../until/menu'
import All from './all'
import Publish from './publish'
import instance from '../../axiosConf'
import './love.scss'
class Love extends Component{
    constructor(){
        super();
        this.state={
            items:['全部表白','已发布'],
            activeKey:'0',
            allLove:[],
            publishLove:[],
            dataGet:false
        }
        this.toggle=this.toggle.bind(this)
    }
    componentDidMount(){
        instance.get('http://www.11lang.cn/mp/love').then((res)=>{
            
            this.setState({
                allLove:res.data.love,
                //publishLove:res.data.love.filter((lo)=>lo.publish===1),
                dataGet:true
            })
            
        })
    }
    publish=(id)=>{
        /* if(this.state.publishLove.find((lo)=>lo.id===id)){
            alert('此条已经发布')
            return
        } */
        let fd=new FormData();
        fd.append('id',id)
        instance.post('http://www.11lang.cn/mp/publishLove',fd).then(()=>{
            this.setState({
                allLove:this.state.allLove.map((lo)=>{
                    return lo.id===id?Object.assign({},lo,{
                        publish:1
                    }):lo
                }),
                //publishLove:[this.state.allLove.find((lo)=>lo.id===id),...this.state.publishLove]
            })
        })
    }
    deleteLove=(id)=>{
        let fd=new FormData();
        fd.append('id',id)
        instance.post('http://www.11lang.cn/mp/deleteLove',fd).then(()=>{
            this.setState({
                allLove:this.state.allLove.filter((lo)=>lo.id===id?null:lo),
                //publishLove:this.state.allLove.filter((lo)=>lo.publish===1)
            })
        })
    }
    toggle(key){
        this.setState({
            activeKey:key
        })
    }
    render(){
        return (
            <div className='love'>
                <LeftMenu items={this.state.items} toggle={this.toggle}></LeftMenu>
                <div className='loveMain'>
                    {this.state.dataGet?(this.state.activeKey==='0'?
                        <All allLove={this.state.allLove} publish={this.publish} deleteLove={this.deleteLove}></All>:<Publish allLove={this.state.allLove}></Publish>):null
                    }
                </div>
            </div>
        )
    }
}
export default Love
