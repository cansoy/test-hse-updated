const express=require('express')
const router=express.Router()
const dbconnect=require('../../database/dbconnect')
const SchemaEnsafeNotifications=require('../../database/schemas_enerjisa_api/schema_d_ensafenotifications')

router.get('/ensafenotifications',(req,res)=>{
    const dbConnectionError=req.flash('dbConnectionError')
    const ensafeNotificationsSavedSuccessfully=req.flash('ensafeNotificationsSavedSuccessfully')
    const ensafeNotificationsCouldntSave=req.flash('ensafeNotificationsCouldntSave')
    res.render('enerjisa_api/d_ensafenotifications',{
        dbConnectionError:dbConnectionError,
        ensafeNotificationsSavedSuccessfully:ensafeNotificationsSavedSuccessfully,
        ensafeNotificationsCouldntSave:ensafeNotificationsCouldntSave
    })
})

router.post('/ensafenotifications',async(req,res)=>{
    const connection=await dbconnect()
    if (connection==="db_connection_failed") {
       req.flash('dbConnectionError','DB Connection Failed') 
       res.redirect('/enerjisaapi/ensafenotifications')
       return
    }
    try {
        const reqBody=req.body
        const ensafenotificationsapi=reqBody.ensafenotificationsapi
        const ensafenotifications=JSON.parse(ensafenotificationsapi)
        ensafenotifications.forEach(async(item) => {
            const schemaEnsafeNotifications=new SchemaEnsafeNotifications({
                nameSurname:item.nameSurname,
                moduleNo:item.moduleNo,
                notificationType:item.notificationType,
                notificationDate:item.notificationDate,
                notificationExplanation:item.notificationExplanation,
                sonOfNotificationNumbers:item.sonOfNotificationNumbers,
            })
            await schemaEnsafeNotifications.save()
        });
        req.flash('ensafeNotificationsSavedSuccessfully','EnsafeNotifications Saved Successfully')
        res.redirect('/enerjisaapi/ensafenotifications')
    } 
    catch (error) {
        req.flash('ensafeNotificationsCouldntSave','EnsafeNotifications Couldnt Save')
        res.redirect('/enerjisaapi/ensafenotifications') 
    }
})

router.get('/ensafenotifications-json',async(req,res)=>{
    await dbconnect()
    const schemaEnsafeNotifications=await SchemaEnsafeNotifications.find()
    res.json(schemaEnsafeNotifications)
})


router.get('/ensafenotifications-delete',async(req,res)=>{
    await dbconnect()
    const schemaEnsafeNotifications=await SchemaEnsafeNotifications.deleteMany({})
    res.redirect('/enerjisaapi/ensafenotifications')
})

module.exports=router