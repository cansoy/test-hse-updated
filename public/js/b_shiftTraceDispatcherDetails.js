import { UI } from "./UI.js";

UI.shiftTraceWorkDetails.forEach(item=>{
    item.addEventListener('click',(e)=>{
        UI.detailPanel.innerHTML=""
    })
})