const Koa=require('koa')
const koaBody = require('koa-body');
const router=require('./routes/route')
var app=new Koa()
app.use(koaBody({
    multipart:true
}))

app.use(router.routes()).use(router.allowedMethods())
app.listen(5000)