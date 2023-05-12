const express=require('express')
const router=express.Router()
const dbconnect=require('../../database/dbconnect')
const SchemaShiftTrace=require('../../database/schemas_enerjisa_api/schema_a_shiftTrace')

router.get('/shifttrace',(req,res)=>{
    const dbConnectionError=req.flash('dbConnectionError')
    const shifttraceSavedSuccessfully=req.flash('shifttraceSavedSuccessfully')
    const shifttraceCouldntSave=req.flash('shifttraceCouldntSave')
    res.render('enerjisa_api/a_shifttrace',{
        dbConnectionError:dbConnectionError,
        shifttraceSavedSuccessfully:shifttraceSavedSuccessfully,
        shifttraceCouldntSave:shifttraceCouldntSave
    })
})

router.post('/shifttrace',async(req,res)=>{
    const connection=await dbconnect()
    if (connection==="db_connection_failed") {
        req.flash('dbConnectionError','DB Connection Failed')
        res.redirect('/enerjisaapi/shifttrace')
        return
    }
    try {
        const reqBody=req.body
        const shifttraceapi =reqBody.shifttraceapi
        const shifttrace=JSON.parse(shifttraceapi)
        shifttrace.forEach(async(item) => {
            const schemaShiftTrace=new SchemaShiftTrace({
                VAR_OPERASYON_MERKEZI:item.VAR_OPERASYON_MERKEZI,
                VAR_ADI_SOYAD:item.VAR_ADI_SOYAD,
                VAR_TELEFON_NO:item.VAR_TELEFON_NO, 
                VAR_SICIL:item.VAR_SICIL,
                VAR_VARDIYA_BILGISI:item.VAR_VARDIYA_BILGISI, 
                VAR_SUREC:item.VAR_SUREC,
                VAR_ARAC_PLAKASI:item.VAR_ARAC_PLAKASI,
                ZWFM0064_IS_YERS:item.ZWFM0064_IS_YERS,
                ZWFM0064_SIPARIS_TURU:item.ZWFM0064_SIPARIS_TURU, 
                ZWFM0064_SIPARIS:item.ZWFM0064_SIPARIS, 
                ZWFM0064_TESISAT:item.ZWFM0064_TESISAT,
                ZWFM0064_OM:item.ZWFM0064_OM,
                ZWFM0064_UUID:item.ZWFM0064_UUID, 
                ZWFM0064_TARIH_SAAT:item.ZWFM0064_TARIH_SAAT,
                ZOMS004_SIPARISOLUSMA_TARSHSAAT_IPTL:item.ZOMS004_SIPARISOLUSMA_TARSHSAAT_IPTL,
                ZOMS004_OMS_ID:item.ZOMS004_OMS_ID, 
                ZOMS004_SIPARIS_DURUMU:item.ZOMS004_SIPARIS_DURUMU, 
                ZOMS004_SICILIN_DURUMU:item.ZOMS004_SICILIN_DURUMU, 
                ZOMS004_ILKODU:item.ZOMS004_ILKODU,
                ZOMS004_ILCEKODU:item.ZOMS004_ILCEKODU, 
                ZOMS004_SEMTKODU:item.ZOMS004_SEMTKODU,
                ZOMS004_SOKAKNUMARASI:item.ZOMS004_SOKAKNUMARASI, 
                ZOMS004_ARIZA_ADRESI:item.ZOMS004_ARIZA_ADRESI,
                ZOMS004_ARIZANIN_ILK_GELDIGIZAMAN:item.ZOMS004_ARIZANIN_ILK_GELDIGIZAMAN,
                ZOMS005_ARIZA_ENLEM_DEGERI:item.ZOMS005_ARIZA_ENLEM_DEGERI,
                ZOMS005_ARIZA_BOYLAM_DEGERI:item.ZOMS005_ARIZA_BOYLAM_DEGERI,
                ZOMS005_ARIZA_ISTASYONKODU:item.ZOMS005_ARIZA_ISTASYONKODU,
                ZOMS007_OMSBILDIRIMSAYISI:item.ZOMS007_OMSBILDIRIMSAYISI,
                TESISAT_BILGILERI:item.TESISAT_BILGILERI, 
                ZDM057_TESISAT_ENLEM:item.ZDM057_TESISAT_ENLEM, 
                ZDM057_TESISAT_BOYLAM:item.ZDM057_TESISAT_BOYLAM,
                NIHAI_ARIZA_ENLEMI:item.NIHAI_ARIZA_ENLEMI,
                NIHAI_ARIZA_BOYLAMI:item.NIHAI_ARIZA_BOYLAMI, 
                MOBLZ_ARAC_ADRESI:item.MOBLZ_ARAC_ADRESI,
                MOBLZ_ARAC_ENLEM:item.MOBLZ_ARAC_ENLEM,
                MOBLZ_ARAC_BOYLAM:item.MOBLZ_ARAC_BOYLAM,
                MOBLZ_ARAC_HIZI:item.MOBLZ_ARAC_HIZI,
                MOBLZ_ARAC_DURUMU:item.MOBLZ_ARAC_DURUMU, 
                NIHAI_ARIZA_ENLEMI_2:item.NIHAI_ARIZA_ENLEMI_2, 
                NIHAI_ARIZA_BOYLAMI_2:item.NIHAI_ARIZA_BOYLAMI_2,
                MOBLZ_ARAC_ENLEM_2:item.MOBLZ_ARAC_ENLEM_2,
                MOBLZ_ARAC_BOYLAM_2:item.MOBLZ_ARAC_BOYLAM_2, 
                HESAP_KONUMA_UZAKLIK_MT_:item.HESAP_KONUMA_UZAKLIK_MT_,
                HESAP_HEDEF_KONUMA_DURUM:item.HESAP_HEDEF_KONUMA_DURUM, 
                HESAP_ARIZANIN_SURESI:item.HESAP_ARIZANIN_SURESI, 
                HESAP_ISTE_GECENSURE:item.HESAP_ISTE_GECENSURE,
                ALTKOD_ARIZANEDENI:item.ALTKOD_ARIZANEDENI, 
                ALTKOD_TAHMINI_ISSURESI_DK_:item.ALTKOD_TAHMINI_ISSURESI_DK_,
                ALTKOD_TAHMINI_ISSURESININ_GIRILDIGIZAMAN:item.ALTKOD_TAHMINI_ISSURESININ_GIRILDIGIZAMAN, 
                ALTKOD_SIMDI:item.ALTKOD_SIMDI,
                ALTKOD_TAHMINI_ISSURESININ_GECTIGI_SURE:item.ALTKOD_TAHMINI_ISSURESININ_GECTIGI_SURE, 
                ALTKOD_TAHMINSAAT:item.ALTKOD_TAHMINSAAT, 
                ALTKOD_TAHMINDAKIKA:item.ALTKOD_TAHMINDAKIKA, 
                ALTKOD_TAHMIN_DAKIKAYACEVRILDI:item.ALTKOD_TAHMIN_DAKIKAYACEVRILDI,
                SICIL_SIPARISVARYOK:item.SICIL_SIPARISVARYOK,
                SICIL_VARDIYAMI:item.SICIL_VARDIYAMI,
                SICIL_SON_SIPARISSAATI:item.SICIL_SON_SIPARISSAATI, 
                SICIL_BOSTA_GECEN_SURE:item.SICIL_BOSTA_GECEN_SURE, 
                SICIL_BOSTA_SAAT:item.SICIL_BOSTA_SAAT, 
                SICIL_BOSTA_DAKIKA:item.SICIL_BOSTA_DAKIKA,
                SICIL_BOSTA_DAKIKAYA_CEVIR:item.SICIL_BOSTA_DAKIKAYA_CEVIR,
                SICIL_SONUC_VARDIYA:item.SICIL_SONUC_VARDIYA, 
                SICIL_UYARI_BILGISI:item.SICIL_UYARI_BILGISI, 
                LISTVIEW_ID:item.LISTVIEW_ID, 
            })
           await schemaShiftTrace.save()
        });
        req.flash('shifttraceSavedSuccessfully','Shift Saved Successfully')
        res.redirect('/enerjisaapi/shifttrace') 
    } 
    catch (error) {
        req.flash('shifttraceCouldntSave','Shift Couldnt Save')
        res.redirect('/enerjisaapi/shifttrace') 
    }
})

router.get('/shifttrace-json',async(req,res)=>{
    await dbconnect()
    const schemaShiftTrace=await SchemaShiftTrace.find()
    res.json(schemaShiftTrace)
})

router.get('/shifttrace-delete',async(req,res)=>{
    await dbconnect()
    const schemaShiftTrace=await SchemaShiftTrace.deleteMany({})
    res.redirect('/enerjisaapi/shifttrace')
})

module.exports=router