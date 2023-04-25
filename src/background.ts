import { fixStorage } from "./tool/fixStorage"
import { chromeGet, chromeSet, dynamicListType } from "./tool/storageHandle";
import memberList, { members } from "./constants/memberList"
import type { dynamicData, liveType } from "./tool/storageHandle"
chrome.runtime.onInstalled.addListener(fixStorage);
export const renderDynamicBadge = async () => {
    let liveState = await chromeGet('liveState');
    let liveBadge = await chromeGet('showLiveBadge');
    let badgeCount = await chromeGet('dynamicBadgeText');
    await chrome.action.setBadgeBackgroundColor({ color: 'rgb(255,240,246)' })
    //@ts-ignore
    await chrome.action.setBadgeTextColor({ color: 'rgb(120,6,80)' })
    if (liveBadge && !(liveState === 'none' || liveState === 'error')) {
        chrome.action.setBadgeText({ text: 'LIVE' });
    } else if (await chromeGet('showDynamicBadge') && badgeCount !== 0) {
        chrome.action.setBadgeText({ text: String(badgeCount) })
    } else {
        chrome.action.setBadgeText({ text: '' });
    }
}
export const getLiveState = async () => {//乐了，这fetch根本就不触发cors。
    let i: keyof typeof memberList;
    let temp: liveType = "none"
    try {
        for (i in memberList) {//就在我调这的时候正好碰上b站服务器寄了，给我上了一课：ajax请求得考虑请求失败
            let res:any = await fetch(`https://api.bilibili.com/x/space/acc/info?mid=${memberList[i].uid}&jsonp=jsonp`);
            res = await res.text()
            try{
                res = JSON.parse(res)
            }catch(e){
                res = JSON.parse(res.slice(46))
            }
            let data = res as any;
            if (data.data.live_room.liveStatus) {
                temp = i;
                break;
            }
            let a = await chrome.storage.local.get("debugMode")
            if (a?.debugMode === "true") {
                console.log(res)
            }
        }
        chromeSet({ liveState: temp });
        renderDynamicBadge()
    } catch (e) {
        console.log(e);
        chromeSet({
            liveState: "error",
        });
    }
    chromeSet({
        liveTime: Date.now()
    })
}
//b站居然改API了
export const getDynamic = async (page: number, host_uid: string) => {
    let offset = '';
    let resArray: dynamicData[] = []
    for (let i = 0; i < page; i++) {
        let res = await fetch(`https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space?offset=${offset}&host_mid=${host_uid}&timezone_offset=-480`)
        let resObj = await res.json();
        if (resObj.code == 0) {
            offset = resObj.data.offset;
            resArray = resArray.concat(resObj.data.items)
        }
    }
    return resArray
}
export const getMembersDynamic = async () => {
    let temp: dynamicListType = {
        ava: [],
        bella: [],
        diana: [],
        eileen: [],
    };
    let pages = await chromeGet('dynamicPages');
    if (await chromeGet('showDynamicBadge')) {
        let lastIDSTR = await chromeGet('lastDynamicIDSTR');
        let badgeCount = await chromeGet('dynamicBadgeText');
        for (let i in temp) {
            let res = await getDynamic(pages, memberList[i as members].uid)
            res = res.sort((a, b) => b.modules.module_author.pub_ts - a.modules.module_author.pub_ts);//获得按时间排序的动态
            if (res[0].type != 'DYNAMIC_TYPE_LIVE_RCMD') {
                if (res[0].id_str != lastIDSTR[i as members]) {
                    lastIDSTR[i as members] = res[0].id_str;
                    badgeCount++;
                }
            } else if (res[1].id_str != lastIDSTR[i as members]) {
                lastIDSTR[i as members] = res[1].id_str;
                badgeCount++;
            }
            temp[i as members] = temp[i as members].concat(res)
        }
        await chromeSet({
            dynamicBadgeText: badgeCount,
            lastDynamicIDSTR: lastIDSTR
        });
        renderDynamicBadge();
    } else {
        for (let i in temp) {
            let res = await getDynamic(pages, memberList[i as members].uid)
            temp[i as members] = temp[i as members].concat(res)
        }
    }
    chromeSet({
        dynamicData: temp,
        dynamicTime: Date.now(),
    })
    console.log(temp);
}
export const getScheduleState = async () => {
    let res;
    try {
        let offset = "0";
        for (let i = 0; i < 5; i++) {
            let a = await fetch(`https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/space_history?visitor_uid=104319441&host_uid=703007996&offset_dynamic_id=${offset}&need_top=1&platform=web`);
            res = await a.json()
            let cardsCount = res.data.cards.length - 1;
            offset = res.data.cards[cardsCount].desc.dynamic_id_str;
            let cardList = res.data.cards;
            for (let i of cardList) {
                let card = JSON.parse(i.card).item;
                let description = card?.description as string | undefined;
                if (description && description.match("日程表")) {
                    chromeSet({
                        scheduleState: {
                            images: card.pictures,
                            dynamicDate: card.upload_time * 1000,
                            getDate: Date.now(),
                            dynamicID: i.desc.dynamic_id_str
                        }
                    })
                    return;
                }
            }
        }
        throw new Error("找不到最新日程表，可能由于动态过多、b站更改API格式或羊驼发日程表的动态里没写日程表这仨字")
    } catch (e) {
        console.log(e, res)
        chromeSet({ scheduleState: Date.now() })
    }
}
export const getUpdate = async () => {
    let res = await getDynamic(2, '104319441');
    for (let i of res) {
        if (i.type == 'DYNAMIC_TYPE_WORD') {
            let context = i.modules.module_dynamic.desc.text;
            try {
                let content = JSON.parse(context) as { version: string, url: string, content: string, agent:'chrome'|'edge' }
                if(content.agent=='edge'){
                    continue
                }
                let newVersion = JSON.parse(context).version;
                let nowVersion = chrome.runtime.getManifest().version;
                let nowVersionArray = nowVersion.split('.').map((i: string) => Number(i));
                let knownVersion = (await chromeGet('knownVersion'));
                let knownVersionArray = knownVersion.split('.').map((i: string) => Number(i));
                if (nowVersionArray[0] > knownVersionArray[0] || (nowVersionArray[0] == knownVersionArray[0] && nowVersionArray[1] > knownVersionArray[1]) || (nowVersionArray[0] == knownVersionArray[0] && nowVersionArray[1] == knownVersionArray[1] && nowVersionArray[2] > knownVersionArray[2])) {
                    await chromeSet({ knownVersion: chrome.runtime.getManifest().version })
                    knownVersion = nowVersion;
                }
                if (newVersion !== knownVersion) {
                    return JSON.parse(context) as { version: string, url: string, content: string };
                } else {
                    return null;
                }
            } catch (e) {//逻辑是假定能被正确解析的json字符串一定是更新所用的字符串
                continue;
            }
        }
    }
    return null;
}
let dateCheck = async (propName: any, timeout: number, func: Function) => {
    let time = await chromeGet(propName) as any;
    if (typeof (time) === "number") {
        if (Date.now() - time > timeout) {
            func();
        }
    } else if (typeof (time.getDate) !== "undefined") {
        if (Date.now() - time.getDate > timeout) {
            func();
        }
    }
}

let getScheduleWrapped = () => {
    dateCheck("scheduleState", 1800000, getScheduleState);
}
let getLiveWrapped = () => {
    dateCheck("liveTime", 120000, getLiveState)
}
let getMembersDynamicWrapped = () => {
    dateCheck("dynamicTime", 300000, getMembersDynamic)
}
getLiveWrapped();
getScheduleWrapped();
getMembersDynamicWrapped();
renderDynamicBadge();
setInterval(getLiveWrapped, 30000);
setInterval(getScheduleWrapped, 30000);
setInterval(getMembersDynamicWrapped, 30000);
export { }
