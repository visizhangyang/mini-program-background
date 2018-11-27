const Spanner=require('./until')
const connection=require('../mysql')
var spanner=new Spanner(connection)
async function love(ctx) {
    var love=await spanner.query({tableName:'love'})
    ctx.body={love}
}
async function publishLove(ctx) {
    try{
        var res=await spanner.update({
            tableName:"love",
            fields:['publish'],
            values:[1],
            rules:`where id=${ctx.request.body.id}`
        })
        ctx.body=res
    }catch(e){
        ctx.body=e
    }
}
async function deleteLove(ctx) {
    try{
        var res=await spanner.delete({
            tableName:'love',
            rules:`where id=${ctx.request.body.id}`
        })
        ctx.body=res
    }catch(e){
        ctx.body=e
    }
}
async function getLoveExtra(ctx) {
    try{
        var visitor=await spanner.query({
            tableName:'love_visitor',
            fields:['distinct *'],
            rules:`where id=${ctx.request.body.id}`
        })
        var comment=await spanner.query({
            tableName:'love_comment',
            rules:`where id=${ctx.request.body.id}`
        })
        ctx.body={visitor,comment}
    }catch(e){
        ctx.body=e
    }
}
module.exports=[
    {
        method:"get",
        path:'/mp/love',
        handler:love
    },{
        method:"post",
        path:'/mp/publishLove',
        handler:publishLove
    },{
        method:"post",
        path:'/mp/deleteLove',
        handler:deleteLove
    },{
        method:"post",
        path:'/mp/getLoveExtra',
        handler:getLoveExtra
    }
]