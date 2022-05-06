import React from 'react'
import ToolItem from './ToolItem'
import { toolItemData } from './ToolItem'
import MyInput from '../../../../components/MyInput'
import MyButton from '../../../../components/MyButton'
import MyMessage from '../../../../components/MyMessage'
import { fixStorage } from '../../../../tool/fixStorage'
import { chromeGet,chromeSet } from '../../../../tool/storageHandle'
import "./ToolContent.css"
type toolBoxProps = {
    edit: boolean,
}
type toolBoxState = {
    dialogVisible: boolean,
    toolList: toolItemData[],
    newURL: string,
    newSummary: string,
    messageVisible:boolean,
    message:string
}
export default class ToolBox extends React.Component<toolBoxProps, toolBoxState>{
    constructor(props: toolBoxProps) {
        super(props);
        this.state = {
            dialogVisible: false,
            toolList: [{ url: "https://asoulcnki.asia", summary: "枝网查重" }, { url: "https://asoulwiki.com", summary: "一个魂百科" }],
            newURL: "",
            newSummary: "",
            messageVisible:false,
            message:"请输入以https://开头的链接"
        }
    }
    componentDidMount() {
        chromeGet("toolList").then(res => {
            if (res&&Array.isArray(res)) {
                this.setState({
                    toolList: res
                })
            }else{
                fixStorage()
            }
        })
        chrome.storage.onChanged.addListener(key => {
            if (key.toolList) {
                this.setState({
                    toolList: key.toolList.newValue
                })
            }
        })
    }
    remove=(i: toolItemData)=>{
        chromeSet({
            toolList: this.state.toolList.filter(item => item.summary !== i.summary && item.url !== i.url)
        })
    }
    newToolFun=()=>{
        this.setState({
            newSummary: "",
            newURL: "",
            dialogVisible:true,
            messageVisible:false
        })
    }
    newTool=()=>{
        if(RegExp("https://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]").test(this.state.newURL)){
            let temp=[...this.state.toolList]
            temp.push({url:this.state.newURL,summary:this.state.newSummary});
            chromeSet({
                toolList: temp,
            })
            this.setState({dialogVisible:false,messageVisible:false})
        }else{
            this.setState({messageVisible:true})
        }
    }
    contentNodes() {
        let nodeArray = [];
        for (let i of this.state.toolList) {//想加个key的可是不知道会不会有人写一堆一样的url和summary
            nodeArray.push(<ToolItem url={i.url} key={i.url} summary={i.summary} remove={this.remove} edit={"edit" in this.props && this.props.edit}></ToolItem>)
        }
        nodeArray.push(<ToolItem newTool newToolFun={this.newToolFun} />)
        return nodeArray;
    }
    render(): React.ReactNode {//每到用表单的时候就会怀念vue的自动双向绑定
        return (
            <div className='toolBoxContentDiv'>
                {this.contentNodes()}
                <div className='newToolMaskLayer' style={this.state.dialogVisible ? {} : { display: "none" }}>
                    <div className="newToolDialogBox">
                        <MyInput label='标题' value={this.state.newSummary} onChange={e => this.setState({ newSummary: e.target.value })} />
                        <MyInput label='链接/URL' value={this.state.newURL} onChange={e => this.setState({ newURL: e.target.value })} />
                        <div className="newToolButtonContainer">
                            <MyMessage text={this.state.message} style={this.state.messageVisible?{marginRight:"auto"}:{display:"none"}}></MyMessage>
                            <MyButton text="确定" onClick={this.newTool} />
                            <MyButton text='取消' onClick={() => this.setState({ dialogVisible: false })}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}