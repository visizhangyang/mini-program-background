### 小程序后台

本项目是为小程序搭建的后台服务，小程序地址：https://github.com/xiao11lang/mini-program-demo

项目前端页面基于React.js，UI使用蚂蚁金服的Ant Design，路由使用React Router V4，状态管理使用Redux

后台接口基于Koa2，数据库使用mysql

### 项目启动

#### 前端

```shell
$ git clone https://github.com/xiao11lang/mini-program-background

$ cd mini-program-background

$ npm install & yarn add 

$ npm start & yarn start 
```

#### 后台

```shell
$ cd server 

$ npm install 

$ node index.js


```

其它：服务端与数据库连接，需提前在本地安装mysql并完成初始化工作，在此不做赘述。注意需要将代码中的请求地址。数据库名等替换为对应的本地地址