const mongoose=require('mongoose')
const Schema=mongoose.Schema

const schemaTedSuitUnsuitables=new Schema({
    workerId: {type:String},
    nameSurname:{type:String},
    workOrder: {type:String},
    recordDate:{type:String},
    unsuitableSituation: {type:String},
    videoLinkPath:{type:String},
    whoWatchVideo:{type:String},
    unsuitableExplained:{type:String},
})

const SchemaTedSuitUnsuitables=mongoose.model('SchemaTedSuitUnsuitables',schemaTedSuitUnsuitables)
module.exports=SchemaTedSuitUnsuitables