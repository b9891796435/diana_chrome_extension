import "./content.css"
import "./themeColor.css"
import { chromeGet, chromeSet } from "./tool/storageHandle"
chromeGet("tabCount").then(res => {
    if (typeof (res) != "number") {
        chromeSet({ tabCount: 0 })
    } else {
        chromeSet({ tabCount: res + 1 });
    }
})

let showDianaNotice = async () => {
    let noticeNode, removeNoticeNode;
    let curr_quote = await chromeGet('curr_quote');//TODO:combine
    let theme = 'diana'
    let elem = document.createElement("div");
    elem.className = "dianaNoticeContainer App " + theme;

    let BGDiv = document.createElement("div");
    BGDiv.className = "dianaQuoteBackground";

    let meme = document.createElement("div");
    switch (theme) {
        case "ava":
            meme.className = "ava memeImage";
            break;
        case "eileen":
            meme.className = "eileen memeImage";
            break;
        case "bella":
            meme.className = "bella memeImage bellaMemeImageAppearing"
            meme.addEventListener("animationend", () => {
                meme.className = "bella memeImage bellaMemeImageBlinking"
            })
            break;
        default:
            meme.className = "diana memeImage dianaMemeImageAppearing";
            meme.addEventListener("animationend", () => {
                meme.className = "diana memeImage dianaMemeImageBlinking"
            })
            break;
    }
    let quote = document.createElement("p");
    quote.className = "dianaQuote";
    let quoteToBe = curr_quote?.notice[Math.floor(Math.random() * curr_quote?.notice?.length)];
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
        elem.className = "dianaNoticeContainer dianaNoticeRemove App " + theme;
        elem.addEventListener("animationend", () => {
            elem.remove();
        })
    }
    setTimeout(removeNoticeNode, 20000);
    goBack.addEventListener("click", removeNoticeNode);
    document.body.append(elem);
}

setInterval(async () => {
    let shouldShowNotice = await chromeGet("shouldShowNotice")
    if (document.hasFocus() && shouldShowNotice) {
        let notice = await chromeGet("notice")
        let noticeTime = await chromeGet("noticeTime")
        let currentTheme = await chromeGet("theme")
        if (Date.now() - notice >= noticeTime) {
            chromeSet({ notice: Date.now() });
            let img = new Image();
            img.src = `https://raw.githubusercontent.com/b9891796435/duskmoon-bot-doc/main/src/assets/${currentTheme}Jumping.png`;
            setTimeout(() => {
                showDianaNotice();
            }, 3000)
        }
    }
}, 10000)
export { }
