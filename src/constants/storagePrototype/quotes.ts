import { members } from "../memberList"

type quote = {
    daily: string[],
    morning: string,
    noon: string,
    evening: string,
    night: string,
    notice: string[]
}
const carol: quote = {
    daily: [
        "嘉心糖要好好吃饭，每天都要开开心心的",//BV1bz4y1z7uu
        "我的小脑袋瓜里想的都是什么？想的都是你们呀",//BV1zv411Y7Rg
        "我的嘉心糖都是很厉害的人",//大赛官网
        "然比吃饺子喜欢蘸酱油哦",
        "最甜甜的小草莓，个子有一米八！",
        "番茄炒蛋拳！",
        "关注嘉然，顿顿解馋❤v❤",
        "我的脑子里没有废料哦，然比说了算哦~",//BV1cF411E7sW
    ],
    morning: "嘉心糖早上好，早上不许饿肚子哦！",
    noon: "嘉心糖中午好！午饭吃了没？没吃的话快去吃！",
    evening: "晚上好啊嘉心糖，不要因为太累而忽略晚饭哦",
    night: "已经很晚了捏，快点去睡觉哦。对了，如果吃夜宵的话不要睡太急，有可能会反酸的。",
    notice: [
        "突击检查！有好好在喝水吗？没有的话就去喝一口吧",
        "坐了这么长时间，去活动一下吧。伸伸胳膊踢踢腿，你也会像然比一样有个好身体的",
    ]
}
export type quotesType = {
    [key in members]: quote
}
const quotes: quotesType = {
    carol
};
export default quotes;