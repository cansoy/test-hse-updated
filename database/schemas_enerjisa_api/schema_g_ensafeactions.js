const mongoose=require('mongoose')
const Schema=mongoose.Schema

const schemaEnsafeActions=new Schema({
    actionStatus:{type:String},
    moduleName:{type:String},
    moduleNo:{type:String} ,
    verifiedDate:{type:String},
    whoVerified:{type:String},
    whatIsUnsuitability:{type:String},
    whatIsAction:{type:String},
    deadLine:{type:String},
    whoIsReponsible:{type:String},
    lastExplainationToClose:{type:String} 
})

const SchemaEnsafeActions=mongoose.model('SchemaEnsafeActions',schemaEnsafeActions)
module.exports=SchemaEnsafeActions