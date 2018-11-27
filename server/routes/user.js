const Spanner=require('./until')
const connection=require('../mysql')
var spanner=new Spanner(connection)
async function getUser(ctx) {
    var manager=await spanner.query({tableName:'user',fields:['userName','role','level','id']})
    var user=await spanner.query({tableName:'userInfo'})
    ctx.body={manager,user}
}
async function modifyLevel(ctx){
    var res=await spanner.update({
        tableName:'user',
        fields:['level'],
        values:[ctx.request.body.level],
        rules:`where id=${ctx.request.body.id}`})
        ctx.body=res;
}
async function deleteAdmin(ctx){
    var res=await spanner.delete({
        tableName:'user',
        rules:`where id=${ctx.request.body.id}`
    })
    ctx.body=res
}
async function deleteUser(ctx){
    var res=await spanner.delete({
        tableName:'userInfo',
        rules:`where openid='${ctx.request.body.openid}'`
    })
    ctx.body=res
}
module.exports=[{
    method:"get",
    path:'/mp/getUser',
    handler:getUser
},{
    method:"post",
    path:'/mp/modifyLevel',
    handler:modifyLevel
},{
    method:"post",
    path:'/mp/deleteAdmin',
    handler:deleteAdmin
},{
    method:"post",
    path:'/mp/deleteUser',
    handler:deleteUser
}]