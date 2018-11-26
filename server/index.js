const Koa=require('koa')
const Router=require('koa-router')
const cors=require('koa2-cors')
const mysql=require('mysql')
const koaBody = require('koa-body');
const Spanner=require('./until')
var router=new Router();
var app=new Koa()
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '19950403',
    database: 'cAuth'
});
var  spanner=new Spanner(connection)
app.use(koaBody({
    multipart:true
}))
router.use(cors())
router.post('/mp/login',async (ctx)=>{
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
})//登陆

router.get('/mp/getUser',async (ctx)=>{
    var manager=await spanner.query({tableName:'user',fields:['userName','role','level','id']})
    var user=await spanner.query({tableName:'userInfo'})
    ctx.body={manager,user}
})//获取用户
router.post('/mp/modifyLevel',async (ctx)=>{
    var res=await spanner.update({
        tableName:'user',
        fields:['level'],
        values:[ctx.request.body.level],
        rules:`where id=${ctx.request.body.id}`})
    ctx.body=res;
})//修改管理员权限
router.post('/mp/deleteAdmin',async (ctx)=>{
    var res=await spanner.delete({
        tableName:'user',
        rules:`where id=${ctx.request.body.id}`
    })
    ctx.body=res
})//删除管理员
router.post('/mp/deleteUser',async (ctx)=>{
    var res=await spanner.delete({
        tableName:'userInfo',
        rules:`where openid='${ctx.request.body.openid}'`
    })
    ctx.body=res
})//删除用户

router.get('/mp/love',async (ctx)=>{
    var love=await spanner.query({tableName:'love'})
    ctx.body={love}
})//获取表白
router.post('/mp/publishLove',async (ctx)=>{
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
})//发布表白
router.post('/mp/deleteLove',async (ctx)=>{
    try{
        var res=await spanner.delete({
            tableName:'love',
            rules:`where id=${ctx.request.body.id}`
        })
        ctx.body=res
    }catch(e){
        ctx.body=e
    }
})//删除表白
router.post('/mp/getLoveExtra',async (ctx)=>{
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
})//获取表白访客和评论信息

router.get('/mp/appoint',async (ctx)=>{
    var appoint=await spanner.query({tableName:'appoint'})
    ctx.body={appoint}
})//获取邀约
router.post('/mp/publishAppoint',async (ctx)=>{
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
})//发布邀约
router.post('/mp/deleteAppoint',async (ctx)=>{
    try{
        var res=await spanner.delete({
            tableName:'appoint',
            rules:`where id=${ctx.request.body.id}`
        })
        ctx.body=res
    }catch(e){
        ctx.body=e
    }
})//删除邀约

router.get('/mp/mes',async (ctx)=>{
    var mes=await spanner.query({tableName:'mes'})
    ctx.body={mes}
})//获取信息
router.post('/mp/deleteMes',async (ctx)=>{
    try{
        var res=await spanner.delete({
            tableName:'mes',
            rules:`where id=${ctx.request.body.id}`
        })
        ctx.body=res
    }catch(e){
        ctx.body=e
    }
})//删除信息
app.use(router.routes()).use(router.allowedMethods())
app.listen(5000)