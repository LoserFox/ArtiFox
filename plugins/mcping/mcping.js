var global = require("../global")
const mcping = require('minecraft-protocol');

module.exports =  {
    _init: () =>{
      },
    main:data => {
        data=JSON.parse(data)
        tags=data.message.split(" ")
        tags=tags.split(":")
        if (tags[0] =="/mcping"){
            if (tags[1]!=undefined && tags[2]!=undefined){
                mcping.ping({ host: tags[1], port: tags }, (err, pingResults) => {
                    if (err) throw err
                    global.http.Send_Packet("/send_group_msg", {
                        "group_id": data.group_id,
                        "message" : JSON.stringify(pingResults)
                    })
                })
            }
        }

    }
}