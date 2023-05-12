const express=require('express')
const router=express.Router()
const dbconnect=require('../../database/dbconnect')
const SchemaTedSuit=require('../../database/schemas_enerjisa_api/schema_f_tedsuit')

router.get('/tedsuit',(req,res)=>{
    const dbConnectionError=req.flash('dbConnectionError')
    const tedsuitSavedSuccessfully=req.flash('tedsuitSavedSuccessfully')
    const tedsuitCouldntSave=req.flash('tedsuitCouldntSave')
    res.render('enerjisa_api/f_tedsuit',{
        dbConnectionError:dbConnectionError,
        tedsuitSavedSuccessfully:tedsuitSavedSuccessfully,
        tedsuitCouldntSave:tedsuitCouldntSave
    })
})

router.post('/tedsuit',async(req,res)=>{
    const connection=await dbconnect()
    if (connection==="db_connection_failed") {
       req.flash('dbConnectionError','DB Connection Failed') 
       res.redirect('/enerjisaapi/tedsuit')
       return
    }
    try {
        const reqBody=req.body
        const tedsuitapi=reqBody.tedsuitapi
        const tedsuit=JSON.parse(tedsuitapi)
        tedsuit.forEach(async(item) => {
           const schemaTedSuit=new SchemaTedSuit({
            workerId:item.workerId,
            nameSurname:item.nameSurname,
            channalName:item.channalName,
            workOrder:item.workOrder,
            CreatedDate:item.CreatedDate,
            longOfVideo:item.longOfVideo,
            OnlineOffine:item.OnlineOffine,
            videoLinkPath:item.videoLinkPath,
           })
           await schemaTedSuit.save()
        })
        req.flash('tedsuitSavedSuccessfully','TEDSUIT Saved Successfully')
        res.redirect('/enerjisaapi/tedsuit')
    }
    catch (error) {
        req.flash('tedsuitCouldntSave','TEDSUIT Couldnt Save')
        res.redirect('/enerjisaapi/tedsuit')
    }
})

router.get('/tedsuit-json',async(req,res)=>{
    await dbconnect()
    const schemaTedSuit=await SchemaTedSuit.find()
    res.json(schemaTedSuit)
})


router.get('/tedsuit-delete',async(req,res)=>{
    await dbconnect()
    const schemaTedSuit=await SchemaTedSuit.deleteMany({})
    res.redirect('/enerjisaapi/tedsuit')
})

module.exports=router