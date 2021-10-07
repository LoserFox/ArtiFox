var global = require("../global");
const mcping = require('minecraft-protocol');
const fs = require('fs')
const path = require('path')
module.exports =  {
    _init: () =>{},
    main:data => {
        try {  
            data=JSON.parse(data);
            if (data.post_type!="message"){return}
            tags=data.message.split(" ");
            if (tags[0] == "/mcping"){
                tags[1]=tags[1].split(":");
                if (tags[1][0] != undefined){
                    tags[1][1]?(undefined):tags[1][1]=25565
                    global.http.Send_Packet("/send_group_msg", {"group_id": data.group_id,"message" : "小狐狸正在出发去寻找伺候器..."})
                    mcping.ping({ host: tags[1][0], port: tags[1][1] }, (err, pingResults) => {
                        
                        if (err) {global.http.Send_Packet("/send_group_msg", {"group_id": data.group_id,"message" : "啊咧咧？怎么找不到伺候器啊...这绝对不是小狐狸的错!绝对不是!qwq"});console.log(err);return;}
                        //清除彩色字
                        if (typeof pingResults.description=='object')pingResults.description=JSON.stringify(pingResults.description)
                        pingResults.description = pingResults.description.replace(/§./g, '')
                        var file_path = path.join("data","img",tags[1][0]+".png")
                        fs.writeFileSync(file_path,Buffer.from(pingResults.favicon.replace(/^data:image\/\w+;base64,/, ""), 'base64'))
                        
                        global.http.Send_Packet("/send_group_msg", {
                            "group_id": data.group_id,
                            "message" : "[CQ:image,file=file:///"+path.resolve(file_path)+"]"+pingResults.description+"\n[版本："+pingResults.version.name+"]\n[在线玩家："+pingResults.players.online+" / "+pingResults.players.max+"]"
                            });
                    });
                    
                };
            };
        }catch (error) {
            console.log(error);
        };
    }
};