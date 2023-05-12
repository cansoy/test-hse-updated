import { UI } from "./UI.js";

UI.shiftTraceWorkerIds.forEach(item=>{
    item.addEventListener('click',async(e)=>{
        UI.detailPanel.innerHTML=""
        UI.detailPanel.classList.remove('detail-show-shifttrace')
        const workerId=e.target.dataset.workerId
        const reponse=await fetch('/enerjisaapi/shifttrace-json')
        const data =await reponse.json()
        const workerIdData=data.filter(shiftdata=>shiftdata.VAR_SICIL==workerId)
        const workerIdDataHtml=workerIdData.map(item=>{
            return `<div class="created-detail-table">
                        <p class="tedsuit-row-counter">${item.VAR_ADI_SOYAD}</p>
                        <div class="detail-column">
                            <div class="row">İsim Soyisim:</div>
                            <div class="row">${item.VAR_ADI_SOYAD}</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                            <div class="row">Telefon Numarası:</div>
                            <div class="row">${item.VAR_TELEFON_NO}</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                           <div class="row">Vardiya Bilgisi:</div>
                           <div class="row">${item.VAR_VARDIYA_BILGISI}</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                           <div class="row">Sorumlu Olduğu Süreç:</div>
                           <div class="row">${item.VAR_SUREC}</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                           <div class="row">Araç Plakası:</div>
                           <div class="row">${item.VAR_ARAC_PLAKASI}</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                           <div class="row">Sicilin Tablette Durumu:</div>
                           <div class="row">${item.ZOMS004_SICILIN_DURUMU}</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                           <div class="row">Hedefe Uzaklık:</div>
                           <div class="row">${parseFloat(item.HESAP_KONUMA_UZAKLIK_MT_).toFixed(0).replace("NaN","-")} mt</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                           <div class="row">Sipariş Türü:</div>
                           <div class="row">${item.ZWFM0064_SIPARIS_TURU}</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                           <div class="row">SAP Sipariş No:</div>
                           <div class="row"> ${item.ZWFM0064_SIPARIS}</div>
                        </div>
                        
                        <hr>
                        <div class="detail-column">
                           <div class="row">OMS Sipariş No:</div>
                           <div class="row">${item.ZOMS004_OMS_ID}</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                           <div class="row">Arıza Süresi(Şuana Kadar):</div>
                           <div class="row">${(parseFloat(item.HESAP_ARIZANIN_SURESI.replace(",",".")).toFixed(3)*60).toFixed(0)} DK</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                           <div class="row">İşte Geçen Süre(Şuana Kadar):</div>
                           <div class="row">${(parseFloat(item.HESAP_ISTE_GECENSURE.replace(",",".")).toFixed(3)*60).toFixed(0)} DK</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                           <div class="row">Ekstra Uyarı Bilgisi:</div>
                           <div class="row">${item.SICIL_UYARI_BILGISI}</div>
                        </div>
                        <hr> 
                        <div class="detail-column">
                           <div class="row">İşin Adresi:</div>
                           <div class="row">${item.ZOMS004_ARIZA_ADRESI}</div>
                        </div>
                        <br>
                    </div>
                    `
        })

        UI.detailPanel.innerHTML=workerIdDataHtml.join("")
        UI.detailPanel.classList.add('detail-show-shifttrace')
    
        const createdNewTable=document.querySelector(".created-detail-table")
        const createdNewTableColumns=document.querySelectorAll(".created-detail-table .detail-column")
        const createdNewTableRows=document.querySelectorAll(".created-detail-table .row")
        
        createdNewTable.classList.add('shift-flex-detail-table')
        createdNewTableColumns.forEach(item=>{
            item.classList.add("detail-column")
        })
        createdNewTableRows.forEach(item=>{
            item.classList.add("row")
        })
        
    })
})

