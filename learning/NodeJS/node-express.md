---
title: Node-express
date: 2024/4/22
hideComments: false
categories:
  - web后端
tags:
  - node
  - 后端框架
---

## （一）Node.js

### 1.内置模块

#### 1.1 fs文件系统模块

用来操作文件的模块。

- fs.readFile() 方法，用来读取指定文件中的内容 
- fs.writeFile() 方法，用来向指定的文件中写入内容 

#### 1.2 path路径模块

用来处理路径的模块。

- path.join() 方法，用来将多个路径片段拼接成一个完整的路径字符串
- path.basename() 方法，用来从路径字符串中，将文件名解析出来  

#### 1.3 http模块

创建 web 服务器的模块  

### 2. 模块化

#### 2.1. module.exports 对象

在自定义模块中，可以使用 module.exports 对象，将模块内的成员共享出去，供外界使用。   exports 和 module.exports 指向同一个对象。

#### 2.2. npm包管理

分为全局包与项目包

```bash
# 安装与卸载(到开发 上线环境dependencies)
npm install 包名
npm uninstall 包名
# 安装到开发环境devDependencies
npm i 包名 -D  
npm i 包名 --save-dev

# -g C:\Users\用户目录\AppData\Roaming\npm\node_modules 目录下
npm i 包名 -g
```

```bash
# 安装nrm管理源
npm install -g nrm

# 列出可选源
nrm ls
npm ---------- https://registry.npmjs.org/
yarn --------- https://registry.yarnpkg.com/
tencent ------ https://mirrors.cloud.tencent.com/npm/
cnpm --------- https://r.cnpmjs.org/
taobao ------- https://registry.npmmirror.com/
npmMirror ---- https://skimdb.npmjs.com/registry/

# 测试速度
nrm test npm

# 切换源
nrm use taobao
```



## （二）Express

express框架是基于 Node.js 平台，快速、开放、极简的 Web 开发框架， Express 的作用和 Node.js 内置的 http 模块类似，是专门用来创建 Web 服务器的。   Express 是基于内置的 http 模块进一步封装出来。

### 1. 使用

```
// 导入express
const express = require('express')
// 创建web服务器
const app = express()
// 请求
// 1.GET
app.get('/demo1',(req,res)=>{
    // req.query 对象,服务器可以得到请求的查询参数
    // 通过 req.params 对象，可以访问到 URL 中，通过 : 匹配到的动态参数：
    console.log(req.query);
    //res.send() 方法，可以把处理好的内容，发送给客户端
    res.send({name:'zhangsan',age:20,gender:'男'})
})
// 2.POST
app.post('/demo1',(req,res)=>{
    res.send('请求成功！！')
})


// express.static() 托管静态资源
app.use('/public',express.static('public'))



// 监听端口，启动服务器
app.listen(80,()=>{
    console.log('running');
})
```

**安装nodemon**

使用 nodemon app.js 来启动项目， 会被 nodemon 监听到，从而实现自动重启项目的效果。

### 2. 路由

#### 1.  路由直接挂载到app

```javascript
/**
 * Express路由
 * 路由指的是客户端的请求与服务器处理函数之间的映射关系。
 * app.METHOD(PATH,HANDLER)
 */
const express = require('express')
// 创建app的web服务器
const app = express()


app.get('/',(req,res)=>{
    res.send(' GET 请求成功！！')

})
app.post('/',(req,res)=>{
    res.send(' POST 请求成功！！')
})



app.listen(80,()=>{
    console.log('running');
})
```



#### 2.  模块化路由

为了方便对路由进行模块化的管理，Express 不建议将路由直接挂载到 app 上，而是推荐将路由抽离为单独的模块， 调用 express.Router() 函数创建路由对象 ， 使用 module.exports 向外共享路由对象  。使用 app.use() 函数注册路由模块 

```javascript
// 路由模块 router.js
var express  = require('express')
var router = express.Router()

// 获取用户的路由
router.get('/user/list',(req,res) =>{
    res.send({name:'zhangsan'})
    // res.send('用户的列表信息')
})
// 添加用户的路由
router.post('/user/add',(req,res) =>{
    res.send('添加用户')
})
// 导出
module.exports=router
```

