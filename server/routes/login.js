const Spanner=require('./until')
const connection=require('../mysql')
var spanner=new Spanner(connection)
async function login(ctx) {
    var res=await spanner.query({tableName:'user',rules:`where userName='${ctx.request.body.userName}'`})
     if(res.length==0){
         ctx.body=0
     }else if(res[0].password!=ctx.request.body.password){
         ctx.body=1
     }else{
         var {id,userName,role,level}=res[0]
         ctx.body={
             id,userName,role,level
         }
     }
}
module.exports=[{
    method:'post',
    path:'/mp/login',
    handler:login
}]