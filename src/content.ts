import "./content.css"
chrome.storage.local.get("tabCount").then(res => {
    if (typeof (res.tabCount) != "number") {
        chrome.storage.local.set({ tabCount: 0 })
    } else {
        chrome.storage.local.set({ tabCount: res.tabCount + 1 });
    }
})
let showDianaNotice = async () => {
    let noticeNode, removeNoticeNode;
    let elem = document.createElement("div");
    elem.className = "dianaNoticeContainer";

    let BGDiv = document.createElement("div");
    BGDiv.className = "dianaQuoteBackground";

    let meme = document.createElement("div");
    meme.className = "dianaMemeImage dianaMemeImageAppearing";
    meme.addEventListener("animationend", () => {
        meme.className = "dianaMemeImage dianaMemeImageBlinking"
    })

    let quote = document.createElement("p");
    quote.className = "dianaQuote";
    let quotes = await chrome.storage.local.get("quotes");
    quotes = quotes.quotes
    let quoteToBe = quotes?.notice[Math.floor(Math.random() * quotes?.notice?.length)];
    quote.innerHTML = quoteToBe !== undefined ? quoteToBe : "突击检查！有好好在喝水吗？没有的话就去喝一口吧"

    let goBack = document.createElement("div");
    goBack.className = "dianaGoBack"
    goBack.innerHTML = "x"

    elem.appendChild(meme);
    elem.appendChild(BGDiv);
    BGDiv.appendChild(quote);
    elem.appendChild(goBack);
    noticeNode = elem;
    removeNoticeNode = () => {
        elem.className = "dianaNoticeContainer dianaNoticeRemove";
        elem.addEventListener("animationend", () => {
            elem.remove();
        })
    }
    setTimeout(removeNoticeNode, 20000);
    goBack.addEventListener("click", removeNoticeNode);
    document.body.append(elem);
}
setInterval(() => {
    if (document.hasFocus()) {
        chrome.storage.local.get("notice")
            .then(res => {
                if (Date.now() - res.notice >= 5400000) {
                    chrome.storage.local.set({ notice: Date.now() });
                    showDianaNotice();
                }
            })
    }
}, 10000)
export { }
