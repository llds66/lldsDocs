---
title: git
date: 2024/4/1
hideComments: false
categories:
 - 其他
tags:
 - Git

---

## Git

git管理的文件有三种状态：已修改（modified）,已暂存（staged）,已提交（committed）

### 1. git常用命令

```bash
git init                 //在当前目录中初始化一个新的Git仓库。git init -b <分支名称> 
git add <file>           //将文件添加到暂存区，准备提交。常用git add .
git commit -m "commit message"     //将暂存区的更改提交到本地仓库，并添加提交消息。

git status             //查看当前工作目录和暂存区的状态。
git log                //查看提交历史记录。

git config user.name   /查看当前Git账户的用户名
git config user.email  //示当前配置的Git邮箱
git config --list   //所有的Git配置信息
```

### 3. 仓库

```bash
#查看已配置的远程仓库列表。
git remote -v        

#添加一个新的远程仓库
git remote add 仓库名 仓库URL  

#克隆一个远程仓库到本地。
git clone 仓库URL

#推送到远程仓库
git push -u 仓库名 仓库分支 (-u 将指定的远程分支与当前分支关联 )

#移除指定的远程仓库。
git remote remove 仓库名                 
```



### 2. 分支

```bash
#列出本地所有分支
git branch

#列出所有远程分支
git branch -r

#新建一个分支，但依然停留在当前分支
git branch 分支名

#新建一个分支，并切换到该分支
git checkout -b 分支名

#修改当前分支
git branch -m  新分支名

#合并指定分支到当前分支
git merge 分支名

#删除分支
git branch -d 分支名

#删除远程分支
git push origin --delete 分支名
git branch -dr 分支名
```

