import React from "react";
import { getScheduleState } from "../../background";
import { chromeGet, scheduleType } from "../../tool/storageHandle";
import PopupBox from "../../components/PopupBox";
import MyButton from "../../components/MyButton";
import "./ShowSchedule.css";

type scheduleState = {
    scheduleVisible: boolean,
    scheduleNow: scheduleType,
    isGettingSchedule: boolean
}
export default class ShowSchedule extends React.Component<{}, scheduleState>{
    constructor(props: any) {
        super(props);
        this.state = {
            scheduleVisible: false,
            scheduleNow: 0,
            isGettingSchedule: false,
        }
    }
    async componentDidMount() {
        this.setState({
            scheduleNow: await chromeGet("scheduleState"),
        });
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
            for (let i of this.state.scheduleNow.images) {
                nodeArray.push(<img src={i.img_src} style={{ width: "100%" }} onClick={() => window.open(i.img_src)}></img>)
            }
            let jumpToDynamic = () => {
                if (typeof this.state.scheduleNow !== 'number') {
                    window.open('https://t.bilibili.com/' + this.state.scheduleNow.dynamicID)
                }
            }
            return (
                <div>
                    <div>
                        日程表共{this.state.scheduleNow.images.length}张,
                        <span className={"linkClass"} onClick={jumpToDynamic}>跳转至日程表动态</span><br />
                    </div>
                    {nodeArray}
                </div>
            )
        } else {
            return (<div>adsfafadsfa</div>);
        }
    }
    scheduleContent = () => {
        let ImageRender = this.ImageRender;
        const parseTime = (time: Date) => {
            return (time.getMonth() + 1) + "月" + time.getDate() + "日" + time.toString().split(" ")[4]
        }
        if (typeof (this.state.scheduleNow) === "number") {
            let getDate = new Date(this.state.scheduleNow);
            return (<div style={{ fontSize: "16px" }}>
                日程表动态抓取失败，可能由于是第一次打开插件、网络波动、短时间内获取次数过多、b站更改API格式或羊驼发日程表的动态里没有加入日程表这三个字。<br />
                上次获取时间：{parseTime(getDate)}，<span onClick={this.getLiveStateWrapper} className="linkClass">点击重试</span>
            </div>)
        } else {
            let dynamicDate = new Date(this.state.scheduleNow.dynamicDate);
            let getDate = new Date(this.state.scheduleNow.getDate);
            return (<div style={{ fontSize: "16px" }}>
                日程表发布时间：{parseTime(dynamicDate)}<br />
                日程表抓取时间：{parseTime(getDate)}，<span className="linkClass" onClick={this.getLiveStateWrapper}>点击重试</span><br />
                <ImageRender />
            </div>)
        }
    }
    render(): React.ReactNode {//突然感受到可复用组件的力量了
        let ScheduleContent = this.scheduleContent
        return (<div>
            <MyButton text="直播日程表" onClick={this.showSchedule}></MyButton>
            <PopupBox header={<div>直播日程表</div>} visible={this.state.scheduleVisible}>
                <div>
                    <div className={this.state.isGettingSchedule ? "gettingLive isGetting" : "gettingLive"} onClick={() => { if (!this.state.isGettingSchedule) this.showSchedule() }} />
                    <ScheduleContent />
                </div>
            </PopupBox>
        </div>)
    }
}