import React, { FormEvent, KeyboardEvent } from "react";
import { chromeGet, searchEngineType } from "../../../tool/storageHandle";
import NavigationItem from "../../../components/NavigationItem";
import "./SearchBox.css"
import { toolItemData } from "./YinTun/ToolItem";

type searchProps = {
    keyword: string,
    currentEngine: number,
    searchEngines: searchEngineType,
    toolList:toolItemData[]
}
class SearchBox extends React.Component<{}, searchProps>{
    constructor(props: any) {
        super(props);
        this.state = {
            keyword: "",
            currentEngine: 0,
            searchEngines: [
                {
                    url: "https://www.baidu.com/s?wd=%keyword%",
                    icon: require("../../../assets/images/baidu.png"),
                    engineName: "百度"
                },
                {
                    url: "https://www.google.com/search?q=%keyword%",
                    icon: require("../../../assets/images/google.png"),
                    engineName: "谷歌"
                },
                {
                    url: "https://search.bilibili.com/all?keyword=%keyword%",
                    icon: require("../../../assets/images/bilibili.jpg"),
                    engineName: "b站"
                },
                {
                    url: "https://www.bing.com/search?q=%keyword%",
                    icon: require("../../../assets/images/bing.png"),
                    engineName: "必应"
                },
            ],
            toolList:[]
        }
    }
    async componentDidMount() {
        this.setState({
            toolList:await chromeGet("toolList"),
            currentEngine: await chromeGet("defaultEngine"),
            searchEngines: await chromeGet("searchEngine"),
        })
        chrome.storage.onChanged.addListener(key => {
            if (key.toolList) {
                this.setState({
                    toolList: key.toolList.newValue
                })
            }
        })
    }
    inputListener: (e: FormEvent<HTMLInputElement>) => void = (e) => {
        this.setState({ keyword: e.currentTarget.value });
    }
    enterListener: (e: KeyboardEvent<HTMLInputElement>) => void = (e) => {
        if (e.key == "Enter") {
            window.location.href = this.state.searchEngines[this.state.currentEngine].url.replace("%keyword%", this.state.keyword)
        }
        if (e.key == "Tab") {
            e.preventDefault();
            this.setState({ currentEngine: this.state.currentEngine == this.state.searchEngines.length - 1 ? 0 : this.state.currentEngine + 1 })
        }
    }
    render(): React.ReactNode {
        let nodeArray=[]
        for(let i =0;i<Math.min(6,this.state.toolList.length);i++){
            nodeArray.push(<NavigationItem key={this.state.toolList[i].url} url={this.state.toolList[i].url} summary={this.state.toolList[i].summary}/>)
        }
        let hNow = Number(Date().split(" ")[4].split(":")[0])
        let skySub=hNow<=6||hNow>=19
        return (
            <div className="searchBoxContainer">
                <div className="searchBoxIconContainer">
                    {
                        this.state.searchEngines[this.state.currentEngine].icon
                            ? <img src={this.state.searchEngines[this.state.currentEngine].icon} alt="" className="searchBoxIcon" />
                            : <div className="searchBoxIcon searchBoxDivIcon">
                                <div style={{ margin: "auto" }}>
                                    {this.state.searchEngines[this.state.currentEngine].engineName[0]}
                                </div>
                            </div>
                    }
                    <input type="text" onChange={this.inputListener} value={this.state.keyword} onKeyDown={this.enterListener} className="searchBoxSearchBar" placeholder="输入关键词搜索，使用Tab切换搜索引擎，" />
                </div>
                <div className="searchBoxNavigationBar">
                    <div style={{margin:"auto",color:skySub?"#fff":"#000"}}>快捷导航：</div>
                    {nodeArray}
                </div>
            </div>
        )
    }
}
export default SearchBox;