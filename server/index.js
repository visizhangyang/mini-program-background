const Koa=require('koa')
const koaBody = require('koa-body');
const router=require('./routes/route')
var app=new Koa()
const logUtil = require('./log');
app.use(async (ctx, next) => {
  const start = new Date();
  var ms;
  try {
    await next();
    ms = new Date() - start;
    logUtil.logResponse(ctx, ms);
  } catch (error) {
    ms = new Date() - start;
    logUtil.logError(ctx, error, ms);
  }
});
app.use(koaBody({
    multipart:true
}))

app.use(router.routes()).use(router.allowedMethods())
app.listen(5000)