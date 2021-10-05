const querystring = require('querystring')
const http = require('http')
const request = require("request")
const Server_Setting = {
  hostname: '127.0.0.1',//ip
  Get_Port: 5700,//发送端口
  Post_Port: 5701//监听端口
}
module.exports = {
Server_Setting : Server_Setting,
Send_Packet: function (command, data={},func) {
    //将data数据转成json
  
    var content = querystring.stringify(data);
    if (func == undefined){
      func = function (res) {
        console.log('[info] ' + command + "    " + content);//显示命令发送
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          console.log('[info] 数据包发送返回: ' + chunk + "");//将Get返回内容显示
          return chunk
        });
      }
    }
    //一些机器人发送的设置
    var options = {
      hostname: Server_Setting.hostname,
      port: Server_Setting.Get_Port,//端口
      path: command + "?" + content,//路径
      method: 'GET'
    };
    var req = http.request(options,func);
    req.on('error', function (e) {
      console.log('【ERROR】 problem with request: ' + e.message);
    });
    req.end();
  },
  
  
Get_Packet: function(url, content, func=function(err,rea,body){return body}) {
    //将data数据转成json
  
    content = querystring.stringify(content);
    //一些机器人发送的设置
    
    return request(url +"?"+ content,{strictSSL: false},func)
    
  }
}
  
  
  
  