var global = require("../global");
const gm = require('gm').subClass({imageMagick: true});
const fs = require('fs')
const path = require('path')
module.exports =  {
    _init: () =>{},
    main:data => {
        data=JSON.parse(data)
        if (data.post_type!="message"){return}
        tags=data.message.split("|");
        if (tags[0]=="/图片" && tags[1]!=undefined){
            console.log("生成图片")
            var img = gm(800, 2000, "#ffffffff")
            
            img.font("./Font.ttf")
            tags[2]?undefined:()=>{tags[2]=36}
            img.fontSize(tags[2]) 
            img.encoding('Unicode')
            img.drawText(0, tags[2], "'" + tags[1] + "'")//整个js脚本最废时间的地方
            image_path=path.join("data","img",data.user_id+".png")
            img.write(image_path, function (err) {
                if(err){console.error(err);return;}
                global.http.Send_Packet("/send_group_msg", {
                    "group_id": data.group_id,
                    "message" : "[CQ:image,file=file:///"+path.resolve(image_path)+"]"
                });
            })
            
        }
    }
};