import dianaInsprite from "./constants/dianaInsprite"
chrome.runtime.onInstalled.addListener(async()=>{
    let quotes=await chrome.storage.local.get("quotes")
    if(quotes.morning==undefined){
        chrome.storage.local.set({quotes:dianaInsprite})
    }
})
export {}
