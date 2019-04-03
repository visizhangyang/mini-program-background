import axios from 'axios'
import createHashHistory from 'history/createHashHistory'
const history=createHashHistory({
    basename:''
})
let instance=axios.create()
instance.interceptors.request.use(function(config){
    config.headers.Authorization=`Bearer ${localStorage.getItem('token')}`
    return config
})
instance.interceptors.response.use(function(res){
    return res
},function(err){
    if(err){
        history.push('/')
    }
})
export default instance