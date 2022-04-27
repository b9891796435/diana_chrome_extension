import { fixStorage } from "./fixStorage";//只要type标的好，语法错误不烦恼
import type { toolItemData } from "../views/NewTab/Content/YinTun/ToolItem";
import type {members} from "../constants/memberList"
export type storageKeys = "quotes" | "noticeTime" | "shouldShowNotice" | "date" 
                        | "morning" | "noon" | "evening" | "night" | "notice" 
                        | "tabCount" | "toolList" | "liveState" | "fetchLive"
export type liveStateType = members|"none"|"error"
type getRes = {
    (key: "noticeTime" | "notice" | "tabCount"): Promise<number>,
    (key: "shouldShowNotice" | "morning" | "noon" | "evening" | "night"|"fetchLive"): Promise<boolean>,
    (key: "date"): Promise<string>,
    (key: "quotes"): Promise<{
        daily: string[];
        morning: string;
        noon: string;
        evening: string;
        night: string;
        notice: string[];
    }>
    (key: "toolList"): Promise<toolItemData>
    (key: "liveState"): Promise<liveStateType>
}
type storageValues = {
    noticeTime?: number,
    notice?: number,
    tabCount?: number,
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
    liveState?: liveStateType,
    fetchLive?: boolean,
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