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
router.get('/mp/appoint',async (ctx)=>{
    var appoint=await spanner.query({tableName:'appoint'})
    ctx.body=appoint
})//获取邀约
router.get('/mp/love',async (ctx)=>{
    var appoint=await spanner.query({tableName:'love'})
    ctx.body=appoint
})//获取表白
router.get('/mp/mes',async (ctx)=>{
    var appoint=await spanner.query({tableName:'mes'})
    ctx.body=appoint
})//获取信息
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
})
router.post('/mp/deleteUser',async (ctx)=>{
    var res=await spanner.delete({
        tableName:'userInfo',
        rules:`where openid='${ctx.request.body.openid}'`
    })
    ctx.body=res
})
app.use(router.routes()).use(router.allowedMethods())
app.listen(5000)