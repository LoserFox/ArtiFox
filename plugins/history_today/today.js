const global = require("../global")
const schedule = require('node-schedule');
const moment = require("moment")

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