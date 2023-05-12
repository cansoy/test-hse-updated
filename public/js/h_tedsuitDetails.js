import { UI } from "./UI.js";

UI.tedsuitInformations.forEach(item=>{
    item.addEventListener('click',async(e)=>{
        UI.detailPanel.innerHTML=""
        UI.detailPanel.classList.remove('detail-show-shifttrace')
        const workerId=e.target.dataset.tedsuitWorkerid
        
        const reponse_main=await fetch('/enerjisaapi/tedsuit-json')
        const data_main =await reponse_main.json()
        const workerIdData_main=data_main.filter(tedsuit=>tedsuit.workerId==workerId)
        const reponse_unsuitable=await fetch('/enerjisaapi/tedsuitunsuitables-json')
        const data_unsuitable =await reponse_unsuitable.json()
        const workerIdData_unsuitable=data_unsuitable.filter(tedsuit=>tedsuit.workerId==workerId)
        const counttedusitUnsutables= workerIdData_unsuitable.length
        let rowCounter=0
        workerIdData_main.sort((a,b)=>b.workOrder-a.workOrder)
        const workerIdData_mainMap=workerIdData_main.map(item=>{
            return `<div class="created-detail-table">
                        <p class="tedsuit-row-counter">${item.workOrder}=>${++rowCounter}</p>
                        <div class="detail-column">
                            <div class="row">İsim Soyisim:</div>
                            <div class="row">${item.nameSurname}</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                            <div class="row">Teyit/Kayıt Zamanı:</div>
                            <div class="row">${item.CreatedDate}</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                            <div class="row">Teyit/Kayıt Türü:</div>
                            <div class="row">${item.OnlineOffine}</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                            <div class="row">İş Emri No:</div>
                            <div class="row">
                                <a href="/enerjisa/order/${item.workOrder}" target="_blank">
                                ${item.workOrder}
                                <img class="icon-tedsuitwatch" src="../../svg/workorderdetail.svg">
                            </div>
                        </div>
                        <hr>
                        <div class="detail-column">
                            <div class="row">Teyit/Kayıt Türü:</div>
                            <div class="row">
                                <a href="${item.videoLinkPath}" target="_blank">
                                    İzle
                                    <img class="icon-tedsuitwatch" src="../../svg/tedsuitplaydetail.svg">
                                </a>
                            </div>
                        </div>
                        <hr>
                    </div>
            `
        })

        if (counttedusitUnsutables>0) {
            let rowCounter=0
            const unsuitableTables=workerIdData_unsuitable.map(item=>{
                return `
                        <div class="detail-column-unsuitables">
                        <p class="tedsuit-row-counter">
                            ${++rowCounter}
                            <img class="icon-tedsuitwatch-warn" src="../../svg/tedsuitunsuitablewarn.svg"> 
                        </p>
                        </div>
                        <div class="detail-column-unsuitables row-summary-nth">
                            <span class="row-summary">EK: 1</span>
                            <span class="row-summary">DÖK : 2</span>
                            <span class="row-summary">EV : 2</span>
                            <span class="row-summary">EKED : 2</span>
                            <span class="row-summary">YÜK.Ç : 2</span>
                            <span class="row-summary">YOL : 2</span>
                            <span class="row-summary">DİĞER : 2</span>
                        </div>
                        <div class="detail-column-unsuitables">
                            <div class="row">Uygunsuzluk Konusu:</div>
                            <div class="row">${item.unsuitableSituation}</div>
                        </div>
                        <div class="detail-column-unsuitables">
                            <div class="row">Uygunsuzluk Açıklması:</div>
                            <div class="row">${item.unsuitableExplained}</div>
                        </div>
                        <div class="detail-column-unsuitables">
                            <div class="row">Kayıt Tarihi:</div>
                            <div class="row">${item.recordDate}</div>
                        </div>
                        <div class="detail-column-unsuitables">
                            <div class="row">Video Linki:</div>
                            <div class="row">
                                <a href="${item.videoLinkPath}" target="_blank">
                                    İzle
                                    <img class="icon-tedsuitwatch" src="../../svg/tedsuitplaydetail.svg">
                                </a>
                            </div>
                        </div>
                    `
            })
            unsuitableTables.forEach(item=>{
                workerIdData_mainMap.push(item)
            })
        }
        const workerIdData_mainMapHtml = workerIdData_mainMap.join("")
        UI.detailPanel.innerHTML= workerIdData_mainMapHtml
        UI.detailPanel.classList.add('detail-show-shifttrace')
    })
})