const login=require('./login')
const user=require('./user')
const love=require('./love')
const appoint=require('./appoint')
const mes=require('./mes')
const Router=require('koa-router')
const cors=require('koa2-cors')
var router=new Router();
router.use(cors())
var routeConfig=[].concat(login,user,love,appoint,mes)
routeConfig.forEach((conf)=>{
    router[conf.method](conf.path,conf.handler)
})
module.exports=router