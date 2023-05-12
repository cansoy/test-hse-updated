import { UI } from "./UI.js";

UI.ensafeEvents.forEach(item=>{
    item.addEventListener('click',async(e)=>{
        UI.detailPanel.innerHTML=""
        UI.detailPanel.classList.remove('detail-show-shifttrace')
        const workerName=e.target.dataset.ensafeEventsName
        const response=await fetch('/enerjisaapi/ensafeevents-json')
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
                        <div class="row">Kaza Zamanı:</div>
                        <div class="row">${item.eventDate}</div>
                    </div>
                    <hr>
                    <div class="detail-column">
                        <div class="row">Kategori:</div>
                        <div class="row">${item.eventCategory}</div>
                    </div>
                    <hr>
                    <div class="detail-column">
                        <div class="row">Ana Kategori:</div>
                        <div class="row">${item.eventMainType}</div>
                    </div>              
                    <hr>
                    <div class="detail-column">
                        <div class="row module-no-event">Kaza Sebebi:</div>
                        <div class="row">${item.accidentReason}</div>
                    </div>
                    <hr>
                    <div class="detail-column">
                        <div class="row module-no-event">İş Günü Kaybı:</div>
                        <div class="row">${item.eventLastdayOfNumber}</div>
                    </div>
                    <hr>
                    <div class="detail-column">
                        <div class="row module-no-event">Aksiyon Numarası:</div>
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