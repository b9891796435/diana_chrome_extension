import dianaInsprite from "../constants/storagePrototype/dianaInsprite"
import toolList from "../constants/storagePrototype/toolList"
export const fixStorage = () => {
    return Promise.all([
        chrome.storage.local.get("quotes").then(res => {
            if (res.quotes === undefined) {
                chrome.storage.local.set({ quotes: dianaInsprite })
            }
        }),
        chrome.storage.local.get("toolList").then(res => {
            if (res.toolList === undefined || !Array.isArray(res.toolList)) {
                chrome.storage.local.set({ toolList })
            }
        }),
        chrome.storage.local.get("noticeTime").then(res => {
            if (typeof (res.noticeTime) !== "number") {
                chrome.storage.local.set({ noticeTime: 5400000 });
            }
        }),
        chrome.storage.local.get("shouldShowNotice").then(res => {
            if (res.shouldShowNotice === undefined) {
                chrome.storage.local.set({ shouldShowNotice: true })
            }
        })])
}
export const resetStorage = () => {
    chrome.storage.local.set({ quotes: dianaInsprite });
    chrome.storage.local.set({ toolList });
    chrome.storage.local.set({ noticeTime: 5400000 });
    chrome.storage.local.set({ shouldShowNotice: true })
}