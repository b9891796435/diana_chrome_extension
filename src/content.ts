import quotes from "./constants/dianaInsprite"
chrome.storage.local.get("tabCount").then(res=>{
    if(typeof(res.tabCount)!="number"){
        chrome.storage.local.set({tabCount:0})
    }else{
        chrome.storage.local.set({tabCount:res.tabCount+1});
    }
})
let showDianaNotice=()=>{
    let s=document.styleSheets[document.styleSheets.length - 1];
        s.insertRule(`@keyframes heart-burst {
            0% {
                background-position: 0%;
            }
    
            100% {
                background-position: 100%;
            }
        }
        `);
        s.insertRule(`.dianaNoticeContainer{
            width:300px;
            position:fixed;
            bottom:0;
            right:0;
            min-height: 104px;
            background-color: #e799b0;
            padding: 16px;
            padding-left: 150px;
            border: #fff solid 2px;
            border-radius: 4px;
            backdrop-filter:blur(2px);
        }`);
        s.insertRule(`.dianaQuote {
            display: block;
            color: #fff;
            font-weight: 600;
            word-wrap: break-word;
        }`);
        s.insertRule(`.dianaMemeImage {
            display: block;
            width: 240px;
            height: 240px;
            background: url(https://pony.b9891796435.work/dianaJumping.png) 0 0 no-repeat;
            animation: heart-burst steps(17) 1.5s both;
            position:absolute;
            bottom: -60px;
            left: -44px;
            transform: scale(0.5);
        }`);
        let elem=document.createElement("div");
        elem.className="dianaNoticeContainer";
        let meme=document.createElement("div");
        meme.className="dianaMemeImage";
        let quote=document.createElement("p");
        quote.innerHTML=quotes.notice[Math.floor(Math.random()*quotes.notice.length)]
        quote.className="dianaQuote";
        elem.appendChild(meme);
        elem.appendChild(quote);
        document.body.append(elem);
}
setInterval(()=>{
    chrome.storage.local.get("notice")
    .then(res=>{
        if(Date.now() - res.notice >= 5400000){
            chrome.storage.local.set({notice:Date.now()});
            showDianaNotice();
        }

    })
})
export {}
