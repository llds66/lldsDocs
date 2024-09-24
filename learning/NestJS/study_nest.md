---
title: NestJS 学习
date: 2024/9/24
---

## 初始化项目

```bash
npm i -g @nestjs/cli
nest new [项目名称]
```

## 结构

**main.ts**

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

**模块**

```typescript
import { Module } from '@nestjs/common';

@Module({
  imports: [], // 模块
  controllers: [], // controller层
  providers: [], // service层
})
  export class UserModule {}
```

![img](https://cdn.jsdelivr.net/gh/llds66/imageBed/githubImage/20240524/1700492404925-c5a066a8-cad6-43fc-94cd-3f7d5214f2e0.png)

## cli命令

```bash
nest -h // 帮助
nest g mo [name] // 生成一个模块模板
nest g co [name] // 生成一个控制层模板
nest g s [name] // 生成一个服务层模板
```

模板默认生成测试文件，在 ` nest-cli.json`文件中禁用：

```json
{
  "generateOptions": {
    "spec": false
  }
}
```

## 增删改查

### 前置

NuxtJS 项目搭建完成，完成数据库配置，学习基础的增删改查，应该其他功能都是在这基础上的：各个模块的增删改查，对增删改查的其他控制（权限）。其他概念先不用了解太多，先能完成想要的功能即可，其他的以后遇到或者闲暇时学习。统一响应学完中间件/拦截器学习。

主要在Controller 层与Service 层完成编写。

**Controller** 

```typescript
@Controller('user') //定义了该请求的父路径
  export class UserController {
    constructor(private usersService: UsersService) {} //注入usersService
    // ...各个子请求
  }
```

**Service** 

```typescript
@Injectable() // @Injectable 注解 可以被controller层constructor构造器里调用
  export class UsersService {
    // @InjectRepository() 装饰器 将 TypeORM 的 Repository 注入到服务类中,
    // Repository是 TypeORM 中的一个类，用于执行与数据库交互的操作
    constructor(
      @InjectRepository(User)
      private readonly usersRepository: Repository<User>,
    ) {}
    // ... 各个子请求的server
  }
```

**装饰器**

| @Get           | get 请求                               |
| -------------- | -------------------------------------- |
| @Post          | post 请求                              |
| @Put           | put 请求                               |
| @Delete        | delete 请求                            |
| @Request()     | req 从请求对象中提取数据               |
| @Param(Key)    | req.params 路由参数中提取指定键的数据  |
| @Query(Key)    | req.query 查询参数中提取指定键的数据   |
| @Body(Key)     | req.body 请求体中提取指定键的数据      |
| @Headers(name) | req.headers 请求头中提取指定名称的数据 |
| @Response()    | res 原生的响应对象                     |
| @Res()         | res 响应对象简写形式，用于注入响应对象 |

### 获取数据

#### 获取所有数据

```typescript
// Controller 查询 (全部)
@Get('list')
  getList(): Promise<User[]> {
  return this.usersService.getList();
}

// Service 查询 (全部用户)
async getList(): Promise<User[]> {
  return await this.usersRepository.find(); //find() 查询所有
}
```



#### 条件查询单条数据

`通过query 参数传条件参数`

```typescript
//Controller 查询 (条件查询 通过id查单条用户)
@Get('getUserById')
async getUserById(@Query('id') id: number): Promise<User> {
    return this.usersService.getUserById(id);
}

//Service 查询 (条件查询 通过id查单条用户)
async getUserById(id: number): Promise<User> {
    return await this.usersRepository.findOne({ where: { id: id } }); //findOne()
}

```



#### 复杂条件查询

`通过body传参接收`

```typescript
//Controller 查询(复杂条件)
@Get('findByConditions')
async findByConditions(@Body() conditions: any): Promise<User[]> {
    return this.usersService.findByConditions(conditions);
}
  
//Service 查询(复杂条件)
async findByConditions(conditions: any): Promise<User[]> {
    console.log(conditions);
    const res = await this.usersRepository.findBy(conditions);
    console.log(res);
    return res;
}
```

#### 分页查询

`通过query 参数传条件参数 page 页数 pagesize 条数`

```typescript
//Controller 分页查询
@Get('pageList')
async findAll(
    @Query('page') page: number,
    @Query('pagesize') pagesize: number,
  ) {
    const [users, total] = await this.usersService.findAll(page, pagesize);
    return {
      data: users,
      total,
      page,
      pagesize,
    };
  }
}

//Service 分页查询
async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<[User[], number]> {
    // skip：表示跳过前面的记录数量
    // take：表示要获取的记录数量
    const [users, total] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return [users, total];
  }
}
```



### 新增数据

`通过body传参接收`

```typescript
//Controller 新增
@Post('addUser')
async addUser(@Body() body: any): Promise<User> {
    return this.usersService.adduser(body); 
}
  
//Service 新增
async adduser(body: any): Promise<User> {
    return await this.usersRepository.save(body); // save()
}
```



### 更新数据

`通过body传参接收`

```typescript
//Controller 更新
@Post('updateUser')
async updateUser(@Body() body: any): Promise<string> {
    return this.usersService.updateUser(body);
}

//Service 更新
async updateUser(body: any): Promise<string> {
    const res = await this.usersRepository.update({ id: body.id }, body);
    //  update成功返回结果有"affected": 1
    if (res.affected > 0) {
      return '更新成功';
    } else {
      return '更新失败';
    }
}
```



### 删除数据

`通过query 参数传条件参数id`

```typescript
//Controller 删除
@Delete('deleteUser')
  async deleteUser(@Query('id') id: number): Promise<string> {
    return this.usersService.deleteUser(id);
}
  
//Service 删除
async deleteUser(id: number): Promise<string> {
    const res = await this.usersRepository.delete(id);
    if (res.affected > 0) {
      return '删除成功';
    } else {
      return '删除失败';
    }
}

```



## 中间件

![图1](https://cdn.jsdelivr.net/gh/llds66/imageBed/githubImage/20240524/Middlewares_1.png)



## 守卫

![img](https://cdn.jsdelivr.net/gh/llds66/imageBed/githubImage/20240524/Guards_1.png)

## 拦截器

![img](https://cdn.jsdelivr.net/gh/llds66/imageBed/githubImage/20240524/Interceptors_1.png)

## 管道

![img](https://cdn.jsdelivr.net/gh/llds66/imageBed/githubImage/20240524/Pipe_1.png)

## 异常过滤器

![img](https://cdn.jsdelivr.net/gh/llds66/imageBed/githubImage/20240524/Filter_1.png)

## 第三方库

### Mysql