import { UI } from "./UI.js";

UI.ensafeAudits.forEach(item=>{
    item.addEventListener('click',async(e)=>{
        UI.detailPanel.innerHTML=""
        UI.detailPanel.classList.remove('detail-show-shifttrace')
        const workerName=e.target.dataset.ensafeAuditsName
        const response=await fetch('/enerjisaapi/ensafeaudits-json')
        const data =await response.json()
        const workerNameData=data.filter(item=>item.nameSurname==workerName)
        const actionModuleNos=workerNameData.map(item=>{
            return {moduleNo:item.moduleNo}
        })
        
        const response_2=await fetch("/enerjisaapi/ensafeactions-json")
        const data_2=await response_2.json()
        const actionModuleNosData=[]
        actionModuleNos.forEach(moduleno=>{
            data_2.forEach(action=>{
                if (moduleno.moduleNo==action.moduleNo) {
                    actionModuleNosData.push(action)
                }
            })
        })

        const workerNameDataMap=workerNameData.map(item=>{
            const isUnsuitability=[]
            const isAction=[]
            actionModuleNosData.forEach(moduleno=>{
                if (moduleno.moduleNo==item.moduleNo) {
                    isUnsuitability.push(moduleno.whatIsUnsuitability)
                    isAction.push(moduleno.whatIsAction)
                }
                else{
                    isUnsuitability.push("-")
                    isAction.push("-")
                }
            })
            if (isUnsuitability[0]==undefined) {
                isUnsuitability[0]="-"
            }
            if (isAction[0]==undefined) {
                isAction[0]="-"
            }
            return `
                    <div class="created-detail-table">
                        <div class="detail-column">
                            <div class="row">İsim Soyisim:</div>
                            <div class="row">${workerName}</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                            <div class="row">Aksiyonlu / Aksiyonsuz :</div>
                            <div class="row">${item.actionWithoutAction}</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                            <div class="row">Denetim Tarihi:</div>
                            <div class="row">${item.auditDate}</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                            <div class="row module-no">Aksiyon Numarası:</div>
                            <div class="row">${item.moduleNo}</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                            <div class="row module-no">Uygunsuz Durum:</div>
                            <div class="row">${isUnsuitability[0]}</div>
                        </div>
                        <hr>
                        <div class="detail-column">
                            <div class="row module-no-audits">Aksiyon:</div>
                            <div class="row">${isAction[0]}</div>
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