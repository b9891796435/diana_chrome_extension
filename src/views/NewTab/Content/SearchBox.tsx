import React, { FormEvent, KeyboardEvent } from "react";
import { chromeGet, searchEngineType } from "../../../tool/storageHandle";

type searchProps = {
    keyword: string,
    currentEngine: number,
    searchEngines: searchEngineType
}
const styles = {
    container: {
        height: "64px",
        backgroundColor: "#e799b035",
        padding: "50px",
        display: "flex",
        flexDirection: "column" as "column",//???我不好说，咱也不知道为啥column不会被判定为column类型。Position系的似乎都出这个问题了。
        justifyContent: "center",
        alignItems: "center",
    },
    searchBar: {
        height: "48px",
        width: "100%",
        padding: "0 12px 0 48px",
        border: "none",
        borderRadius: "4px"
    },
    iconContainer: {
        position: "relative" as "relative",
        width: "40%",
    },
    icon: {
        height: "32px",
        width: "32px",
        position: "absolute" as "absolute",
        top: "8px",
        left: "8px",
    },
    divIcon: {
        display: "flex",
        borderRadius: "4px",
        backgroundColor: "#1890ff",
        color: "#ffffef",
        fontSize: "1.3em",
        fontWeight: "600",
    }
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
            ]
        }
    }
    async componentDidMount(){
        this.setState({
            currentEngine:await chromeGet("defaultEngine"),
            searchEngines:await chromeGet("searchEngine"),
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
        return (
            <div style={styles.container}>
                <div style={styles.iconContainer}>
                    {
                        this.state.searchEngines[this.state.currentEngine].icon
                            ? <img src={this.state.searchEngines[this.state.currentEngine].icon} alt="" style={styles.icon} />
                            : <div style={Object.assign({}, styles.icon, styles.divIcon)}>
                                <div style={{margin:"auto"}}>
                                    {this.state.searchEngines[this.state.currentEngine].engineName[0]}
                                </div>
                            </div>
                    }

                    <input type="text" onChange={this.inputListener} value={this.state.keyword} onKeyDown={this.enterListener} style={styles.searchBar} placeholder="输入关键词搜索，使用Tab切换搜索引擎，" />
                </div>
            </div>
        )
    }
}
export default SearchBox;