---
title: Nginx
date: 2024/4/15
hideComments: false
tags:
 - nginx
categories:
 - web前端
---
# Nginx

## 安装

```bash
yum install epel-release
yum install nginx
```
## 常用命令
```bash
# 查看nginx版本
nginx -v
# 启动Nginx
systemctl start nginx

# 停止 Nginx
systemctl stop nginx

# 查看配置文件位置
nginx -t

# 重新加载配置文件
systemctl reload nginx

# 查看 Nginx 服务状态
systemctl status nginx

# 优雅地关闭 Nginx（等待当前连接处理完毕后再关闭）
nginx -s quit

# 强制关闭 Nginx
nginx -s stop
```
## 配置

```bash
user nginx; # 定义 Nginx 的运行用户
worker_processes auto; # 指定Nginx的工作进程数量。auto会根据可用的CPU核心数量自动设置。
error_log /var/log/nginx/error.log;#  Nginx 的错误日志文件位置
pid /run/nginx.pid; # 指定 Nginx 的主进程 ID 文件的位置

include /usr/share/nginx/modules/*.conf;

# 定义 Nginx 的事件模块
events {
worker_connections 1024;
}


# http模块
http {
    # 定义日志格式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    # 指定访问日志文件位置和使用的日志格式
    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    include /etc/nginx/conf.d/*.conf;
    # server模块
    server {
        listen       80;
        server_name  changhome.site;
        root         /home/llds/demo1;

        include /etc/nginx/default.d/*.conf;

        location / {
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }

}
```
二级域名（https）

```bash
http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile           on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    include /etc/nginx/conf.d/*.conf;

    server {
        listen 80;
        server_name _;  # 所有域名
        return       301 https://$host$request_uri; # 重定向到https 443
    }

    server {
        listen       443 ssl;
        server_name  lldscc.online; 
        root         /home/blog/lldscconline; 
        ssl_certificate cert/lldscc.online.pem;
        ssl_certificate_key cert/lldscc.online.key;


    }

  # 二级域名配置
    server {
        listen       443 ssl;
        server_name  demo1.lldscc.online;
        root         /home/testnginx/demo1;
        index        index.html;
        ssl_certificate cert/demo1.lldscc.online.pem;
        ssl_certificate_key cert/demo1.lldscc.online.key;
    }
    
    server {
        listen       443 ssl;
        server_name  demo2.lldscc.online;
        root         /home/testnginx/demo2;
        index        index.html;
        ssl_certificate cert/demo2.lldscc.online.pem;
        ssl_certificate_key cert/demo2.lldscc.online.key;
    }
    
    server {
        listen       443 ssl;
        server_name  demo3.lldscc.online;
        root         /home/testnginx/demo3;
        index        index.html;
        ssl_certificate cert/demo3.lldscc.online.pem;
        ssl_certificate_key cert/demo3.lldscc.online.key;

    }

}
```

>  重定向**return 301 https://$host$request_uri;**：**return** 指令用于向客户端返回一个 HTTP 响应。**301** 是 HTTP 状态码，表示永久重定向。**https://$host$request_uri** 是重定向的目标地址，其中 **$host** 表示用户请求的域名，**$request_uri** 表示用户请求的 URI（包含查询参数）











