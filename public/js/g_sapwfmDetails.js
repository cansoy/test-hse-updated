import { UI } from "./UI.js";

UI.sapwfm.forEach(item=>{
    item.addEventListener('click',async(e)=>{
        UI.detailPanel.innerHTML=""
        UI.detailPanel.classList.remove('detail-show-shifttrace')
        const workerId=e.target.dataset.sapwfmWorkerid

        const tedsuitResponse=await fetch('/enerjisaapi/tedsuit-json')
        const tedsuitData=await tedsuitResponse.json()

        const response=await fetch('/enerjisaapi/sapwfm-json')
        const data =await response.json()
        const workerIdData=data.filter(item=>item.Isim==workerId)
        const workerIdDataAddedLinks=workerIdData.map(item=>{
            return {
                Tur:item.Tur,
                Arizab_t_:item.Arizab_t_,
                Nedenmetni:item.Nedenmetni,
                Aciklama:item.Aciklama,
                Yolsuresi:item.Yolsuresi,
                Clsmasur_:item.Clsmasur_,
                BIldirimAciklmasi:item.BIldirimAciklmasi,
                Siparis:item.Siparis,
                OmsID:item.OmsID,
                EkipIsimleri:item.EkipIsimleri,
                tedSuitVideoPaths:"",
            }
        })
        workerIdDataAddedLinks.forEach(sapwfm=>{
            tedsuitData.forEach(item=>{
                if (item.workOrder==sapwfm.Siparis) {
                    sapwfm.tedSuitVideoPaths=`${sapwfm.tedSuitVideoPaths}||
                                                <li class="detail-tedsuit-link"> <a href="${item.videoLinkPath}" target="_blank">
                                                        <img class="icon-tedsuitwatch" src="../../svg/tedsuitplaydetail.svg">
                                                    </a>
                                                </li>`
                }
            })
        })
        
        const totalCompletedOrdersNumber=workerIdDataAddedLinks.length
        let rowCounter=0
        workerIdDataAddedLinks.sort((a,b)=>b.Siparis-a.Siparis)
        const sapTableOfContent=workerIdDataAddedLinks.map(item=>{
            return`
                    <div class="created-detail-table">
                        <p class="tedsuit-row-counter">${++rowCounter}=>${item.Siparis}=>${item.EkipIsimleri}</p>
                        <div class="detail-column">
                            <div class="row">Sipariş Türü:</div>
                            <div class="row">${item.Tur}</div>
                        </div>
                        <div class="detail-column">
                            <div class="row">Çalışma (Kesintili/Kesintisiz):</div>
                            <div class="row">${item.Arizab_t_}</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                            <div class="row">Arıza Neden Oluştu:</div>
                            <div class="row">${item.Nedenmetni}</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                            <div class="row">Açıklması:</div>
                            <div class="row">${item.Aciklama}</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                            <div class="row">Yol-Çalışma Süresi:</div>
                            <div class="row">${item.Yolsuresi}dk -${item.Clsmasur_}dk</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                            <div class="row">Müşteri Bildirimi:</div>
                            <div class="row">${item.BIldirimAciklmasi.replace("%"," ")}</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                            <div class="row">Görüntülü Teyitleri:</div>
                            <div class="row">${item.tedSuitVideoPaths.split("||")}</div>
                        </div>
                    </div>
                    `
        })
        const sapTableOfContentHtml = sapTableOfContent.join("")
        UI.detailPanel.innerHTML= sapTableOfContentHtml
        UI.detailPanel.classList.add('detail-show-shifttrace')
    })
})

