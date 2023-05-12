import { UI } from "./UI.js";

UI.shiftTraceLocationDetails.forEach(item=>{
    item.addEventListener('click',async(e)=>{
        UI.detailPanel.innerHTML=""
        UI.detailPanel.classList.remove('detail-show-shifttrace')
        const workerName=e.target.dataset.workerName
        const carAddress=e.target.dataset.carAddress
        const carLatitute=e.target.dataset.carLatitute
        const carLongtitute=e.target.dataset.carLongtitute
        const workOrderAddress=e.target.dataset.workorderAddress
        const workOrderLatitute=e.target.dataset.workorderLatitute
        const workOrderLongtitute=e.target.dataset.workorderLongtitute
        const targetDistance=e.target.dataset.targetDistance
        const shiftTraceLocationDetailsHtml=`
            <div class="created-detail-table">
                <p class="tedsuit-row-counter">${workerName}</p>
                <div class="detail-column">
                    <div class="row">İsim Soyisim:</div>
                    <div class="row">${workerName}</div>
                </div>
                <hr>
                <div class="detail-column">
                    <div class="row">Aracın Bulunduğu Adres:</div>
                    <div class="row">${carAddress}</div>
                </div>
                <hr>
                <div class="detail-column">
                    <div class="row">İşin Gönderildiği Adres:</div>
                    <div class="row">${workOrderAddress}</div>
                </div>
                <hr>
                <div class="detail-column">
                    <div class="row">Hedefe Uzaklık:</div>
                    <div class="row">${parseFloat(targetDistance).toFixed(0).replace("NaN","-")} mt</div>
                </div>
                <hr>
                <div class="detail-column">
                    <div class="row">Oraya Konum Al</div>
                    <div class="row">
                        Konuma Git !
                        <img class="icon-tedsuitwatch" src="../../svg/navigatelocation.svg">
                    </div>
                </div>
                <hr>
                <br>
            </div>
        `
        UI.detailPanel.innerHTML=shiftTraceLocationDetailsHtml
        UI.detailPanel.classList.add('detail-show-shifttrace')
    })
})