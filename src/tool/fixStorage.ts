import dianaInsprite from "../constants/storagePrototype/dianaInsprite"
import toolList from "../constants/storagePrototype/toolList"
export const fixStorage=()=> {
    chrome.storage.local.get("quotes").then(res=>{
        if(res.quotes===undefined){
            chrome.storage.local.set({quotes:dianaInsprite})
        }
    })
    chrome.storage.local.get("toolList").then(res=>{
        if(res.toolList===undefined||!Array.isArray(res.toolList)){
            chrome.storage.local.set({toolList})
        }
    })
}
export const resetStorage=()=> {
    chrome.storage.local.set({quotes:dianaInsprite});
    chrome.storage.local.set({toolList});
}