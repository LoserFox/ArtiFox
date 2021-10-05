const fs = require('fs');
module.exports =  {

  JSON_write:function(name, value, object ,path="Data.json") {
    try {
      object[name] = value
      console.log("[Info] Json写入了" + name);
      
    } catch (err) {
      console.log(err);
    }
    //写入到目录
    fs.writeFileSync(path, JSON.stringify(object, null, "\t"), 'utf-8', (err) => {
      if (err) throw err;
      console.log('[error] 写入JSON数据失败');
    })
},
//获取JSON物体
  JSON_save:function(object ,path="Data.json"){
    fs.writeFileSync(path, JSON.stringify(object, null, "\t"), 'utf-8', (err) => {
      if (err) throw err;
      console.log('[error] 写入JSON数据失败');
    })
  }
}