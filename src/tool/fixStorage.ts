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
        }),
        chrome.storage.local.get("fetchLive").then(res => {
            if (res.fetchLive === undefined) {
                chrome.storage.local.set({ fetchLive: true })
            }
        }),
        chrome.storage.local.get("liveState").then(res => {
            if (res.liveState === undefined) {
                chrome.storage.local.set({
                    liveState: "none"
                })
            }
        }),
        chrome.storage.local.get("scheduleState").then(res => {
            if (res.scheduleState === undefined) {
                chrome.storage.local.set({
                    scheduleState: Date.now()
                })
            }
        }),
        chrome.storage.local.get("liveTime").then(res => {
            if (res.liveTime === undefined) {
                chrome.storage.local.set({
                    liveTime: 0
                })
            }
        }),
        chrome.storage.local.get("searchEngine").then(res => {
            if (res.searchEngine === undefined) {
                chrome.storage.local.set({
                    searchEngine: [
                        {
                            url: "https://www.baidu.com/s?wd=%keyword%",
                            icon: require("../assets/images/baidu.png"),
                            engineName: "百度"
                        },
                        {
                            url: "https://www.google.com/search?q=%keyword%",
                            icon: require("../assets/images/google.png"),
                            engineName: "谷歌"
                        },
                        {
                            url: "https://search.bilibili.com/all?keyword=%keyword%",
                            icon: require("../assets/images/bilibili.jpg"),
                            engineName: "b站"
                        },
                        {
                            url: "https://www.bing.com/search?q=%keyword%",
                            icon: require("../assets/images/bing.png"),
                            engineName: "必应"
                        },
                    ]
                })
            }
        }),
        chrome.storage.local.get("defaultEngine").then(res => {
            if (res.defaultEngine === undefined) {
                chrome.storage.local.set({
                    defaultEngine: 0
                })
            }
        }),
        chrome.storage.local.get("theme").then(res => {
            if (res.theme === undefined) {
                chrome.storage.local.set({
                    theme: "diana"
                })
            }
        }),
    ])
}
export const resetStorage = () => {
    chrome.storage.local.set({ quotes: dianaInsprite });
    chrome.storage.local.set({ toolList });
    chrome.storage.local.set({ noticeTime: 5400000 });
    chrome.storage.local.set({ shouldShowNotice: true });
    chrome.storage.local.set({ fetchLive: true });
    chrome.storage.local.set({
        liveState: "none"
    });
    chrome.storage.local.set({
        scheduleState: Date.now()
    });
    chrome.storage.local.set({
        liveTime: 0,
    });
    chrome.storage.local.set({
        searchEngine: [
            {
                url: "https://www.baidu.com/s?wd=%keyword%",
                icon: require("../assets/images/baidu.png"),
                engineName: "百度"
            },
            {
                url: "https://www.google.com/search?q=%keyword%",
                icon: require("../assets/images/google.png"),
                engineName: "谷歌"
            },
            {
                url: "https://search.bilibili.com/all?keyword=%keyword%",
                icon: require("../assets/images/bilibili.jpg"),
                engineName: "b站"
            },
            {
                url: "https://www.bing.com/search?q=%keyword%",
                icon: require("../assets/images/bing.png"),
                engineName: "必应"
            },
        ]
    });
    chrome.storage.local.set({
        defaultEngine: 0
    });
    chrome.storage.local.set({
        theme: "diana"
    });
}