const express=require('express')
const router=express.Router()
const dbconnect=require('../../database/dbconnect')
const SchemaShiftTrace=require('../../database/schemas_enerjisa_api/schema_a_shiftTrace')

router.get('/',async(req,res)=>{
    res.redirect("/enerjisa/home")
})

router.get('/home',async(req,res)=>{
    await dbconnect()
    const operationNames=await SchemaShiftTrace.aggregate([
        {$group:{_id:"$VAR_OPERASYON_MERKEZI"}},
        {$sort:{_id:1}}
    ])
    res.render('./client/b_home',{
        operationNames:operationNames
    })
})

module.exports=router
