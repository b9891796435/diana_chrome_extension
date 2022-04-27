import { fixStorage } from "./tool/fixStorage"
import { chromeSet } from "./tool/storageHandle";
import memberList from "./constants/memberList"
import type { liveStateType } from "./tool/storageHandle"
chrome.runtime.onInstalled.addListener(fixStorage);
setInterval(async () => {//乐了，这fetch根本就不触发cors
    let i: keyof typeof memberList;
    let temp: liveStateType = "none"
    try {
        for (i in memberList) {//就在我调这的时候正好碰上b站服务器寄了，给我上了一课：ajax请求得考虑请求失败
            let res = await fetch(`https://api.bilibili.com/x/space/acc/info?mid=${memberList[i].uid}&jsonp=jsonp`);
            res = await res.json()
            let data = res as any;
            if (data.data.live_room.liveStatus) {
                temp = i;
                break;
            }
        }
        chromeSet({ liveState: temp });
        
    } catch (e) {
        console.log(e);
        chromeSet({liveState:"error"});
    }
}, 5000)
export { }
