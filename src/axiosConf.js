import axios from 'axios'
let instance=axios.create({
    headers:{
        "Authorization":`Bearer ${localStorage.getItem('token')}`
    }
})
instance.interceptors.response.use(function(res){
    if(res.status===401){
        alert('未验证')
    }
})
export default instance