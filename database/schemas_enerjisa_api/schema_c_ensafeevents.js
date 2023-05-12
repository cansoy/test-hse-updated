const mongoose=require('mongoose')
const Schema=mongoose.Schema

const schemaEnsafeEvents=new Schema({
    nameSurname:{type:String},
    eventDate:{type:String},
    moduleNo:{type:String},
    eventCategory:{type:String},
    eventMainType:{type:String},
    accidentReason:{type:String},
    eventLastdayOfNumber:{type:String},
    eventNotificationNumber:{type:String},
})

const SchemaEnsafeEvents=mongoose.model('SchemaEnsafeEvents',schemaEnsafeEvents)
module.exports=SchemaEnsafeEvents