import { fixStorage } from "./fixStorage";//只要type标的好，语法错误不烦恼
//加了属性记得去fixStorage添加未定义时的修补机制
import type { toolItemData } from "../views/NewTab/Content/YinTun/ToolItem";
import type { members } from "../constants/memberList"
import type { quote } from "../constants/storagePrototype/quotes";
export type storageKeys = keyof storageValues;

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
type major_type_draw = {
    type: "MAJOR_TYPE_DRAW",
    draw: {
        items: {
            src: string;
        }[]
    }
}
type major_type_none = {
    type: "MAJOR_TYPE_NONE",
    none: { tips: string }
}
type major_type_opus = {//我嘞个拉丁语领域大蛇
    opus: {
        jump_url: string;
        pics: string[]; // 实际可能是图片对象数组，示例中为空
        summary: {
            rich_text_nodes: dynamicContentNode[];
            text: string;
        };
        title: string | null;
    },
    type: "MAJOR_TYPE_OPUS"
}
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
export type authorModule = {
    mid: number,
    pub_ts: number,
    name: string,
    face: string,
    pub_time: string,
    jump_url: string
}
export type dynamicData = {
    id_str: string,
    type: 'DYNAMIC_TYPE_WORD',
    modules: {
        module_author: authorModule,
        module_dynamic: {
            desc: {
                rich_text_nodes: null | dynamicContentNode[],
                text: string
            }
        }
    },
} | {
    id_str: string,
    type: 'DYNAMIC_TYPE_FORWARD',
    modules: {
        module_author: authorModule,
        module_dynamic: {
            desc: { rich_text_nodes: null | dynamicContentNode[] }
        }
    },
    orig: dynamicData
} | {
    id_str: string,
    type: 'DYNAMIC_TYPE_AV',
    modules: {
        module_author: authorModule,
        module_dynamic: {
            desc: { rich_text_nodes: null | dynamicContentNode[] },
            major: {
                archive: {
                    jump_url: string,
                    cover: string,
                    title: string,
                    desc: string
                }
            }
        }
    }
} | {
    id_str: string,
    type: 'DYNAMIC_TYPE_DRAW',
    modules: {
        module_author: authorModule,
        module_dynamic: {
            desc: { rich_text_nodes: null | dynamicContentNode[] },
            major: major_type_draw | major_type_none | major_type_opus
        }
    }
} | {
    id_str: string,
    type: 'DYNAMIC_TYPE_LIVE_RCMD',
    modules: {
        module_author: authorModule,
        module_dynamic: {
            desc: { rich_text_nodes: null | dynamicContentNode[] },
            major: {
                live_rcmd: {
                    content: string
                },
                type: "MAJOR_TYPE_LIVE_RCMD"
            }
        }
    }
}

export type liveRCMDType = {
    live_play_info: {
        cover: string,
        title: string,
        link: string,
    }
}
export type lastDynamicRecord = {
    [key in members]: string
}
export const summaryBackdrop = '@228w_228h_1e_1c.webp'
export type dynamicListType = {
    [key in members]: dynamicData[]
}
export type positionType = {
    left?: string,
    right?: string,
    bottom?: string,
    top?: string
}
export type material = {
    name: string,
    src: string[],
    fps: number,
    position: positionType,
    size: {
        width?: string,
        height?: string
    },
    isInspirator?: boolean,
    zIndex: number
}
export type skin = {
    name: string,
    materials: material[]
    dialogPosition: positionType
}
export type skinPackage = {
    [key in members]: skin[]
}
type getRes = {
    (key: "noticeTime" | "notice" | "tabCount" | "liveTime" | "defaultEngine" | "dynamicPages" | "dynamicTime" | "dynamicBadgeText" | 'selectedSkin'): Promise<number>,
    (key: "shouldShowNotice"
        | "morning" | "noon" | "evening" | "night" | "fetchLive"
        | "showNavigation" | "showTopsite" | "showLiveBadge" | "showDynamicBadge" | 'showSecondMember'
        | "useZhijiangSchedule"): Promise<boolean>,
    (key: "date" | "knownVersion"): Promise<string>,
    (key: "lastDynamicIDSTR"): Promise<lastDynamicRecord>,
    (key: "quotes"): Promise<quote[]>
    (key: "curr_quote"): Promise<quote>
    (key: "toolList"): Promise<toolItemData[]>
    (key: "liveState"): Promise<liveType>
    (key: "scheduleState"): Promise<scheduleType>
    (key: "searchEngine"): Promise<searchEngineType>
    (key: "theme"): Promise<members>
    (key: 'dynamicData'): Promise<dynamicListType>
    (key: 'skinPackage'): Promise<skinPackage>
}
type storageValues = {
    //久坐提醒间隔时间
    noticeTime?: number,
    //上次提醒时间戳
    notice?: number,
    //使用该插件后打开的标签页数量
    tabCount?: number,
    //上次获取直播间请求时间戳
    liveTime?: number,
    //主页默认使用的搜索引擎
    defaultEngine?: number,
    //成员朋友圈每次抓取页数
    dynamicPages?: number,
    //上次抓取成员动态时间
    dynamicTime?: number,
    //插件角标的内容
    dynamicBadgeText?: number,
    //当前使用的主页皮肤
    selectedSkin?: number,
    //是否展示久坐提醒
    shouldShowNotice?: boolean,
    //下面四条记载的是今日是否展示过早午晚夜安
    morning?: boolean,
    noon?: boolean,
    evening?: boolean,
    night?: boolean,
    //是否展示主页快捷导航
    showNavigation?: boolean,
    //是否展示最近高频打开的页面
    showTopsite?: boolean,
    //是否展示当前正在直播角标
    showLiveBadge?: boolean,
    //动态是否展示二期成员
    showSecondMember?: boolean,
    //是否使用枝江娱乐日程表
    useZhijiangSchedule?: boolean,
    //是否展示动态角标
    showDynamicBadge?: boolean,
    //主页中保存的上次问安日期，如果超过24点则刷新问安变量
    date?: string,
    //已知的版本，用于提醒更新
    knownVersion?: string,
    //已知各成员最后一条动态id
    lastDynamicIDSTR?: lastDynamicRecord,
    //所有语录
    quotes?: quote[],
    //当前使用的语录
    curr_quote?: quote,
    //快捷导航
    toolList?: toolItemData[],
    //当前各直播间状态
    liveState?: liveType,
    //是否抓取直播间
    fetchLive?: boolean,
    //当前日程表的状态
    scheduleState?: scheduleType,
    //所有的搜索引擎
    searchEngine?: searchEngineType,
    //当前使用的主题
    theme?: members,
    //所有的动态数据
    dynamicData?: dynamicListType,
    //预备日后自定义皮肤使用的皮肤包变量。
    skinPackage?: skinPackage,
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