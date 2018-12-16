const Spanner=require('./until')
const connection=require('../mysql')
const jwt=require('jsonwebtoken')
const serect=require('../sign').serect
var spanner=new Spanner(connection)
async function login(ctx) {
    var res=await spanner.query({tableName:'user',rules:`where userName='${ctx.request.body.userName}'`})
     if(res.length==0){
         ctx.body=0
     }else if(res[0].password!=ctx.request.body.password){
         ctx.body=1
     }else{
         var {id,userName,role,level}=res[0]
         const token = jwt.sign(userToken, serect, {expiresIn: '1h'})
         ctx.body={
             id,userName,role,level,token
         }
     }
}
module.exports=[{
    method:'post',
    path:'/mp/login',
    handler:login
}]