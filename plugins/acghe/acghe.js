const global = require("../global")
module.exports =  {
    _init: () =>{
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
        
}}