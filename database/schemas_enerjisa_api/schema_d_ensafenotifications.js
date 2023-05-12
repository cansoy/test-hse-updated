const mongoose=require('mongoose')
const Schema=mongoose.Schema

const schemaEnsafeNotifications=new Schema({
    nameSurname:{type:String},
    moduleNo:{type:String},
    notificationType:{type:String},
    notificationDate:{type:String},
    notificationExplanation:{type:String},
    sonOfNotificationNumbers:{type:String},
})

const SchemaEnsafeNotifications=mongoose.model('SchemaEnsafeNotifications',schemaEnsafeNotifications)
module.exports=SchemaEnsafeNotifications