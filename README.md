# ArtiFox
 这是一个基于Node.js的QQ机器人，拥有一些基础功能。
 结构思路源于go-cqhttp/node项目，部分代码进行了借鉴（XD）。
- # 使用的第三方支持库：
- node-schedule
- request
- moment
- gm
- # 使用：
- 在 https://github.com/Mrs4s/go-cqhttp/releases 下载对应平台的可执行文件, 放到 go-cqhttp 目录中
- 安装 nodejs 环境 (建议 12.0 以上版本), 根目录运行 npm install 安装依赖
- 运行 go-cqhttp/下载的文件, 根据提示填写 QQ 号和密码等信息, 参考文档 https://docs.go-cqhttp.org/guide/quick_start.html
- 安装imageMagick 6.x版本，并在环境目录Path中添加安装目录
- 根目录运行 node ./Main.js
- 
- # 如果你想编写自主编写插件，请知晓以下几点：
- 脚本module.exports必须拥有一个main名称的函数。（用于接收消息）
- 插件脚本并不是自动加载的！需要你在Plugins.json里面进行定义入口脚本
- 插件脚本内可以有一个_init函数方法，系统会在一开始调用该函数
- 垃圾项目，请别抱期望。
