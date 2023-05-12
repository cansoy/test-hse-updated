const express=require('express')
const dbconnect = require('../../database/dbconnect')
const SchemaEnsafeAudits=require('../../database/schemas_enerjisa_api/schema_b_ensafeaudits')
const router=express()

router.get('/ensafeaudits',(req,res)=>{
    const dbConnectionError=req.flash('dbConnectionError')
    const ensafeAuditsSavedSuccessfully=req.flash('ensafeAuditsSavedSuccessfully')
    const ensafeAuditsCouldntSave=req.flash('ensafeAuditsCouldntSave')
    res.render('enerjisa_api/b_ensafeaudits',{
        dbConnectionError:dbConnectionError,
        ensafeAuditsSavedSuccessfully:ensafeAuditsSavedSuccessfully,
        ensafeAuditsCouldntSave:ensafeAuditsCouldntSave
    })
})

router.post('/ensafeaudits',async(req,res)=>{
    const connection=await dbconnect()
    if (connection==="db_connection_failed") {
        req.flash('dbConnectionError','DB Connection Failed')
        res.redirect('/enerjisaapi/ensafeaudits')
        return
    }
    try {
        const reqBody=req.body
        const ensafeauditsapi=reqBody.ensafeauditsapi
        const ensafeaudits=JSON.parse(ensafeauditsapi)
        ensafeaudits.forEach(async(item) => {
            const schemaEnsafeAudits=new SchemaEnsafeAudits({
                moduleNo:item.moduleNo,
                nameSurname:item.nameSurname,
                actionWithoutAction:item.actionWithoutAction,
                auditDate:item.auditDate,
                sumOfAudit:item.sumOfAudit,
                sumOfActionAudit:item.sumOfActionAudit,
                sumOfWithoutActionAudit:item.sumOfWithoutActionAudit,
                lastAuditDate:item.lastAuditDate,
            })
            await schemaEnsafeAudits.save()
        });
        req.flash('ensafeAuditsSavedSuccessfully','EnsafeAudits Saved Successfully')
        res.redirect('/enerjisaapi/ensafeaudits')
    } 
    catch (error) {
        req.flash('ensafeAuditsCouldntSave','EnsafeAudits Couldnt Save')
        res.redirect('/enerjisaapi/ensafeaudits') 
    }
})

router.get('/ensafeaudits-json',async(req,res)=>{
    await dbconnect()
    const schemaEnsafeAudits=await SchemaEnsafeAudits.find()
    res.json(schemaEnsafeAudits)
})

router.get('/ensafeaudits-delete',async(req,res)=>{
    await dbconnect()
    const schemaEnsafeAudits=await SchemaEnsafeAudits.deleteMany({})
    res.redirect('/enerjisaapi/ensafeaudits')
})

module.exports=router