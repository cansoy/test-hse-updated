const express=require('express')
const router=express.Router()
const dbconnect=require('../../database/dbconnect')
const SchemaEnsafeEvents=require('../../database/schemas_enerjisa_api/schema_c_ensafeevents')

router.get('/ensafeevents',(req,res)=>{
    const dbConnectionError=req.flash('dbConnectionError')
    const ensafeEventsSavedSuccessfully=req.flash('ensafeEventsSavedSuccessfully')
    const ensafeEventsCouldntSave=req.flash('ensafeEventsCouldntSave')
    res.render('enerjisa_api/c_ensafeevents',{
        dbConnectionError:dbConnectionError,
        ensafeEventsSavedSuccessfully:ensafeEventsSavedSuccessfully,
        ensafeEventsCouldntSave:ensafeEventsCouldntSave
    })
})

router.post('/ensafeevents',async(req,res)=>{
    const connection=await dbconnect()
    if (connection==="db_connection_failed") {
       req.flash('dbConnectionError','DB Connection Failed') 
       res.redirect('/enerjisaapi/ensafeevents')
       return
    }
    try {
        const reqBody=req.body
        const ensafeeventsapi=reqBody.ensafeeventsapi
        const ensafeevents=JSON.parse(ensafeeventsapi)
        ensafeevents.forEach(async(item) => {
            const schemaEnsafeEvents=new SchemaEnsafeEvents({
                nameSurname:item.nameSurname,
                eventDate:item.eventDate,
                moduleNo:item.moduleNo,
                eventCategory:item.eventCategory,
                eventMainType:item.eventMainType,
                accidentReason:item.accidentReason,
                eventLastdayOfNumber:item.eventLastdayOfNumber,
                eventNotificationNumber:item.eventNotificationNumber, 
            })
            await schemaEnsafeEvents.save()
        });
        req.flash('ensafeEventsSavedSuccessfully','EnsafeEvents Saved Successfully')
        res.redirect('/enerjisaapi/ensafeevents')
    } 
    catch (error) {
        req.flash('ensafeEventsCouldntSave','EnsafeEvents Couldnt Save')
        res.redirect('/enerjisaapi/ensafeevents')
    }
})

router.get('/ensafeevents-json',async(req,res)=>{
    await dbconnect()
    const schemaEnsafeEvents=await SchemaEnsafeEvents.find()
    res.json(schemaEnsafeEvents)
})


router.get('/ensafeevents-delete',async(req,res)=>{
    await dbconnect()
    const schemaEnsafeEvents=await SchemaEnsafeEvents.deleteMany({})
    res.redirect('/enerjisaapi/ensafeevents')
})

module.exports=router