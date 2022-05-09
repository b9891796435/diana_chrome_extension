import React from "react";//开写银屯工具箱之前我以为然比对话就是技术顶点了
import PopupBox from "../../../../components/PopupBox"
import ToolContent from './ToolContent'
import "./YinTun.css"//e799b0实在塞不进工具箱里，所以上了antd调色板
type yinTunState = {
    toolVisible: boolean,
    edit: boolean,
}
class YinTun extends React.Component<{}, yinTunState> {//小伙伴你好，#摆手#会者不难
    constructor(props: any) {
        super(props);
        this.state = {
            toolVisible: false,
            edit: false,
        };
    }
    componentDidMount() {
        if (window.location.hash === ("#toolKit")) {
            this.setState({ toolVisible: true })
        }
    }
    render(): React.ReactNode {//捏麻麻的，jsx不能双斜杠注释急死我了
        return (
            <div>
                <div className="YinTun" onClick={() => this.setState({ toolVisible: this.state.toolVisible ? false : true })}>
                    <img src={require("../../../../assets/images/YinTun.png")} alt="" className="YinTunImg" />
                </div>
                <PopupBox visible={this.state.toolVisible} header={
                    [<div>工具箱|</div>,
                    <div onClick={() => this.setState({ edit: this.state.edit ? false : true })}><span style={{ fontSize: "0.6em", verticalAlign: "bottom", color: "#40a9ff", cursor: "pointer" }}>{this.state.edit ? "完成" : "编辑"}</span></div>
                    ]}>
                    <ToolContent edit={this.state.edit}></ToolContent>
                </PopupBox>
            </div>
        )
    }
}
export default YinTun;