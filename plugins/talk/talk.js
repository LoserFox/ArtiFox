var global = require("../global")
const schedule = require('node-schedule');

module.exports =  {
    _init: () =>{
        
        global.http.Send_Packet("/get_group_list",{},function(res){res.on('data', function (chunk) {
            var list = JSON.parse(chunk)

                
                schedule.scheduleJob({hour:9,minute: 0},()=>{
                    for (i in list.data){
                        global.http.Send_Packet("/send_group_msg", {
                            "group_id": list.data[i].group_id,
                            "message" : "唔...小狐狸今天也起的很早呢！"
                        })
                    }
                })
                schedule.scheduleJob({hour:13,minute: 0},()=>{
                    for (i in list.data){
                        global.http.Send_Packet("/send_group_msg", {
                            "group_id": list.data[i].group_id,
                            "message" : "午饭午饭！大佬这是小狐狸亲自做的午饭呢！"
                        })
                    }
                })
                schedule.scheduleJob({hour:16,minute: 0},()=>{
                    for (i in list.data){
                        global.http.Send_Packet("/send_group_msg", {
                            "group_id": list.data[i].group_id,
                            "message" : "zzzzzzzzzzzzzzz"
                        })
                    }
                })
                schedule.scheduleJob({hour:20,minute: 0},()=>{
                    for (i in list.data){
                        global.http.Send_Packet("/send_group_msg", {
                            "group_id": list.data[i].group_id,
                            "message" : "咕......肚子饿了呢"
                        })
                    }
                })
                schedule.scheduleJob({hour:23,minute: 0},()=>{
                    for (i in list.data){
                        global.http.Send_Packet("/send_group_msg", {
                            "group_id": list.data[i].group_id,
                            "message" : "大佬们快点睡觉吧...小狐狸困了。"
                        })
                    }
                })
            
        })})
      },
    main:data => {
        data=JSON.parse(data)
        if (data.message=="小狐狸"){
            global.http.Send_Packet("/send_group_msg", {
                "group_id": data.group_id,
                "message" : "[CQ:reply,id="+data.message_id+"]" +["?", "盯...", "欸?", "嗯?", "怎么了嘛", "嗷呜", "为什么会这样呢?", "嗯....嗯？你好奇怪", "hummm..", "不知道","呜，我在的", "怎么了呀？", "啊啊啊?", "qwq", "嗯嗯", "awa", "你好呀！", "想要...", "嗯....嗯？我在...我在的", "emmmmmmm", "是谁?www"][Math.round(Math.random() * 20)]
            })
        }


    }
}