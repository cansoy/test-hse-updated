import { UI } from "./UI.js";

UI.ensafeNotification.forEach(item=>{
    item.addEventListener('click',async(e)=>{
        UI.detailPanel.innerHTML=""
        UI.detailPanel.classList.remove('detail-show-shifttrace')
        const workerName=e.target.dataset.ensafeNotificationsName
        const response=await fetch("/enerjisaapi/ensafenotifications-json")
        const data=await response.json()
        const workerNameData=data.filter(item=>item.nameSurname==workerName)
        const actionModuleNos=workerNameData.map(item=>{
            return {moduleNo:item.moduleNo}
        })
        let rowCounter=0
        const workerNameDataMap=workerNameData.map(item=>{
            return`
                <div class="created-detail-table">
                    <p class="tedsuit-row-counter">${++rowCounter}</p>
                    <div class="detail-column">
                        <div class="row">İsim Soyisim:</div>
                        <div class="row">${workerName}</div>
                    </div>
                    <hr>
                    <div class="detail-column">
                        <div class="row">Bildirim Zamanı:</div>
                        <div class="row">${item.notificationDate}</div>
                    </div>
                    <hr>
                    <div class="detail-column">
                        <div class="row">Bildirmin Türü:</div>
                        <div class="row">${item.notificationType}</div>
                    </div>
                    <hr>
                    <div class="detail-column">
                        <div class="row">Bildirmin Açıklması:</div>
                        <div class="row">${item.notificationExplanation}</div>
                    </div>              
                    <hr>
                    <div class="detail-column">
                        <div class="row">Ana Kategori:</div>
                        <div class="row">${item.moduleNo}</div>
                    </div>
                    <hr>
                </div>
            `
        })
        const workerNameDataHtml = workerNameDataMap.join("")
        UI.detailPanel.innerHTML= workerNameDataHtml
        UI.detailPanel.classList.add('detail-show-shifttrace')
    })
})