```javascript
// app.js
const express = require('express')
// 创建app的web服务器
const app = express()

// 导入路由
const userRouter = require('./router/router.js')
// app.use(userRouter)
app.use('/api',userRouter)  // 模块统一前缀

app.listen(80,()=>{
    console.log('running');
})
```



### 3. 中间件

#### 3.1 中间件的分类

- 应用级别的中间件 绑定到app实例上的
- 路由级别的中间件 绑定到router实例上的
- 错误级别的中间件 捕获异常错误
- express内置的中间件 如express.static,express.json,express.urlencoded
- 第三方的中间件

#### 3.2 next()函数

next 函数是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或路由。

#### 3.3 全局中间件

```javascript
// 全局中间件
app.use((req,res,next) =>{
    // 服务端
    console.log('中间件函数1');
    next()
})
app.use((req,res,next) =>{
    // 服务端
    console.log('中间件函数2');
    next()
})
app.use((req,res,next) =>{
    // 服务端
    console.log('中间件函数3');
    next()
})
// 会按照中间件定义的先后顺序依次进行
```



#### 3.4 局部中间件

```javascript
// 局部中间件
const mw1 = (req,res,next)=>{
    console.log('GET 局部中间件');
    next()
}
app.get('/',mw1,(req,res)=>{
    res.send({name:'zhangsan',age:20,gender:'男'})
})
```



#### 3.5 自定义中间件





### 4. 开发接口

#### 4.1 定义接口

```javascript
const express = require('express')
const app = express()

// 导入路由模块
const apiRouter = require('./apiRouter')
app.use('/api',apiRouter)

app.listen(80,()=>{
    console.log('running');
})
```

```javascript
// 路由模块
const express = require('express')
const apiRouter = express.Router()
// 接口
// 1.GET
apiRouter.get('/get',(req,res) =>{
    const query = req.query  //客户端请求的数据
    res.send({status:0,msg:'GET请求成功!',data:query})
})
// 2.POST
apiRouter.post('/post',(req,res) =>{
    const body = req.body  //获取客户端通过请求体发送的数据(URL-encoded格式 通过中间件express.urlencoded)
    res.send({status:0,msg:'POST请求成功!',data:body})
})

module.exports = apiRouter
```



#### 4.2 第三方中间件core解决跨域

```javascript
const express = require('express')
const app = express()
// 导入cors 解决跨域 (CORS 跨域资源共享)
const cors = require('cors')
app.use(cors())

// 导入路由模块
const apiRouter = require('./apiRouter')
app.use('/api',apiRouter)
```

 core相关的三个响应头（三）

## （三）与数据库交互

### 1.Mysql模块

`npm i mysql ` 安装mysql模块

#### 1.1 配置

```javascript
//app.js
// 导入mysql模块
const mysql = require('mysql')
const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'123456',
    database:'boot_crm'
})
// 测试 返回：[ RowDataPacket { '1': 1 } ] 功能正常
db.query('SELECT 1',(err,results) =>{
    if(err) return console.log(err.message)
    console.log(results);
})
```

#### 1.2 查询操作

```javascript
# 1.查询数据
db.query('SELECT * FROM sys_user ',(err,results) =>{
    if(err) return console.log(err.message)
    console.log(results);
})
```



#### 1.3 新增操作

```javascript
// 2.新增数据 ?占位符
const user = {user_code:'m0005',user_name:'小天',user_password:'123',user_state:1}
const sqlStr ='INSERT INTO sys_user (user_code,user_name,user_password,user_state) VALUES (?,?,?,?)'
db.query(sqlStr ,[user.user_code,user.user_name,user.user_password,user.user_state],(err,results)=>{
    if(err) return console.log(err.message)
    if(results.affectedRows === 1) {console.log("成功！！！");}
})
```



#### 1.3 更改操作

