var gm = require('gm').subClass({imageMagick: true})
var global = require("../global")
var path = require('path')
var fs = require('fs')
const moment = require("moment")

var image = function get_image(data){
    global.http.Send_Packet("/send_group_msg", {
        "group_id": data.group_id,
        "message" : "小狐狸正在画出来..."
    });
    var today = today_random(data)
    var img_path = path.resolve(path.join("data","img",data.user_id+".png"))
    var text_img_path = path.resolve(path.join("data","img",data.user_id+"_2.png"))
    global.http.Get_Packet("https://api.mtyqx.cn/tapi/random.php",{},(err,rea,body)=>{
        
        if (err){console.error(err);return}
        if (rea.statusCode!=200){console.log(rea.statusCode);return; }
        fs.writeFileSync(img_path,body,"binary")
        var draw_text_img =gm(400,540,"#FFFFFF")
        .font(path.join("font","SourceHanSansCN-Bold.otf"))
        .fontSize(60) 
        .encoding('Unicode')
        if(require('os').platform=="win32"){
        draw_text_img.drawText(20, 70, "'" + greetings() + "'")
        .fontSize(45)
        .fill('#646464') 
        .drawText(240, 70, "'" + moment().format("MM/DD") + "'")
        .font(path.join("font","SourceHanSansCN-Regular.otf"))
        .fontSize(25)
        .fill('#828282') 
        .drawText(20, 155, "'" + "@"+data.sender.nickname+"'")
        .drawText(20, 200, "'" + "今日人品:" +today[0] + "'")      
        .drawText(20, 235, "'" + "好感度+" +today[1] + "'")
        .drawText(20, 270, "'" + "小狐狸现在对你好感:" +today[2] + "'")
        .fill('#FFFFFF')       
        }else{
            draw_text_img.drawText(20, 70, greetings())
            .fontSize(45)
            .fill('#646464')
            .drawText(240, 70, moment().format("MM/DD"))
            .font(path.join("font","SourceHanSansCN-Regular.otf"))
            .fontSize(25)
            .fill('#828282') 
            .drawText(20, 155, "@"+data.sender.nickname)
            .drawText(20, 200, "今日人品:" +today[0])      
            .drawText(20, 235, "好感度+" +today[1])
            .drawText(20, 270, "小狐狸现在对你好感:" +today[2])
            .fill('#FFFFFF')
        }
        draw_text_img.write(text_img_path, function (err) {
            if(err){console.error(err);return;}
            gm(img_path).resize(960,540)
            .write(img_path, function (err) {
                if(err){console.error(err);return;}
                    gm(text_img_path)
                    .append(img_path,true)
                    .write(img_path, function (err) {
                        if(err){console.error(err);return;}
                        global.http.Send_Packet("/send_group_msg", {
                            "group_id": data.group_id,
                            "message" : "[CQ:image,file=file:///"+img_path+"]"
                        });
                })
            })
        })
    
    },{strictSSL: false,'encoding':'binary'})

}
function today_random(data){
    if (global.Save_JSON.today == undefined) {
        global.JSON.JSON_write("Today", {})
      }
      //方便编写
      let user_data=global.Save_JSON.today
      if (user_data[data.user_id] == undefined){
        user_data[data.user_id] = [undefined,0,0]
      }
      if (user_data[data.user_id][0] == undefined) {
        var random = [Math.round(Math.random() * 100),Math.round(Math.random() * 100)]
        random[2]=user_data[data.user_id][1]+random[1]
        user_data[data.user_id] = random
        global.JSON.JSON_save(global.Save_JSON)
      }else{
        var random = user_data[data.user_id]
      }
      return random
}
function greetings() {
    var hour = new Date().getHours()
    if (hour < 6) {
        return("凌晨好")
    } else if (hour < 9) {
        return("早上好")
    } else if (hour < 12) {
        return("上午好")
    } else if (hour < 14) {
        return("中午好")
    } else if (hour < 17) {
        return("下午好")
    } else if (hour < 19) {
        return("傍晚好")
    } else if (hour < 22) {
        return("晚上好")
    } else {
        return("夜里好")
    }
}
module.exports =  {
    image
}