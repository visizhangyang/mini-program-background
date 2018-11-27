const Spanner=require('./until')
const connection=require('../mysql')
var spanner=new Spanner(connection)
async function appoint(ctx) {
    var appoint=await spanner.query({tableName:'appoint'})
    ctx.body={appoint}
}
async function publishAppoint(ctx) {
    try{
        var res=await spanner.update({
            tableName:"appoint",
            fields:['publish'],
            values:[1],
            rules:`where id=${ctx.request.body.id}`
        })
        ctx.body=res
    }catch(e){
        ctx.body=e
    }
}
async function deleteAppoint(ctx) {
    try{
        var res=await spanner.delete({
            tableName:'appoint',
            rules:`where id=${ctx.request.body.id}`
        })
        ctx.body=res
    }catch(e){
        ctx.body=e
    }
}
module.exports=[
    {
        method:"get",
        path:'/mp/appoint',
        handler:appoint
    },{
        method:"post",
        path:'/mp/publishAppoint',
        handler:publishAppoint
    },{
        method:"post",
        path:'/mp/deleteAppoint',
        handler:deleteAppoint
    }
]