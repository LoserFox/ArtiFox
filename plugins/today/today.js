const global = require("../global")
const schedule = require('node-schedule');
const moment = require("moment")
const image = require('./image.js')
module.exports =  {
    _init: () =>{
      schedule.scheduleJob({hour:0,minute:0,second:0},()=>{
        var list = global.http.Send_Packet("/get_group_list",{},function(res){res.on('data', function (chunk) {
        var list = JSON.parse(chunk)
        var group_list = []
        for (i in list.data){
          group_list.push(list.data[i].group_id)
        }
        for (i in group_list){
          history_today(group_list[i])
        }
      }
    )}   
  )})
},
    main:data => {

        data=JSON.parse(data)
        if (data.post_type!="message"){return}
        if (data.message.indexOf("二次元的")!=-1 && data.message.indexOf("长什么样") != -1){
            //发送api获取请求
            global.http.Get_Packet("https://ovooa.com/API/Ser/api",{name:"FoxILoveYou"+data.message.slice(4,data.message.indexOf("长什么样")),type:"text"},
            function(err,rea,text){
            //排除以外情况
            if (err){console.log(err);return}
            if (rea.statusCode!=200){console.log(rea.statusCode);return}
            //发送请求
            global.http.Send_Packet("/send_group_msg", {
                "group_id": data.group_id,
                "message": "[CQ:reply,id="+data.message_id+"] [CQ:at,qq=" + data.user_id + "]" + text.replace("FoxILoveYou","")
                })
            })
        };
        if (data.message == "签到") {
            image.image(data)
              
            
        };
}}
function history_today(group_id){
  global.http.Get_Packet("https://zhufred.gitee.io/zreader/ht/event/"+moment().format("MMDD")+".json",{},
      function(err,rea,text){
        
        if (err){
          console.log(err)
          return
        }
        if (rea.statusCode!=200){

          console.log(rea.statusCode+"https://zhufred.gitee.io/zreader/ht/event/"+moment(new Date(),["MMdd", moment.ISO_8601])+".json")
          return 
        }

        text = JSON.parse(text)
        var send_text=""
        for (i in text){
          send_text+=text[i].title+"\n"
        }
        global.http.Send_Packet("/send_group_msg", {
        "group_id": group_id,
        "message": "新的一天...历史上的今天发生了什么事情？\n"+send_text
        })
      })
}