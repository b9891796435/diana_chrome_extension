import React, { FormEvent, KeyboardEvent } from "react";
type searchProps = {
    keyword: string,
    engine: number,
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
        width:"100%",
        padding: "0 12px 0 48px",
        border: "none",
        borderRadius:"4px"
    },
    iconContainer: {
        position:"relative" as "relative",
        width:"40%",
    },
    icon: {
        height: "32px",
        width: "32px",
        position: "absolute" as "absolute",
        top:"8px",
        left:"8px",
    }
}
const searchEngine: { url: string, icon: string }[] = [
    {
        url: "https://www.baidu.com/s?wd=",
        icon: require("../../../assets/images/baidu.png")
    },
    {
        url: "https://www.google.com/search?q=",
        icon: require("../../../assets/images/google.png")
    },
    {
        url: "https://search.bilibili.com/all?keyword=",
        icon: require("../../../assets/images/bilibili.jpg")
    },
    {
        url: "https://www.bing.com/search?q=",
        icon: require("../../../assets/images/bing.png")
    },
]
class SearchBox extends React.Component<{}, searchProps>{
    constructor(props: any) {
        super(props);
        this.state = {
            keyword: "",
            engine: 0,
        }
    }
    inputListener: (e: FormEvent<HTMLInputElement>) => void = (e) => {
        this.setState({ keyword: e.currentTarget.value });
    }
    enterListener: (e: KeyboardEvent<HTMLInputElement>) => void = (e) => {
        console.log(e)
        if (e.key == "Enter") {
            window.location.href = searchEngine[this.state.engine] + this.state.keyword
        }
        if (e.key == "Tab") {
            e.preventDefault();
            this.setState({ engine: this.state.engine == 3 ? 0 : this.state.engine + 1 })
            console.log(this.state)
        }
    }
    render(): React.ReactNode {
        return (
            <div style={styles.container}>
                <div style={styles.iconContainer}>
                    <img src={searchEngine[this.state.engine].icon} alt="" style={styles.icon} />
                    <input type="text" onChange={this.inputListener} value={this.state.keyword} onKeyDown={this.enterListener} style={styles.searchBar} placeholder="输入关键词搜索，使用Tab切换搜索引擎，"/>
                </div>
            </div>
        )
    }
}
export default SearchBox;