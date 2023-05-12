const express=require('express')
const router=express.Router()
const dbconnect=require('../../database/dbconnect')
const SchemaSapWfm=require('../../database/schemas_enerjisa_api/schema_e_sapwfm')

router.get('/:orderno',async(req,res)=>{
    const orderno=req.params.orderno
    await dbconnect()
    const schemaSapWfm=await SchemaSapWfm.find({})
    const workorder=schemaSapWfm.find(item=>item.Siparis==orderno)
    res.render('./client/d_workorders',{workorder:workorder})
})

module.exports=router