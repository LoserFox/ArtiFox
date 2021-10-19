const image = require('./image.js')
const schedule = require('node-schedule');
module.exports =  {
    _init: () =>{
        schedule.scheduleJob({hour:0,minute:0,second:0},()=>{

        })
},
    main:data => {

        data=JSON.parse(data)
        if (data.post_type!="message"){return}
        if (data.message == "签到"){ 
            image.image(data)
        }         
        
}}