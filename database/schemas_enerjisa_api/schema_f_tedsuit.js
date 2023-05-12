const mongoose=require('mongoose')
const Schema=mongoose.Schema

const schemaTedSuit=new Schema({
    workerId:{type:String},
    nameSurname:{type:String},
    channalName:{type:String},
    workOrder:{type:String},
    CreatedDate:{type:String},
    longOfVideo:{type:String},
    OnlineOffine:{type:String},
    videoLinkPath:{type:String},
})

const SchemaTedSuit=mongoose.model('SchemaTedSuit',schemaTedSuit)
module.exports=SchemaTedSuit