const express=require('express')
const router=express.Router()
const dbconnect=require('../../database/dbconnect')
const SchemaEnsafeActions=require('../../database/schemas_enerjisa_api/schema_g_ensafeactions')

router.get('/ensafeactions',(req,res)=>{
    const dbConnectionError=req.flash('dbConnectionError')
    const ensafeActionsSavedSuccessfully=req.flash('ensafeActionsSavedSuccessfully')
    const ensafeActionsCouldntSave=req.flash('ensafeActionsCouldntSave')
    res.render('enerjisa_api/g_ensafeactions',{
        dbConnectionError:dbConnectionError,
        ensafeActionsSavedSuccessfully:ensafeActionsSavedSuccessfully,
        ensafeActionsCouldntSave:ensafeActionsCouldntSave
    })
})

router.post('/ensafeactions',async(req,res)=>{
    const connection=await dbconnect()
    if (connection==="db_connection_failed") {
       req.flash('dbConnectionError','DB Connection Failed') 
       res.redirect('/enerjisaapi/ensafeactions')
       return
    }
    try {
        const reqBody=req.body
        const ensafeactionsapi=reqBody.ensafeactionsapi
        const ensafeactions=JSON.parse(ensafeactionsapi)
        ensafeactions.forEach(async(item) => {
            const schemaEnsafeActions=new SchemaEnsafeActions({
                actionStatus:item.actionStatus,
                moduleName:item.moduleName,
                moduleNo:item.moduleNo, 
                verifiedDate:item.verifiedDate,
                whoVerified:item.whoVerified,
                whatIsUnsuitability:item.whatIsUnsuitability,
                whatIsAction:item.whatIsAction,
                deadLine:item.deadLine,
                whoIsReponsible:item.whoIsReponsible,
                lastExplainationToClose:item.lastExplainationToClose, 
            })
            await schemaEnsafeActions.save()
        });
        req.flash('ensafeActionsSavedSuccessfully','EnsafeActions Saved Successfully')
        res.redirect('/enerjisaapi/ensafeactions')
    } 
    catch (error) {
        req.flash('ensafeActionsCouldntSave','EnsafeActions Couldnt Save')
        res.redirect('/enerjisaapi/ensafeactions') 
    }
})

router.get('/ensafeactions-json',async(req,res)=>{
    await dbconnect()
    const schemaEnsafeActions=await SchemaEnsafeActions.find()
    res.json(schemaEnsafeActions)
})


router.get('/ensafeactions-delete',async(req,res)=>{
    await dbconnect()
    const schemaEnsafeActions=await SchemaEnsafeActions.deleteMany({})
    res.redirect('/enerjisaapi/ensafeactions')
})

module.exports=router