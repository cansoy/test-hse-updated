const express=require('express')
const router=express.Router()
const dbconnect=require('../../database/dbconnect')
const SchemaSapWfm=require('../../database/schemas_enerjisa_api/schema_e_sapwfm')

router.get('/sapwfm',(req,res)=>{
    const dbConnectionError=req.flash('dbConnectionError')
    const sapWfmSavedSuccessfully=req.flash('sapWfmSavedSuccessfully')
    const sapWfmCouldntSave=req.flash('sapWfmCouldntSave')
    res.render('enerjisa_api/e_sapwfm',{
        dbConnectionError:dbConnectionError,
        sapWfmSavedSuccessfully:sapWfmSavedSuccessfully,
        sapWfmCouldntSave:sapWfmCouldntSave
    })
})

router.post('/sapwfm',async(req,res)=>{
    const connection=await dbconnect()
    if (connection==="db_connection_failed") {
       req.flash('dbConnectionError','DB Connection Failed') 
       res.redirect('/enerjisaapi/sapwfm')
       return
    }
    try {
        const reqBody=req.body
        const sapwfmapi=reqBody.sapwfmapi
        const sapwfm=JSON.parse(sapwfmapi)
        sapwfm.forEach(async(item) => {
           const schemaSapWfm=new SchemaSapWfm({
            Muhatap:item.Muhatap,
            Kayittrh_:item.Kayittrh_,
            Tur:item.Tur, 
            BOaktivitetu_tnm_:item.BOaktivitetu_tnm_,
            Arizab_t_:item.Arizab_t_,
            ArizaAltkodutanimi:item.ArizaAltkodutanimi,
            Nedenmetni:item.Nedenmetni, 
            Siparis:item.Siparis,
            Arizabsl_:item.Arizabsl_,
            Arz_bsl_:item.Arz_bsl_,
            Hrk_bas_tr:item.Hrk_bas_tr,
            Hrk_bas_st:item.Hrk_bas_st,
            HareketBslTrhSaat:item.HareketBslTrhSaat,
            Cls_bas_:item.Cls_bas_,
            Cls_bit_:item.Cls_bit_,
            CalismaBitis:item.CalismaBitis,
            Dns_bsl_s_:item.Dns_bsl_s_,
            Yolsuresi:item.Yolsuresi,
            Clsmasur_:item.Clsmasur_, 
            Dns_suresi:item.Dns_suresi,
            Teyitveren:item.Teyitveren,
            GercekEkipKodlari:item.GercekEkipKodlari,
            EkipIsimleri:item.EkipIsimleri,
            IlkIsSaati:item.IlkIsSaati,
            IsBitisSaati:item.IsBitisSaati,
            IkiIsArasiSure:item.IkiIsArasiSure, 
            Isyeri:item.Isyeri,
            IslemKodu:item.IslemKodu,
            Aciklama:item.Aciklama,
            Anah_e_1:item.Anah_e_1, 
            DpYr:item.DpYr, 
            Plaka:item.Plaka,
            Hes_nedeni:item.Hes_nedeni, 
            Kesmetar_:item.Kesmetar_,
            Kesmesaat:item.Kesmesaat,
            KesongBi:item.KesongBi,
            Kesintion:item.Kesintion,
            HHEnerjiTrh:item.HHEnerjiTrh,
            HHEnerjiSaat:item.HHEnerjiSaat,
            BIldirimSayisi:item.BIldirimSayisi,
            BIldirimID:item.BIldirimID, 
            BIldirimAciklmasi:item.BIldirimAciklmasi, 
            OmsID:item.OmsID,
            KullanilanMalzemeler:item.KullanilanMalzemeler,
            KullanilanMalzemeAdetleri:item.KullanilanMalzemeAdetleri, 
            KullanilanMalzemeTutarlari_TL_:item.KullanilanMalzemeTutarlari_TL_, 
            Isim:item.Isim,
        })
           await schemaSapWfm.save()
        });
        req.flash('sapWfmSavedSuccessfully','SAPWFM Saved Successfully')
        res.redirect('/enerjisaapi/sapwfm')
    }
    catch (error) {
        req.flash('sapWfmCouldntSave','SAPWFM Couldnt Save')
        res.redirect('/enerjisaapi/sapwfm')
    }
})

router.get('/sapwfm-json',async(req,res)=>{
    await dbconnect()
    const schemaSapWfm=await SchemaSapWfm.find()
    res.json(schemaSapWfm)
})


router.get('/sapwfm-delete',async(req,res)=>{
    await dbconnect()
    const schemaSapWfm=await SchemaSapWfm.deleteMany({})
    res.redirect('/enerjisaapi/sapwfm')
})

module.exports=router