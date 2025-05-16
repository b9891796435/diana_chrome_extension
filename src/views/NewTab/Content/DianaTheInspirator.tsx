import React from "react";
import type { quote } from "../../../constants/storagePrototype/quotes";
import quotes from "../../../constants/storagePrototype/quotes";
import memberList, { members, getMemberIndex } from "../../../constants/memberList";
import tool from "../../../tool"
import { chromeGet, chromeSet } from "../../../tool/storageHandle";
const styles = {//Vue scoped css用习惯了有点懒得改，可惜对象写法写不出动画
    //写到银屯的时候已经恶堕成没有.css文件就写不下去的笨蛋了（确信，但还是很怀念scoped防止类名污染。container，我的container
    pot: {
        position: "fixed" as "fixed",
        bottom: "0",
        left: "0",
        height: "calc(100% - 50px)",
        zIndex: 3
    },
    diana: {
        height: "calc(54% - 27px)",//(100% - 50px) * ( 588 / 1080 )，这个比例是然比图与花盆图实际像素高之比。
        //太感谢注释了，还好我有写注释的习惯
        zIndex: 4,
        cursor: "pointer"
    },
    container: {
        position: "absolute" as "absolute",
        top: "50px",
        left: "0",
        width: "100%",
        height: "calc(100% - 50px)",
        zIndex: "-1"
    },
    dialog: {
        position: "absolute" as "absolute",
        bottom: "calc(54% - 27px)",
        left: ((window.innerHeight / 1080) * 437 - 225) + "px",
        //神奇吧，这里是设left为n，缩放比为scale，由于缩放以中心为基准，可得算式：n+225+225*scale=632*scale,225为对话框长度一半，632为然比图片长度。
        //需要调整位置请改动scale的系数。
        width: "450px",
        zIndex: "5",
        transform: "scale(" + (window.innerHeight / 1080) + ")",
        transitionDuration: "0.5s"
    },
    givingHeartMeme: {
        position: "absolute" as "absolute",
        left: "0",
        bottom: "0",
        width: "100px",
        height: "100px"
    },
    quote: {
        backgroundColor: "rgb(var(--fan))",
        padding: "16px",
        paddingLeft: "84px",
        marginLeft: "16px",
        fontSize: "1.5em",
        border: "#fff solid 2px",
        borderRadius: "4px",
        display: "block",
        color: "#fff",
        fontWeight: "600",
        wordWrap: "break-word" as "break-word",
    }
}
type stateType = {
    pose: number,
    dialogVisible: boolean,
    currentDialog: string,
    currentTimer: any,//AnyScript,永远滴神！
    autoTimer: any,
    curr_quote: quote,
    theme: members,
    selectedSkin: number
}
class DianaTheInspirator extends React.Component<{}, stateType> {
    constructor(props: any) {
        super(props);
        this.state = {
            pose: 0,
            dialogVisible: false,
            currentDialog: "关注嘉然然，顿顿解馋馋",
            currentTimer: 0,
            autoTimer: 0,
            curr_quote: quotes[0],
            theme: "diana",
            selectedSkin: 2
        }
        let start: DOMHighResTimeStamp | undefined;
        let RAFfunc = (timestamp: DOMHighResTimeStamp) => {
            if (start === undefined) {
                start = timestamp;
            }
            const elapsed = timestamp - start;
            this.setState({ pose: Math.floor(elapsed / 3000) % 2 === 0 ? 0 : 1 })
            requestAnimationFrame(RAFfunc);
        }
        requestAnimationFrame(RAFfunc);
    }
    componentDidMount = async () => {
        this.setState({
            curr_quote: await chromeGet("curr_quote"),
            theme: await chromeGet("theme"),
            selectedSkin: await chromeGet("selectedSkin")
        })
        this.pokingDiana()
    }
    pokingDiana = async () => {//理论上这个巨大的函数应该单拆出一个文件的，不过这个是单人项目，所以，摆！
        const setRetrigger = () => {
            clearTimeout(this.state.autoTimer)
            this.setState({
                autoTimer: setTimeout(() => {
                    this.pokingDiana()
                }, 70000)
            })
        }
        const theme = this.state.theme;
        //简单来讲，先判定问安，然后判定起身喝水，最后是日常语录
        if (document.hasFocus())
            if (this.state.currentTimer == 0) {//当前对话框未弹出
                const currentTime = tool.getTime();
                const hNow = Number(currentTime[1]);//当前小时
                let timeToRequest: "morning" | "noon" | "evening" | "night" | "none" = "none";
                let storageDate = await chromeGet("date")
                if (storageDate != currentTime[0]) {//若存储日期与当前日期不同，则重置时间记录
                    await chromeSet({
                        date: currentTime[0],
                        morning: false,
                        noon: false,
                        evening: false,
                        night: false,
                        notice: Date.now()
                    });
                }
                const setDialog = (dialog: string) => {//设置开启对话框的函数
                    this.setState({//乱起来了，这里先设定打开对话框，配置对话内容，然后在20秒后关闭对话框
                        currentTimer: setTimeout(() => {//20秒后关闭
                            this.setState({
                                dialogVisible: false,
                                currentTimer: 0,//重置计时器
                            });
                        }, 12000),
                        dialogVisible: true,
                        currentDialog: dialog,
                    });
                    return;//结束查找
                }
                //从这里开始是早午晚安
                if (hNow >= 6 && hNow <= 9) {
                    timeToRequest = "morning";
                } else if (hNow >= 11 && hNow <= 13) {
                    timeToRequest = "noon";
                } else if (hNow >= 17 && hNow <= 21) {
                    timeToRequest = "evening";
                } else if (hNow >= 21 || hNow <= 3) {
                    timeToRequest = "night";
                }
                if (timeToRequest != "none") {//若时间段符合问安时间段
                    const requestRes = await chromeGet(timeToRequest);
                    if (!requestRes) {
                        setDialog(this.state.curr_quote[timeToRequest]);
                        let temp: { [key: string]: boolean } = {};
                        temp[timeToRequest] = true
                        chromeSet(temp);
                        setRetrigger()
                        return;//结束查找
                    }
                }
                //问安结束，进入提醒运动喝水
                const requestRes = await chromeGet("notice");
                const noticeTime = await chromeGet("noticeTime")
                if (Date.now() - requestRes >= noticeTime) {
                    setDialog(this.state.curr_quote.notice[Math.floor(Math.random() * this.state.curr_quote.notice.length)])//简简单单一个乃0乃1随机器
                    await chromeSet({ notice: Date.now() });
                    setRetrigger()
                    return;
                }
                //提醒运动喝水结束，日常对话
                setDialog(this.state.curr_quote.daily[Math.floor(Math.random() * this.state.curr_quote.daily.length)]);
                setRetrigger()
                return;
            } else {//若当前已有计时器
                this.setState({ dialogVisible: false, currentTimer: 0 });//一次AC，没有Debug！好耶！
            }
        setRetrigger()
    }
    render(): React.ReactNode {
        return (
            <div style={styles.container}>
                <div style={Object.assign({}, styles.dialog, { opacity: this.state.dialogVisible ? "1" : "0" })}>
                    <img src={memberList[this.state.selectedSkin].themeImg.meme} alt="" style={styles.givingHeartMeme} />
                    <p style={styles.quote}>{this.state.currentDialog}</p>
                </div>
                <img src={require("../../../assets/images/background/flower_pot.png")} alt="" style={styles.pot} />
                <img src={memberList[this.state.selectedSkin].themeImg.positions[this.state.pose]} alt="" style={Object.assign({}, styles.pot, styles.diana)} onClick={this.pokingDiana} />
            </div>
        )
    }
}
export default DianaTheInspirator;