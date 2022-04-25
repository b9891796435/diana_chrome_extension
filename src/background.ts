import { fixStorage } from "./tool/fixStorage"
import { chromeSet } from "./tool/storageHandle";
import memberList from "./constants/memberList"
import type { liveStateType } from "./tool/storageHandle"
chrome.runtime.onInstalled.addListener(fixStorage);
setInterval(async () => {//乐了，这fetch根本就不触发cors
    let i: keyof typeof memberList;
    let temp:liveStateType="none"
    for (i in memberList) {
        let res=await fetch(`https://api.bilibili.com/x/space/acc/info?mid=${memberList[i].uid}&jsonp=jsonp`);
        res=await res.json()
        let data=res as any;
        if(data.data.live_room.liveStatus){
            temp=i;
            return;
        }
    }
    chromeSet({liveState:temp});
}, 5000)
export { }
