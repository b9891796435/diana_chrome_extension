import { fixStorage } from "./fixStorage";//只要type标的好，语法错误不烦恼
//加了属性记得去fixStorage添加未定义时的修补机制
import type { toolItemData } from "../views/NewTab/Content/YinTun/ToolItem";
import type { members } from "../constants/memberList"
import type { quotesType } from "../constants/storagePrototype/quotes";
export type storageKeys = "quotes" | "noticeTime" | "shouldShowNotice" | "date"
    | "morning" | "noon" | "evening" | "night" | "notice"
    | "tabCount" | "toolList" | "liveState" | "fetchLive"
    | "scheduleState" | "liveTime" | "searchEngine" | "defaultEngine"
    | "theme" | "hideCarol" | "showNavigation" | "showTopsite" | "dynamicData" | "dynamicPages" | "dynamicTime"
export type liveType = members | "none" | "error"
type schedule = {
    images: {
        img_src: string,
    }[],
    dynamicDate: number,
    dynamicID: string,
    getDate: number,

}
export type scheduleType = schedule | number
export type searchEngineType = { url: string, icon?: string, engineName: string }[]
//b站动态有四种，转发、视频、文字与图画
//而文本节点也有四种，文本，表情，@xxxx与话题
export type dynamicContentNode = {
    type: 'RICH_TEXT_NODE_TYPE_TEXT',
    text: string,
} | {
    type: 'RICH_TEXT_NODE_TYPE_TOPIC',
    text: string,
    jump_url: string,
} | {
    type: 'RICH_TEXT_NODE_TYPE_EMOJI',
    text: string,
    emoji: {
        icon_url: string,
    }
} | {
    type: 'RICH_TEXT_NODE_TYPE_AT',
    text: string,
    rid: string,
}
export type dynamicData = {
    id_str: string,
    type: 'DYNAMIC_TYPE_WORD',
    modules: {
        module_author: {
            mid: number,
            pub_ts: number,
            name: string,
            face: string,
            pub_time: string,
            jump_url: string
        },
        module_dynamic: {
            desc: { rich_text_nodes: null | dynamicContentNode[] }
        }
    },
} | {
    id_str: string,
    type: 'DYNAMIC_TYPE_FORWARD',
    modules: {
        module_author: {
            mid: number
            pub_ts: number
            name: string
            face: string,
            pub_time: string
            jump_url: string
        },
        module_dynamic: {
            desc: { rich_text_nodes: null | dynamicContentNode[] }
        }
    },
    orig: dynamicData
} | {
    id_str: string,
    type: 'DYNAMIC_TYPE_AV',
    modules: {
        module_author: {
            mid: number
            pub_ts: number
            name: string
            face: string,
            pub_time: string
            jump_url: string
        },
        module_dynamic: {
            desc: { rich_text_nodes: null | dynamicContentNode[] },
            major: {
                archive: {
                    jump_url: string,
                    cover: string,
                    title: string,
                    desc:string
                }
            }
        }
    }
} | {
    id_str: string,
    type: 'DYNAMIC_TYPE_DRAW',
    modules: {
        module_author: {
            mid: number
            pub_ts: number
            name: string
            face: string,
            pub_time: string
            jump_url: string
        },
        module_dynamic: {
            desc: { rich_text_nodes: null | dynamicContentNode[] },
            major: {
                draw: {
                    items: {
                        src: string;
                    }[]
                }
            }
        }
    }
}
export const summaryBackdrop = '@228w_228h_1e_1c.webp'
export type dynamicListType = {
    [key in members]: dynamicData[]
}
type getRes = {
    (key: "noticeTime" | "notice" | "tabCount" | "liveTime" | "defaultEngine" | "dynamicPages" | "dynamicTime"): Promise<number>,
    (key: "shouldShowNotice" | "morning" | "noon" | "evening" | "night" | "fetchLive" | "hideCarol" | "showNavigation" | "showTopsite"): Promise<boolean>,
    (key: "date"): Promise<string>,
    (key: "quotes"): Promise<quotesType>
    (key: "toolList"): Promise<toolItemData[]>
    (key: "liveState"): Promise<liveType>
    (key: "scheduleState"): Promise<scheduleType>
    (key: "searchEngine"): Promise<searchEngineType>
    (key: "theme"): Promise<members>
    (key: 'dynamicData'): Promise<dynamicListType>
}
type storageValues = {
    noticeTime?: number,
    notice?: number,
    tabCount?: number,
    liveTime?: number,
    defaultEngine?: number,
    dynamicPages?: number,
    dynamicTime?: number,
    shouldShowNotice?: boolean,
    morning?: boolean,
    noon?: boolean,
    evening?: boolean,
    night?: boolean,
    hideCarol?: boolean,
    showNavigation?: boolean,
    showTopsite?: boolean,
    date?: string,
    quotes?: quotesType,
    toolList?: toolItemData[],
    liveState?: liveType,
    fetchLive?: boolean,
    scheduleState?: scheduleType,
    searchEngine?: searchEngineType,
    theme?: members,
    dynamicData?: dynamicListType,
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