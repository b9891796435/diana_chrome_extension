import { fixStorage } from "./fixStorage";
import type { toolItemData } from "../views/NewTab/Content/YinTun/ToolItem";
export type storageKeys="quotes"|"noticeTime"|"shouldShowNotice"| "date"|"morning"|"noon"|"evening"|"night"|"notice"|"tabCount"|"toolList"
type getRes={
    (key:"noticeTime"|"notice"|"tabCount"):Promise<number>,
    (key:"shouldShowNotice"|"morning"|"noon"|"evening"|"night"):Promise<boolean>,
    (key:"date"):Promise<string>,
    (key:"quotes"): Promise<{
        daily: string[];
        morning: string;
        noon: string;
        evening: string;
        night: string;
        notice: string[];
    }>
    (key:"toolList"):Promise<toolItemData>
}
type storageValues={
    noticeTime?:number,
    notice?:number,
    tabCount?:number,
    shouldShowNotice?:boolean,
    morning?:boolean,
    noon?:boolean,
    evening?:boolean,
    night?:boolean,
    date?:string,
    quotes?:{
        daily: string[];
        morning: string;
        noon: string;
        evening: string;
        night: string;
        notice: string[];
    },
    toolList?:toolItemData[]
}
export const chromeGet:getRes=async (key:storageKeys)=>{
    let res = await chrome.storage.local.get(key);
    if(!res[key]){
        await fixStorage();
        res=await chrome.storage.local.get(key);
    }
    return res[key];
}
export const chromeSet=(key:storageValues)=>{
    return chrome.storage.local.set(key);
}