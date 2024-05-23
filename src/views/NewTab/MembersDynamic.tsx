import React from "react";
import { getScheduleState } from "../../background";
import { chromeGet, dynamicData, dynamicListType, liveRCMDType, summaryBackdrop } from "../../tool/storageHandle";
import memberList, { members } from "../../constants/memberList";
import PopupBox from "../../components/PopupBox";
import MyButton from "../../components/MyButton";
import "./MembersDynamic.css";
type membersDynamicState = {
    membersDynamicVisible: boolean,
    membersDynamicNow: dynamicListType,
    isGettingDynamic: boolean
}
export default class MembersDynamic extends React.Component<{}, membersDynamicState> {
    constructor(props: any) {
        super(props);
        this.state = {
            membersDynamicVisible: false,
            membersDynamicNow: {
                ava: [],
                bella: [],
                diana: [],
                eileen: [],
                fiona: [],
                gladys: [],
            },
            isGettingDynamic: false,
        }
    }
    async componentDidMount() {
        this.setState({
            membersDynamicNow: await chromeGet("dynamicData"),
        });
        chrome.storage.onChanged.addListener(async key => {
            if (key.dynamicData) {
                this.setState({ membersDynamicNow: key.dynamicData.newValue });
            }
        })
        if (window.location.hash === ("#dynamic")) {
            this.setState({ membersDynamicVisible: true })
        }
    }
    showDynamic = () => {
        this.setState({ membersDynamicVisible: this.state.membersDynamicVisible ? false : true })
    }
    getLiveStateWrapper = async () => {
        this.setState({ isGettingDynamic: true });
        await Promise.all([
            getScheduleState(),
            new Promise<void>(resolve => {
                setTimeout(() => {
                    resolve()
                }, 1000)
            })
        ])
        this.setState({ isGettingDynamic: false });
    }
    dynamicRender = (dynamic: dynamicData) => {
        let nodeArray = [];
        if (dynamic.modules.module_dynamic?.desc?.rich_text_nodes)
            for (let i of dynamic.modules.module_dynamic.desc.rich_text_nodes) {
                switch (i.type) {
                    case 'RICH_TEXT_NODE_TYPE_TEXT':
                        nodeArray.push(<span>{i.text}</span>)
                        break;
                    case 'RICH_TEXT_NODE_TYPE_EMOJI':
                        nodeArray.push(<img src={i.emoji.icon_url} className="dynamicEmoji"></img>)
                        break;
                    case 'RICH_TEXT_NODE_TYPE_AT':
                        nodeArray.push(<a href={`https://space.bilibili.com/${i.rid}/dynamic`}>{i.text}</a>);
                        break;
                    case 'RICH_TEXT_NODE_TYPE_TOPIC':
                        nodeArray.push(<a href={i.jump_url}>{i.text}</a>)
                }
            }
        if (dynamic.type == 'DYNAMIC_TYPE_FORWARD') {
            nodeArray.push(<div className="dynamicForward">
                {this.dynamicRender(dynamic.orig)}
            </div>)
        }
        if (dynamic.type == 'DYNAMIC_TYPE_DRAW') {
            let drawArray: JSX.Element[] = []
            for (let i of dynamic.modules.module_dynamic.major.draw.items) {
                drawArray.push(
                    <img src={i.src + summaryBackdrop} alt="" />
                )
            }
            nodeArray.push(<div className="dynamicGallery">
                {drawArray}
            </div>)
        }
        if (dynamic.type == "DYNAMIC_TYPE_AV") {
            let avDetail = dynamic.modules.module_dynamic.major.archive
            nodeArray.push(<a href={'https:' + avDetail.jump_url} target='_blank'>
                <div className="dynamicAv">
                    <img src={avDetail.cover} alt="" />
                    <div>
                        <div>{avDetail.title}</div>
                        <div className="dynamicAvDesc">{avDetail.desc}</div>
                    </div>
                </div>
            </a>
            )
        }
        if (dynamic.type == "DYNAMIC_TYPE_LIVE_RCMD") {
            let liveDetail: liveRCMDType = JSON.parse(dynamic.modules.module_dynamic.major.live_rcmd.content);
            nodeArray.push(<a href={'https:' + liveDetail.live_play_info.link} target='_blank'>
                <div className="dynamicAv">
                    <img src={liveDetail.live_play_info.cover} alt="" />
                    <div>
                        <div>{liveDetail.live_play_info.title}</div>

                        <div className="dynamicAvDesc">正在直播中~</div>
                    </div>
                </div>
            </a>
            )
        }
        return (<div className="dynamicItem">
            <a href={"https:" + dynamic.modules.module_author.jump_url}>
                <img src={dynamic.modules.module_author.face} className="dynamicAvatar" alt="" />
            </a>
            <div>
                <div className="dynamicTitle">
                    <div>
                        {dynamic.modules.module_author.name}
                    </div>
                </div>
                <div>
                    {dynamic.modules.module_author.pub_time}
                </div>
                <a href={'https://t.bilibili.com/' + dynamic.id_str} target="_blank">
                    <div className="dynamicContent">
                        {nodeArray}
                    </div>
                </a>
            </div>
        </div>)
    }
    dynamicList = () => {
        let arr2Return: JSX.Element[] = []
        let dataArr: dynamicData[] = []
        for (let i in this.state.membersDynamicNow) {
            for (let j of this.state.membersDynamicNow[i as members]) {
                dataArr.push(j)
            }
        }
        //这里可以优化，但对于最多百位数的数据量......感觉没必要
        dataArr.sort((a, b) => b.modules.module_author.pub_ts - a.modules.module_author.pub_ts)
        for (let i of dataArr) {
            arr2Return.push(this.dynamicRender(i))
        }
        return arr2Return
    }
    render(): React.ReactNode {//突然感受到可复用组件的力量了
        return (<div style={{ marginLeft: "auto" }}>
            <MyButton text="成员朋友圈" onClick={this.showDynamic}></MyButton>
            <PopupBox header={<div>成员朋友圈</div>} visible={this.state.membersDynamicVisible}>
                <div className="dynamicContainer">
                    <div className={this.state.isGettingDynamic ? "gettingLive isGetting" : "gettingLive"} onClick={() => { if (!this.state.isGettingDynamic) this.showDynamic() }} />
                    {this.dynamicList()}
                </div>
            </PopupBox>
        </div>)
    }
}
// export const a = function () {
//     return <div></div>
// }