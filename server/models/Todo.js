const mongoose = require('mongoose');
const Schema=mongoose.Schema
const Todo=new mongoose.Schema({
   title:{
       type:String
   },
   description:{
       type:String
   },
   url:{
       type:String
   },
   status:{
       type:String,
       enum:["TO DO","DOING","DONE"]
   },
   user:{
       type:Schema.Types.ObjectId,
       ref:"users"
   }
})
module.exports=mongoose.model("todo",Todo)