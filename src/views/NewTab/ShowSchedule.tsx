import React from "react";
import { getScheduleState } from "../../background";
import { chromeGet, scheduleType } from "../../tool/storageHandle";
import PopupBox from "../../components/PopupBox";
import MyButton from "../../components/MyButton";
import "./ShowSchedule.css";

type scheduleState = {
    scheduleVisible: boolean,
    scheduleNow: scheduleType,
    currentImage: number,
    isGettingSchedule: boolean
}
export default class ShowSchedule extends React.Component<{}, scheduleState>{
    constructor(props: any) {
        super(props);
        this.state = {
            scheduleVisible: false,
            scheduleNow: 0,
            currentImage: 0,
            isGettingSchedule: false,
        }
    }
    async componentDidMount() {
        this.setState({
            scheduleNow: await chromeGet("scheduleState"),
        });
        console.log(this.state)
        chrome.storage.onChanged.addListener(async key => {
            if (key.scheduleState) {
                this.setState({ scheduleNow: key.scheduleState.newValue });
            }
        })
    }
    showSchedule = () => {
        this.setState({ scheduleVisible: this.state.scheduleVisible ? false : true })
    }
    getLiveStateWrapper = async () => {
        this.setState({ isGettingSchedule: true });
        await Promise.all([
            getScheduleState(),
            new Promise<void>(resolve => {
                setTimeout(() => {
                    resolve()
                }, 1000)
            })
        ])
        this.setState({ isGettingSchedule: false });
    }
    ImageRender = () => {//麻了，这就是屎山吗
        if (typeof (this.state.scheduleNow) !== "number") {
            let nodeArray: JSX.Element[] = []
            let jumpImg = (imgId: number) => {
                this.setState({
                    currentImage: imgId
                })
            }
            for (let i in this.state.scheduleNow.images) {
                nodeArray.push((<span className={Number(i) === this.state.currentImage ? "" : "linkClass"} onClick={() => jumpImg(Number(i))}> {Number(i) + 1}</span>))
            }
            let click = () => {
                //@ts-expect-error
                window.open(this.state.scheduleNow.images[this.state.currentImage].img_src)
            }
            return (
                <div>
                    <div>
                        日程表共{this.state.scheduleNow.images.length}张<br />[ {nodeArray} ]<br />切换时会有一段加载时间
                    </div>
                    <img src={this.state.scheduleNow.images[this.state.currentImage].img_src} style={{ width: "100%" }} onClick={click} alt="" />
                </div>
            )
        } else {
            return (<div>adsfafadsfa</div>);
        }
    }
    scheduleContent = () => {
        let ImageRender = this.ImageRender
        if (typeof (this.state.scheduleNow) === "number") {
            return (<div style={{ fontSize: "16px" }}>
                日程表动态抓取失败，可能由于是第一次打开插件、网络波动、短时间内获取次数过多、b站更改API格式或羊驼发日程表的动态里没有加入日程表这三个字。<br />
                上次获取时间：{new Date(this.state.scheduleNow).toString()}，<span onClick={this.getLiveStateWrapper} className="linkClass">点击重试</span>
            </div>)
        } else {
            return (<div style={{ fontSize: "16px" }}>
                日程表发布时间：{new Date(this.state.scheduleNow.dynamicDate).toString()}<br />
                日程表抓取时间：{new Date(this.state.scheduleNow.getDate).toString()}，<span className="linkClass" onClick={this.getLiveStateWrapper}>点击重试</span><br />
                <ImageRender />
            </div>)
        }
    }
    render(): React.ReactNode {//突然感受到可复用组件的力量了
        let ScheduleContent = this.scheduleContent
        return (<div style={{ marginLeft: "auto" }}>
            <MyButton text="直播日程表" onClick={this.showSchedule}></MyButton>
            <PopupBox header={<div>直播日程表</div>} visible={this.state.scheduleVisible}>
                <div>
                    <div className={this.state.isGettingSchedule ? "gettingLive isGetting" : "gettingLive"} onClick={()=>{if(!this.state.isGettingSchedule)this.showSchedule()}}/>
                    <ScheduleContent />
                </div>
            </PopupBox>
        </div>)
    }
}