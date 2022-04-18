import React, { useState } from "react";
import quotes from "../../../constants/dianaInsprite"
import tool from "../../../tool"
const styles = {//Vue scoped css用习惯了有点懒得改，可惜对象写法写不出动画
    pot: {
        position: "fixed" as "fixed",
        bottom: "0",
        left: "0",
        height: "calc(100% - 50px)",
        zIndex: 3
    },
    diana: {
        height: "calc(54% - 27px)",//(100% - 50px) * ( 588 / 1080 )，这个比例是然比图与花盆图实际像素高之比。
        zIndex: 4,
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
        left: "8%",
        width:"450px",
        zIndex: "5",
        transform: "scale(" + (window.innerHeight / 1080) + ")",
        transitionDuration:"0.5s"
    },
    givingHeartMeme: {
        position: "absolute" as "absolute",
        left:"0",
        bottom:"0",
    },
    quote:{
        backgroundColor: "#e799b0",
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
const poseArray = [require("../../../assets/images/background/diana_1.png"), require("../../../assets/images/background/diana_2.png")]
type stateType = {
    pose: number,
    dialogVisible: boolean,
    currentDialog: string,
    currentTimer:number,
}
class DianaTheInspirator extends React.Component<{}, stateType>{
    constructor(props: any) {
        super(props);
        this.state = {
            pose: 0,
            dialogVisible: false,
            currentDialog: "关注嘉然然，顿顿解馋馋",
            currentTimer:0,
        }
        setInterval(() => {
            this.setState({ pose: this.state.pose ? 0 : 1 });
        }, 2500);
    }
    pokingDiana=()=>{
        this.setState({dialogVisible:this.state.dialogVisible?false:true})
        const currentTime=tool.getTime();
        if(this.state.currentTimer==0){
            chrome.storage.local.get("date").then(res=>{
                if(typeof(res)=="string"){
                    if(res==currentTime[0]){
                        console.log("开摆！")
                    }
                }
            })
        }
    }
    render(): React.ReactNode {
        return (
            <div style={styles.container}>
                <div style={Object.assign({},styles.dialog,{opacity:this.state.dialogVisible?"1":"0"})}>
                    <img src={require("../../../assets/images/background/diana_giving_heart.webp")} alt="" style={styles.givingHeartMeme}/>
                    <p style={styles.quote}>{this.state.currentDialog}</p>
                </div>
                <img src={require("../../../assets/images/background/flower_pot.png")} alt="" style={styles.pot} />
                <img src={poseArray[this.state.pose]} alt="" style={Object.assign({}, styles.pot, styles.diana)} onClick={this.pokingDiana} />
            </div>
        )
    }
}
export default DianaTheInspirator;