```javascript
// 3.更新数据
const user = {user_code:'m0005',user_name:'小王',user_password:'123456',user_state:1}
const sqlStr ='UPDATE sys_user SET user_name=?,user_password=?,user_state=? WHERE user_code=?'
db.query(sqlStr ,[user.user_name,user.user_password,user.user_state,user.user_code],(err,results)=>{
    if(err) return console.log(err.message)
    if(results.affectedRows === 1) {console.log("更新成功！！！")}

})
```



#### 1.4 删除操作

```javascript
// 4.删除数据 根据id
const sqlStr ='DELETE FROM sys_user WHERE user_id=?'
db.query(sqlStr ,7,(err,results)=>{
    if(err) return console.log(err.message)
    if(results.affectedRows === 1) {console.log("删除成功！！！")}
})
```



## （四）JWT身份认证

JWT认证：JSON Web Token  

加密：Header.Payload.Signature 由Header（头部），Payload（有效载荷），Signature（签名）三部分组成

客户端收到服务器返回的 JWT 之后，通常会将它储存在 localStorage 或 sessionStorage 中。 此后，客户端每次与服务器通信，都要带上这个 JWT 的字符串，从而进行身份认证。推荐的做法是把 JWT 放在 HTTP 请求头的 Authorization 字段中  。

```javascript
//app.js
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

// JWT
// 1.生成JWT token的包
const jwt = require('jsonwebtoken')
// 2.用于解析客户端发来的jwt token 成json对象
const expressJwt  = require('express-jwt')
// 3.定义secret密匙，用于加密
const secretKey = 'llds'
// express-jwt@5.5.3
app.use(expressJwt({secret:secretKey}).unless({ path:[/^\/api\//] }))

//  错误中间件
app.use((err,req,res,next) =>{
    if(err.name === 'UnauthorizedError'){
        return res.send({status:401,message:'无效token'})
    }
    res.send({status:500,message:'未知错误'})
})

// 登录接口
app.post('/api/login',(req,res) =>{
    // 将客户端请求的body体中内容，存到userinfo变量
    const userinfo = req.body
    // 登录失败
    if(userinfo.username !=='admin' || userinfo.password !== '123456'){
        res.send({
            status:400,
            msg:'登录失败!',
        })
    }
    // 发送给客户端token
    const token = jwt.sign({username:userinfo.username},secretKey,{expiresIn:'30s'})
    res.send({
        status:0,
        msg:'登录成功!',
        token:token
    })
})
// 有权限的接口
app.get('/admin/getinfo',(req,res) =>{
    //使用req.user获取用户信息，使用data发送给客户端
    console.log(req.user);
    res.send({
        status:200,
        message:'获取用户成功！',
        data:req.user
    })
})

app.listen(80,()=>{
    console.log('running');
})
```



## （五）部署

1. 通过git等上传到服务器

2. 安装项目依赖
   在项目根目录下运行 npm install 来安装所有必需的依赖。

3. 配置环境变量
   如果你的应用使用了环境变量（比如数据库连接字符串），确保在服务器上设置这些环境变量。你可以在 .bashrc 或 .profile 文件中设置它们，或者使用一个 .env 文件并通过 dotenv 包来加载它们。

   开发与生产环境

   ```
   npm install dotenv -g npm install -g cross-env –save-dev
   ```

   ├── src

   |   ├── index.ts

   |   └── environments

   |       ├── development.env

   |       └── production.env

   ├── package.json

   └── tsconfig.json

4. 运行你的应用
   对于生产环境，建议使用进程管理器，如 PM2，来管理你的应用。PM2 可以帮助你在后台运行应用、保持应用持续运行、并在崩溃时自动重启应用。

   ```bash
   npm install pm2 -g pm2 start app.js
   ```

5. 配置反向代理（可选）
   为了让你的应用通过 80 或 443 端口对外提供服务（而不是 Node.js 应用通常使用的 3000 或其他端口），你可以配置 Nginx 或 Apache 作为反向代理。

6. 配置防火墙和安全设置
   确保你的服务器配置了防火墙，只开放必要的端口（如 80 和 443）给外部访问。保持系统和软件更新，定期检查安全性，使用 SSL/TLS 等。













