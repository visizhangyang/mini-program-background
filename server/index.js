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
         ctx.body=2
     }
})
app.use(router.routes()).use(router.allowedMethods())
app.listen(5000)