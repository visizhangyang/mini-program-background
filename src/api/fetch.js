import instance from './axiosConf'
export default function fetch(url,data){
    let method='get'
    if(data){
        method='post'
    }
    return new Promise(function(resolve,reject){
        instance[method](url,data).then(function(res){
            resolve(res.data)
        }).catch(function(err){
            console.log(err)
        })
    })
}