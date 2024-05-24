import { getMemberIndex } from "../constants/memberList";
import quotes from "../constants/storagePrototype/quotes";
import toolList from "../constants/storagePrototype/toolList";
export const fixStorage = () => {
    return Promise.all([
        chrome.storage.local.get("quotes").then(res => {
            if (res.quotes === undefined) {
                chrome.storage.local.set({ quotes })
            }
            else if ("notice" in res.quotes) {
                let temp = [...quotes]
                res.quotes.name = "迁移的旧版本数据";
                temp.push(res.quotes)
                chrome.storage.local.set({ quotes: temp })
                alert("检测到1.x版本插件数据，已迁移至新版本插件。点击确定后刷新页面即可正常使用")
            } else if ('ava' in res.quotes) {
                let { ava, bella, diana, eileen } = res.quotes
                ava.name = '迁移的向晚语录'
                bella.name = '迁移的贝拉语录'
                diana.name = '迁移的嘉然语录'
                eileen.name = '迁移的乃琳语录'
                let temp = [...quotes, ava, bella, diana, eileen]
                chrome.storage.local.set({
                    quotes: temp
                })
                alert("检测到2.x版本插件数据，已迁移至新版本插件。点击确定后刷新页面即可正常使用")
            }

        }),
        chrome.storage.local.get("curr_quote").then(res => {
            if (res.curr_quote === undefined || typeof res.curr_quote !== 'object' || !res.curr_quote.name) {
                chrome.storage.local.set({ curr_quote: quotes[0] })
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
        chrome.storage.local.get("dynamicBadgeText").then(res => {
            if (typeof (res.dynamicBadgeText) !== "number") {
                chrome.storage.local.set({ dynamicBadgeText: 0 });
            }
        }),
        chrome.storage.local.get("selectedSkin").then(res => {
            if (typeof (res.selectedSkin) !== "number") {
                chrome.storage.local.set({ selectedSkin: 0 });
            }
        }),
        chrome.storage.local.get("skinPackage").then(res => {
            let skPack = res.skinPackage
            if (!skPack || !('ava' in skPack && 'bella' in skPack && 'diana' in skPack && 'eileen' in skPack)) {
                chrome.storage.local.set({
                    skinPackage: {
                        ava: [],
                        bella: [],
                        diana: [{
                            name: 'you&idol初始皮肤',
                            materials: [
                                {
                                    name: '嘉然小姐',
                                    fps: 0.5,
                                    positon: {
                                        bottom: '0px',
                                        left: '0px',
                                    },
                                    isInspirator: true,
                                    src: [require("../assets/images/themePack/diana/position0.png"), require("../assets/images/themePack/diana/position1.png")],
                                    size: {
                                        height: 'calc(54% - 27px)'
                                    },
                                    zIndex: 4
                                }, {
                                    name: '花盆与路灯',
                                    fps: 1,
                                    position: {
                                        bottom: '0px',
                                        left: '0px',
                                    },
                                    isInspirator: false,
                                    src: [require("../assets/images/background/flower_pot.png")],
                                    size: {
                                        height: 'calc(100% - 50px)'
                                    },
                                    zIndex: 3
                                }
                            ],
                            dialogPosition: {
                                left: 'calc((%height%px / 1080) * 437 - 225px)',
                                bottom: 'calc(54% - 27px)',
                            }
                        }],
                        eileen: [],
                    }
                })
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
        chrome.storage.local.get("showSecondMember").then(res => {
            if (res.showSecondMember === undefined) {
                chrome.storage.local.set({ showSecondMember: true })
            }
        }),
        chrome.storage.local.get("showNavigation").then(res => {
            if (res.showNavigation === undefined) {
                chrome.storage.local.set({ showNavigation: true })
            }
        }),
        chrome.storage.local.get("showTopsite").then(res => {
            if (res.showTopsite === undefined) {
                chrome.storage.local.set({ showTopsite: false })
            }
        }),
        chrome.storage.local.get("showLiveBadge").then(res => {
            if (res.showLiveBadge === undefined) {
                chrome.storage.local.set({ showLiveBadge: false })
            }
        }),
        chrome.storage.local.get("showDynamicBadge").then(res => {
            if (res.showDynamicBadge === undefined) {
                chrome.storage.local.set({ showDynamicBadge: false })
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
        chrome.storage.local.get("dynamicPages").then(res => {
            if (res.dynamicPages === undefined) {
                chrome.storage.local.set({
                    dynamicPages: 1
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
        chrome.storage.local.get("dynamicTime").then(res => {
            if (res.dynamicTime === undefined) {
                chrome.storage.local.set({
                    dynamicTime: 0
                })
            }
        }),
        chrome.storage.local.get("theme").then(res => {
            if (!(typeof getMemberIndex(res.theme) == 'number')) {
                chrome.storage.local.set({
                    theme: "diana"
                })
            }
        }),
        chrome.storage.local.get("knownVersion").then(res => {
            if (res.knownVersion === undefined) {
                chrome.storage.local.set({
                    knownVersion: chrome.runtime.getManifest().version,
                })
            }
        }),
        chrome.storage.local.get("lastDynamicIDSTR").then(res => {
            if (res.lastDynamicIDSTR === undefined) {
                chrome.storage.local.set({
                    lastDynamicIDSTR: {
                        diana: '0',
                        ava: '0',
                        bella: '0',
                        eileen: '0'
                    }
                })
            }
        }),
        chrome.storage.local.get("dynamicData").then(res => {
            if (res.dynamicData === undefined) {
                chrome.storage.local.set({
                    dynamicData: {
                        diana: [],
                        ava: [],
                        bella: [],
                        eileen: []
                    }
                })
            }
        })
    ])
}
export const resetStorage = () => {
    chrome.storage.local.set({ quotes });
    chrome.storage.local.set({ toolList }); chrome.storage.local.set({
        skinPackage: {
            ava: [],
            bella: [],
            diana: [{
                name: 'you&idol初始皮肤',
                materials: [
                    {
                        name: '嘉然小姐',
                        fps: 0.5,
                        positon: {
                            bottom: '0px',
                            left: '0px',
                        },
                        isInspirator: true,
                        src: [require("../assets/images/themePack/diana/position0.png"), require("../assets/images/themePack/diana/position1.png")],
                        size: {
                            height: 'calc(54% - 27px)'
                        },
                        zIndex: 4
                    }, {
                        name: '花盆与路灯',
                        fps: 1,
                        position: {
                            bottom: '0px',
                            left: '0px',
                        },
                        isInspirator: false,
                        src: [require("../assets/images/background/flower_pot.png")],
                        size: {
                            height: 'calc(100% - 50px)'
                        },
                        zIndex: 3
                    }
                ],
                dialogPosition: {
                    left: 'calc((%height%px / 1080) * 437 - 225px)',
                    bottom: 'calc(54% - 27px)',
                }
            }],
            eileen: [],
        }
    })
    chrome.storage.local.set({ noticeTime: 5400000 });
    chrome.storage.local.set({ selectedSkin: 2 });
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
        dynamicPages: 1,
    });
    chrome.storage.local.set({
        theme: "diana"
    });
    chrome.storage.local.set({
        knownVersion: chrome.runtime.getManifest().version,
    })
    chrome.storage.local.set({
        dynamicData: {
            diana: [],
            ava: [],
            bella: [],
            eileen: []
        }
    });
    chrome.storage.local.set({
        dynamicTime: 0
    })
    chrome.storage.local.set({
        showNavigation: true,
        showTopsite: false,
        showDynamicBadge: false,
        showLiveBadge: false,
        showSecondMember: true
    })
    chrome.storage.local.set({
        lastDynamicIDSTR: {
            diana: '0',
            ava: '0',
            bella: '0',
            eileen: '0'
        }
    })
}