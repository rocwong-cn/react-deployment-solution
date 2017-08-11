#Merchant-Center部署文档
> 基于react搭建的前端框架（商户中心）部署文档

## 一、环境搭建
### 1、node 环境安装
* 登录到你的linux服务器上（针对于64位的服务器来说），然后在当前目录依次执行：

```
cd /usr/local
mkdir node
cd node
wget https://nodejs.org/dist/v6.11.2/node-v6.11.2-linux-x64.tar.xz
xz -d node-v6.11.2-linux-x64.tar.xz
tar xvf node-v6.11.2-linux-x64.tar
mv node-v6.11.2-linux-x64 node-v6.11.2
ln -s /usr/local/node/node-v6.11.2/bin/node  /usr/local/bin/node
ln -s /usr/local/node/node-v6.11.2/bin/npm  /usr/local/bin/npm
```
* 至此，node环境已经安装完毕，可以通过`node -v`来检查是否安装成功。

### 2、配置node环境变量
> 很重要！ 如果不配置环境变量，有些通过npm安装的CLI会找不到。

* 首先进入配置文件：

```
vi /etc/profile
```
* 按 **i** 键进入编辑模式，进入文件末尾添加：

```
export NODE_HOME=/usr/local/node/node-v6.11.2/bin
export PATH=$NODE_HOME:$PATH
```
* 然后按 **ESC** 键 ，在控制台输入`:wq`，回车保存退出。

> 注：具体的**NODE_HOME**路径来自第一步你的node安装的目录。

### 3、安装[pm2](http://pm2.keymetrics.io)模块
> pm2 是一个带有负载均衡功能的Node应用的进程管理器.

* 执行：

```
npm install -g pm2
```

* 执行成功后，断开当前用户的服务器连接，然后重新登录。

## 二、 项目编译

### 1、生成项目的根目录
可以通过命令行或者手动创建的方式生成项目根目录，如：

```
mkdir merchant-center
```
可以将`merchant-center`替换成你自己的项目名称。
### 2、配置express环境

将该文档的同级目录下的`app.js`和`package.json`两个文件放在你上一步生成的项目根目录下，然后执行：

```
npm install
```
确保当前目录下生成`node_modules`文件夹。

### 3、生成项目的部署文件
* 在你的react项目根目录下执行：

```
npm run build
```
* 成功后，会生成**dist**目录，该目录的内容就是你要部署到服务器上的文件。
* 你可以通过：

```
sup [-r] [-P port] 源路径 user@目标IP地址:目标路径
```
或者直接通拽的方式将该目录内容放置服务器上，然后将`dist`放在第一步生成的项目根目录下。此时，项目的目录结构应该是：

```
merchant-center        		//或其他项目名称
	|____app.js				//可以打开修改里面的3000端口号
	|____dist     			//项目生成的静态文件（不要重命名！）
	|____node_modules		//express的依赖模块
	|____package.json		
```

## 三、项目启动
首先确保你已经按照本文档执行了以上的所有步骤。然后在项目的根目录下执行：

```
pm2 start app.js
```
当你看到了这样的日志输出的时候，说明你已经启动成功了！

![启动成功](http://og3zicoi5.bkt.clouddn.com/pm2.png)

另外，pm2的其他命令行参考：

```
pm2 start app.js              # 项目启动
pm2 stop all                  # 停止所有pm2启动的应用
pm2 stop 0                    # 停止进程id为0的进程
pm2 restart all               # 重启所有应用
pm2 reload all                # 0延迟重新加载
pm2 list                      # 列出所有用pm2启动的进程
pm2 monit                     # 显示每一个应用的内存和cpu使用情况
pm2 show [app-name]           # 显示当前应用的所有信息

pm2 logs                      # 显示所有应用的日志
pm2 logs [app-name]           # 显示当前应用的日志
pm2 logs --json               # 以json格式展示日志
```
更多操作命令可以去[pm2官网](http://pm2.keymetrics.io)或者其[github](https://github.com/Unitech/pm2)查看。

至此，项目已经部署完成啦！

**Open your browser , Enjoy it !**