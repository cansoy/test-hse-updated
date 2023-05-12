const express=require('express')
const router=express.Router()
const dbconnect=require('../../database/dbconnect')
const SchemaShiftTrace=require('../../database/schemas_enerjisa_api/schema_a_shiftTrace')
const SchemaEnsafeAudits=require('../../database/schemas_enerjisa_api/schema_b_ensafeaudits')
const SchemaEnsafeEvents=require('../../database/schemas_enerjisa_api/schema_c_ensafeevents')
const SchemaEnsafeNotifications=require('../../database/schemas_enerjisa_api/schema_d_ensafenotifications')
const SchemaTedSuit=require('../../database/schemas_enerjisa_api/schema_f_tedsuit')
const SchemaTedSuitUnsuitables=require('../../database/schemas_enerjisa_api/schema_h_tedsuitunsuitables')

router.get('/:operation',async(req,res)=>{
    await dbconnect()
    const operationName=req.params.operation
    const operationData=await SchemaShiftTrace.find({VAR_OPERASYON_MERKEZI:operationName})
    operationData.sort((a,b)=>a.ZOMS004_OMS_ID-b.ZOMS004_OMS_ID)
    const countOperationData=operationData.length
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const operationDataJustNames=operationData.map(item=>{
        return item.VAR_ADI_SOYAD.split(" _")[0]
    })
    const operationDataJustWorkerId=operationData.map(item=>{
        return item.VAR_SICIL.trim()
    })
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const schemaEnsafeAudits=await SchemaEnsafeAudits.find({})
    const ensafeAuditData=[]
    operationDataJustNames.forEach(name=>{
        schemaEnsafeAudits.forEach(audit=>{
            if (audit.nameSurname==name) {
                ensafeAuditData.push(audit)
            }
        })
    })
    const key = 'nameSurname';
    const uniqueEnsafeAuditData = [...new Map(ensafeAuditData.map(item => [item[key], item])).values()]
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const schemaEnsafeEvents=await SchemaEnsafeEvents.find({})
    const ensafeEventData=[]
    operationDataJustNames.forEach(name=>{
        schemaEnsafeEvents.forEach(event=>{
            if (event.nameSurname==name) {
                ensafeEventData.push(event)
            }
        })
    })
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const schemaEnsafeNotifications=await SchemaEnsafeNotifications.find({})
        const ensafeNotificationData=[]
        operationDataJustNames.forEach(name=>{
            schemaEnsafeNotifications.forEach(notification=>{
                if (notification.nameSurname==name) {
                    ensafeNotificationData.push(notification)
                }
            })
        })
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const schemaTedSuit=await SchemaTedSuit.find({})
        const tedsuitMaindata=[]
        operationDataJustWorkerId.forEach(workerid=>{
            schemaTedSuit.forEach(tedsuit=>{
                if (workerid==tedsuit.workerId) {
                    tedsuitMaindata.push(tedsuit)
                }
            })
        })
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const schemaTedSuitUnsuitables=await SchemaTedSuitUnsuitables.find({})
        const tedsuitUnsuitableData=[]
        operationDataJustWorkerId.forEach(workerid=>{
            schemaTedSuitUnsuitables.forEach(tedsuit=>{
                if (tedsuit.workerId==workerid) {
                    tedsuitUnsuitableData.push(tedsuit)
                }
            })
        })
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    res.render('./client/c_operations',{
        operationName:operationName,
        countOperationData:countOperationData,
        operationData:operationData,
        uniqueEnsafeAuditData:uniqueEnsafeAuditData,
        ensafeEventData:ensafeEventData,
        ensafeNotificationData:ensafeNotificationData,
        tedsuitMaindata:tedsuitMaindata,
        tedsuitUnsuitableData:tedsuitUnsuitableData
    })
})

module.exports=router