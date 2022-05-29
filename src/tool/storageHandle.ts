import { fixStorage } from "./fixStorage";//只要type标的好，语法错误不烦恼
//加了属性记得去fixStorage添加未定义时的修补机制
import type { toolItemData } from "../views/NewTab/Content/YinTun/ToolItem";
import type { members } from "../constants/memberList"
export type storageKeys = "quotes" | "noticeTime" | "shouldShowNotice" | "date"
    | "morning" | "noon" | "evening" | "night" | "notice"
    | "tabCount" | "toolList" | "liveState" | "fetchLive"
    | "scheduleState" | "liveTime" | "searchEngine" | "defaultEngine"
    | "theme"
export type liveType = members | "none" | "error"
type schedule = {
    images: {
        img_src: string,
    }[],
    dynamicDate: number,
    getDate: number
}
export type scheduleType = schedule | number
export type searchEngineType = { url: string, icon?: string, engineName: string }[]
type getRes = {
    (key: "noticeTime" | "notice" | "tabCount" | "liveTime" | "defaultEngine"): Promise<number>,
    (key: "shouldShowNotice" | "morning" | "noon" | "evening" | "night" | "fetchLive"): Promise<boolean>,
    (key: "date"): Promise<string>,
    (key: "quotes"): Promise<{
        daily: string[];
        morning: string;
        noon: string;
        evening: string;
        night: string;
        notice: string[];
    }>
    (key: "toolList"): Promise<toolItemData[]>
    (key: "liveState"): Promise<liveType>
    (key: "scheduleState"): Promise<scheduleType>
    (key: "searchEngine"): Promise<searchEngineType>
    (key:"theme") : Promise<members>
}
type storageValues = {
    noticeTime?: number,
    notice?: number,
    tabCount?: number,
    liveTime?: number,
    defaultEngine?: number,
    shouldShowNotice?: boolean,
    morning?: boolean,
    noon?: boolean,
    evening?: boolean,
    night?: boolean,
    date?: string,
    quotes?: {
        daily: string[];
        morning: string;
        noon: string;
        evening: string;
        night: string;
        notice: string[];
    },
    toolList?: toolItemData[],
    liveState?: liveType,
    fetchLive?: boolean,
    scheduleState?: scheduleType,
    searchEngine?: searchEngineType,
    theme?: members,
}
export const chromeGet: getRes = async (key: storageKeys) => {
    let res = await chrome.storage.local.get(key);
    if (!res[key]) {
        await fixStorage();
        res = await chrome.storage.local.get(key);
    }
    return res[key];
}
export const chromeSet = (key: storageValues) => {
    return chrome.storage.local.set(key);
}