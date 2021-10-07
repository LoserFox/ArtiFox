/*
第三方
node-schedule
request
moment
minecraft-protocol
*/
const config = require('./Plugins.json');



const plugins = []

const lib = {http:require("./lib/Http"),JSON:require("./lib/JSON")}

const server = require("http").createServer();






// 启用服务器
server.listen(lib.http.Server_Setting.Post_Port, function () {
  //By http://patorjk.com/software/taag/ 
  console.log("   _          _    _    ___              ");
  console.log("  /_\\   _ __ | |_ (_)  / __\\  ___  __  __");
  console.log(" //_\\\\ | '__|| __|| | / _\\   / _ \\ \\ \\/ /");
  console.log("/  _  \\| |   | |_ | |/ /    | (_) | >  < ");
  console.log("\\_/ \\_/|_|    \\__||_|\\/      \\___/ /_/\\_\\");
  console.log("                                         ");
  console.log("-欢迎使用ArtiFox QQBot-");
  console.log("现在是: " + new Date());
  for (x in config){
    plugins.push(require(config[x]))
  }
  plugins.forEach(element => {if(typeof element._init=="function"){element._init()}})
  console.log("已加载插件:"+plugins.length)
  require("./plugins/global").Save_JSON=require("./data.json")
  console.log("JSON数据初始化:"+JSON.stringify(require("./plugins/global").Save_JSON, null, "\t").slice(0,100))
  console.log("-初始化已完成-  端口: " + lib.http.Server_Setting.Post_Port);
})

server.on("request",function(req,res){
  var data = ''
  if (req.method === 'POST') { req.on('data', function (chuck) {data+=chuck})}
  req.on('end', function () {
    res.end();
    plugins.forEach(plugin => (plugin.main(data)))
    
  })
})