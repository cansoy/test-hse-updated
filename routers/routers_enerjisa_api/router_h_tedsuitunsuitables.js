const express=require('express')
const router=express.Router()
const dbconnect=require('../../database/dbconnect')
const SchemaTedSuitUnsuitables=require('../../database/schemas_enerjisa_api/schema_h_tedsuitunsuitables')

router.get('/tedsuitunsuitables',(req,res)=>{
    const dbConnectionError=req.flash('dbConnectionError')
    const tedsuitUnsuitablesSavedSuccessfully=req.flash('tedsuitUnsuitablesSavedSuccessfully')
    const tedsuitUnsuitablesCouldntSave=req.flash('tedsuitUnsuitablesCouldntSave')
    res.render('enerjisa_api/h_tedsuitunsuitables',{
        dbConnectionError:dbConnectionError,
        tedsuitUnsuitablesSavedSuccessfully:tedsuitUnsuitablesSavedSuccessfully,
        tedsuitUnsuitablesCouldntSave:tedsuitUnsuitablesCouldntSave
    })
})
router.post('/tedsuitunsuitables',async(req,res)=>{
    const connection=await dbconnect()
    if (connection==="db_connection_failed") {
       req.flash('dbConnectionError','DB Connection Failed') 
       res.redirect('/enerjisaapi/tedsuitunsuitables')
       return
    }
    try {
        const reqBody=req.body
        const tedsuitunsuitablesapi=reqBody.tedsuitunsuitablesapi
        const tedsuitunsuitables=JSON.parse(tedsuitunsuitablesapi)
        tedsuitunsuitables.forEach(async(item) => {
           const schemaTedSuitUnsuitables=new SchemaTedSuitUnsuitables({
            workerId: item.workerId,
            nameSurname:item.nameSurname,
            workOrder: item.workOrder,
            recordDate:item.recordDate,
            unsuitableSituation: item.unsuitableSituation,
            videoLinkPath:item.videoLinkPath,
            whoWatchVideo:item.whoWatchVideo,
            unsuitableExplained:item.unsuitableExplained,
           })
           await schemaTedSuitUnsuitables.save()
        })

        req.flash('tedsuitUnsuitablesSavedSuccessfully','TEDSUIT UNSUITABLES Saved Successfully')
        res.redirect('/enerjisaapi/tedsuitunsuitables')
    }
    catch (error) {
        req.flash('tedsuitUnsuitablesCouldntSave','TEDSUIT UNSUITABLES Couldnt Save')
        res.redirect('/enerjisaapi/tedsuitunsuitables')
    }
})

router.get('/tedsuitunsuitables-json',async(req,res)=>{
    await dbconnect()
    const schemaTedSuitUnsuitables=await SchemaTedSuitUnsuitables.find()
    res.json(schemaTedSuitUnsuitables)
})


router.get('/tedsuitunsuitables-delete',async(req,res)=>{
    await dbconnect()
    const schemaTedSuitUnsuitables=await SchemaTedSuitUnsuitables.deleteMany({})
    res.redirect('/enerjisaapi/tedsuitunsuitables')
})

module.exports=router