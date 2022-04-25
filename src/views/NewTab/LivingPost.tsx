import React from "react";
import memberList from "../../constants/memberList";
import { chromeGet, liveStateType } from "../../tool/storageHandle";
const styles = {
    livingPostDiv: {
        position: "relative" as "relative",
        marginLeft: "auto",
        alignSelf: "start",
        display: "flex",
        padding: "0 30px"
    },
    livingNotice: {
        borderRadius: "5px",
        fontSize: "16px",
        display: "block",
        backgroundColor: "rgba(255,255,255,0.45)",
        boxShadow: "0px 0px 10px 1px rgb(255 255 255 / 30%)",
        padding: "8px",
        margin: "auto",
        zIndex: "2",
        fontWeight: "600",
        marginTop: "8px",

    },
    livingPost: {
        height: "50px",
        width: "100%",
        position: "absolute" as "absolute",
        top: "0",
        right: "0",
        zIndex: "1"
    }
}
type postState = {
    nowLiving: liveStateType,
}
export default class LivingPost extends React.Component<{}, postState> {
    constructor(props: any) {
        super(props);
        this.state = {
            nowLiving: "none"
        }
    }
    async componentDidMount() {
        if (await chromeGet("fetchLive")) {
            this.setState({ nowLiving: await chromeGet("liveState") });
        }
        chrome.storage.onChanged.addListener(key => {
            if (key.liveState) {
                this.setState({ nowLiving: key.liveState.newValue });
            }
        })
    }
    render(): React.ReactNode {
        if (this.state.nowLiving === "none") {
            return (
                <div style={styles.livingPostDiv}>
                    <span style={styles.livingNotice}>A-SOUL时代，沸腾期待！</span>
                    <img src={require("../../assets/images/AsoulPost.webp")} alt="" style={styles.livingPost} />
                </div>
            )
        } else {
            return (
                <a href={memberList[this.state.nowLiving].livingRoom}>
                    <div style={styles.livingPostDiv}>
                        <span style={styles.livingNotice}>{memberList[this.state.nowLiving].chineseName + "正在直播，点击以进入直播间"}</span>
                        <img src={memberList[this.state.nowLiving].post} alt="" style={styles.livingPost} />
                    </div>
                </a>
            )
        }
    }
}


