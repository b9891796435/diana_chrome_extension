import React from "react";
import './ToolItem.css'
export type toolItemData={
    url:string,
    summary:string
}
type itemProp = {
    url: string,
    summary: string,
    edit?: boolean,
    remove: Function
} | {
    newTool: boolean,
    newToolFun:React.MouseEventHandler,
}
type itemState = {
    favicon: string | null;
}
class ToolItem extends React.Component<itemProp, itemState>{
    constructor(props: itemProp) {
        super(props);
        this.state = {
            favicon: null,
        }
    }
    componentDidMount() {
        if ("url" in this.props) {
            let urlObj = new URL(this.props.url)
            fetch(this.props.url)
                .then(res => res.blob())
                .then(res => res.text())
                .then(res => {
                    let temp = document.createElement("template");
                    temp.innerHTML = res;
                    let iconURL = temp.content.querySelector(`link[rel="icon"]`)?.getAttribute("href")
                    if (iconURL) {
                        return fetch(iconURL[0] === "/" ? urlObj.origin + iconURL : iconURL);
                    } else {
                        throw new Error("获取图标失败");
                    }
                })
                .then(res => res.blob())
                .then(res => this.setState({ favicon: URL.createObjectURL(res) }))
                .catch(e=>console.log(e));//没能看到回调地狱还有点可惜（x
        }
    }
    contentBlock = () => {
        if ("newTool" in this.props && this.props.newTool) {
            let listener=this.props.newToolFun;
            return (
                <div onClick={listener}>
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="plus-circle" className="toolItemIcon" fill="currentColor" aria-hidden="true">
                        <path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                    </svg>
                    <div>添加新标签</div>
                </div>

            )
        } else {
            return (
                <div onClick={() => { if ("url" in this.props && !this.props.edit) window.open(this.props.url) }}>
                    <img src={this.state.favicon == null ? require("../../../../assets/images/defaultIcon.png") : this.state.favicon} alt="" className="toolItemIcon" />
                    <div>{"summary" in this.props ? this.props.summary : "小伙伴对不起 这里数据丢失了"}</div>
                    <svg style={"edit" in this.props && this.props.edit ? {} : { display: "none" }} onClick={() => { if ("edit" in this.props) this.props.remove({url:this.props.url,summary:this.props.summary}) }} viewBox="64 64 896 896" focusable="false" data-icon="close-circle" className="toolItemDeleteIcon" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
                </div>
            )
        }

    }
    render(): React.ReactNode {
        return (
            <div className="toolItemChild">
                {this.contentBlock()}
            </div>
        )
    }
}
export default ToolItem;