import React from 'react'
import MyMessage from '../../components/MyMessage';
import MyInput from '../../components/MyInput';
import MyButton from '../../components/MyButton';
import ArrayRender from './ArrayRender';
import { chromeGet, chromeSet, searchEngineType } from '../../tool/storageHandle';
import { resetStorage } from "../../tool/fixStorage"
import "./App.css"
type settingsState = {
  quotes: {
    daily: string[],
    morning: string,
    noon: string,
    evening: string,
    night: string,
    notice: string[],
  },
  noticeTime: string,
  shouldShowNotice: boolean,
  fetchLive: boolean,
  infoMessage: string,
  isError: boolean,
  defaultEngine: number,
  searchEngine: searchEngineType
}
type quotesArrayName = "daily" | "notice"
type quotesSingleName = "morning" | "noon" | "evening" | "night"
type quotesSingleHandlerGenerator = {
  (arg0: quotesSingleName): React.ChangeEventHandler<HTMLInputElement>
}
type handleType = "new" | "delete" | "change"
const checkboxStyle: React.CSSProperties = {
  width: "20px",
  height: "20px",
  margin: "0",
  verticalAlign: "bottom",
}
const settingErrors = {
  dailyEmpty: "日常条目中至少请保留一条数据",
  noticeEmpty: "久坐提醒条目中至少请保留一条数据",
  noticeTimeNAN: "请在久坐提醒间隔时间中输入正确的数字",
}
class App extends React.Component<{}, settingsState> {//呜呜呜表单好可怕我要回Vue
  constructor(props: any) {
    super(props);
    this.state = {
      quotes: {//啧，希望这个永远都不会被展示吧
        daily: ["数据损坏"],
        morning: "数据损坏",
        noon: "数据损坏",
        evening: "数据损坏",
        night: "数据损坏",
        notice: ["数据损坏"],
      },
      noticeTime: "",
      shouldShowNotice: true,
      fetchLive: true,
      infoMessage: "",
      isError: true,
      defaultEngine: 0,
      searchEngine: [
        {
          url: "数据损坏",
          engineName: "数据损坏"
        },
        {
          url: "数据损坏",
          engineName: "数据损坏"
        },
        {
          url: "数据损坏",
          engineName: "数据损坏"
        },
        {
          url: "数据损坏",
          engineName: "数据损坏"
        },
      ]
    }
  }
  componentDidMount() {
    chromeGet("quotes").then(res => {
      if (res.daily) {
        this.setState({ quotes: res })
      }
    })
    chromeGet("noticeTime").then(res => {
      if (res) {
        this.setState({ noticeTime: res.toString() });
      }
    })
    chromeGet("shouldShowNotice").then(res => {
      if (res !== undefined) {
        this.setState({
          shouldShowNotice: res,
        })
      }
    })
    chromeGet("fetchLive").then(res => {
      if (res !== undefined) {
        this.setState({
          fetchLive: res
        })
      }
    })
  }
  handleDialogForArray = (attr: quotesArrayName, handleType: handleType) => {
    let temp = { ...this.state.quotes };
    switch (handleType) {
      case "new": {
        return () => {
          temp[attr] = temp[attr].concat([""]);
          this.setState({ quotes: temp });
        }
      }
      case "delete": {
        return (i: number) => {
          temp[attr] = temp[attr].slice(0, i).concat(temp[attr].slice(i + 1, temp[attr].length));
          this.setState({ quotes: temp });
        }
      }
      case "change": {
        return (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
          temp[attr][i] = e.target.value;
          this.setState({ quotes: temp });
        }
      }
    }
  }
  handleDialogForSingle: quotesSingleHandlerGenerator = quoteType => {//写完发现这函数名好大只哦
    return e => {
      let temp = { ...this.state.quotes };
      temp[quoteType] = e.target.value;
      this.setState({ quotes: temp })
    }
  }
  saveSetting = () => {
    if (this.state.quotes.daily.length === 0) {
      this.setState({ infoMessage: settingErrors.dailyEmpty, isError: true });
      return;
    }
    if (this.state.quotes.notice.length === 0) {
      this.setState({ infoMessage: settingErrors.noticeEmpty, isError: true });
      return;
    }
    if (Number.isNaN(Number(this.state.noticeTime))) {
      this.setState({ infoMessage: settingErrors.noticeTimeNAN, isError: true });
      return;
    }
    this.setState({ infoMessage: "保存成功", isError: false });
    chromeSet({
      quotes: this.state.quotes,
      noticeTime: Number(this.state.noticeTime),
      shouldShowNotice: this.state.shouldShowNotice,
      fetchLive: this.state.fetchLive
    })
  }
  EngineRender = () => {
    let nodeArray: JSX.Element[] = [];
    let currentEngine = { ...this.state.searchEngine }
    let i;
    let changeListener = (i: any, prop: keyof typeof currentEngine[number]) => {
      let temp = currentEngine[i];
      return (e: React.ChangeEvent<HTMLInputElement>) => {
        temp[prop] = e.target.value
        this.setState({
          searchEngine: currentEngine
        })
      }
    }
    for (i in currentEngine) {
      nodeArray.push(
        <div key={currentEngine[i].engineName}>
          <MyInput label={i + ".搜索引擎名称"} value={currentEngine[i].engineName} onChange={changeListener(i, "engineName")}></MyInput>
          <MyInput label="url（以“%keyword%”作为插入关键字的标志）" value={currentEngine[i].url} onChange={changeListener(i, "url")}></MyInput>
        </div>
      )
    }
    return nodeArray;
  }
  render(): React.ReactNode {
    return (
      <div className="App">
        <div className="settingContainerForDiana">
          <h1>对话文本设置</h1>
          <ArrayRender
            data={this.state.quotes.daily}
            label="日常" newItem={this.handleDialogForArray("daily", "new")}
            deleteItem={this.handleDialogForArray("daily", "delete")}
            onChange={this.handleDialogForArray("daily", "change") as (e: React.ChangeEvent<HTMLInputElement>, i: number) => void}
          />
          <MyInput label='早间' value={this.state.quotes.morning} onChange={this.handleDialogForSingle("morning")} />
          <MyInput label='午间' value={this.state.quotes.noon} onChange={this.handleDialogForSingle("noon")} />
          <MyInput label='晚间' value={this.state.quotes.evening} onChange={this.handleDialogForSingle("evening")} />
          <MyInput label='深夜' value={this.state.quotes.night} onChange={this.handleDialogForSingle("night")} />
          <ArrayRender
            data={this.state.quotes.notice}
            label="久坐提醒" newItem={this.handleDialogForArray("notice", "new")}
            deleteItem={this.handleDialogForArray("notice", "delete")}
            onChange={this.handleDialogForArray("notice", "change") as (e: React.ChangeEvent<HTMLInputElement>, i: number) => void}
          />
          <h1>搜索引擎设置</h1>
          <div>
            
          </div>
          <div>
            <span className='myInputForDianaContainer'>自定义搜索引擎:</span>
            {this.EngineRender()}
          </div>
          <h1>其他设置</h1>
          <MyInput label="久坐提醒间隔时间（单位：毫秒）" value={this.state.noticeTime} onChange={e => this.setState({ noticeTime: e.target.value })}></MyInput>
          <div>
            <span className='myInputForDianaContainer'>是否开启跨页久坐提醒:</span>
            <input type="checkbox" style={checkboxStyle} defaultChecked={this.state.shouldShowNotice} onChange={e => this.setState({ shouldShowNotice: e.target.checked })} />
          </div>
          <div>
            <span className='myInputForDianaContainer'>是否开启直播间状态检测:</span>
            <input type="checkbox" style={checkboxStyle} defaultChecked={this.state.fetchLive} onChange={e => this.setState({ fetchLive: e.target.checked })} />
          </div>
          <div>
            <MyMessage text={this.state.infoMessage} style={{ display: this.state.infoMessage ? "block" : "none", backgroundColor: this.state.isError ? "#ff4d4f" : "#52c41a" }}></MyMessage>
          </div>
          <div style={{ display: "flex" }}>
            <MyButton text={"保存"} onClick={this.saveSetting} />
            <MyButton text={"重置设置"} onClick={() => { if (window.confirm("即将重置插件设置（包括自定义的对话及工具箱内的快捷导航），是否确认？")) resetStorage() }} />
          </div>
        </div>
      </div>
    );
  }
}

export default App
