const mongoose=require('mongoose')
const Schema=mongoose.Schema

const schemaEnsafeAudits=new Schema({
    moduleNo:{type:String},
    nameSurname:{type:String},
    actionWithoutAction:{type:String},
    auditDate:{type:String},
    sumOfAudit:{type:String},
    sumOfActionAudit:{type:String},
    sumOfWithoutActionAudit:{type:String},
    lastAuditDate:{type:String},
})

const SchemaEnsafeAudits=mongoose.model('SchemaEnsafeAudits',schemaEnsafeAudits)
module.exports=SchemaEnsafeAudits