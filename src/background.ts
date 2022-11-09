import { fixStorage } from "./tool/fixStorage"
import { chromeGet, chromeSet } from "./tool/storageHandle";
import memberList from "./constants/memberList"
import type { dynamicData, liveType } from "./tool/storageHandle"
chrome.runtime.onInstalled.addListener(fixStorage);
export const getLiveState = async () => {//乐了，这fetch根本就不触发cors。
    let i: keyof typeof memberList;
    let temp: liveType = "none"
    try {
        for (i in memberList) {//就在我调这的时候正好碰上b站服务器寄了，给我上了一课：ajax请求得考虑请求失败
            let res = await fetch(`https://api.bilibili.com/x/space/acc/info?mid=${memberList[i].uid}&jsonp=jsonp`);
            res = await res.json()
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

    } catch (e) {
        console.log(e);
        chromeSet({
            liveState: "error",
            liveTime: Date.now()
        });
    }
}
//b站居然改API了
export const getDynamic = async (page: number, host_uid: number) => {
    let offset = '';
    let resArray: dynamicData[] = []
    for (let i = 0; i < page; i++) {
        let req = await fetch(`https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space?offset=${offset}&host_mid=${host_uid}&timezone_offset=-480`)
        let resObj = await req.json();
        if (resObj.code == 0) {
            offset = resObj.data.offset;
            resArray.concat(resObj.data.items)
        }
    }
    return resArray
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
                console.log(JSON.parse(i.card))
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
getLiveWrapped()
getScheduleWrapped()
setInterval(getLiveWrapped, 120000)
setInterval(getScheduleWrapped, 600000)
export { }
