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
const iconStyle:React.CSSProperties={
  position: "absolute",
  width: "20px",
  bottom: "4px",
  right: "-20px",
  height: "20px",
  cursor:"pointer"
}
const settingErrors = {
  dailyEmpty: "日常条目中至少请保留一条数据",
  noticeEmpty: "久坐提醒条目中至少请保留一条数据",
  noticeTimeNAN: "请在久坐提醒间隔时间中输入正确的数字",
  engineNotSafe:"搜索引擎url只接受以https://开头的网址",
  engineNameEmpty:"搜索引擎名称不能为空"
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
      ]
    }
  }
  async componentDidMount() {
    this.setState({
      quotes: await chromeGet("quotes"),
      noticeTime: (await chromeGet("noticeTime")).toString(),
      shouldShowNotice: await chromeGet("shouldShowNotice"),
      fetchLive: await chromeGet("fetchLive"),
      defaultEngine: await chromeGet("defaultEngine"),
      searchEngine: await chromeGet("searchEngine")
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
    for(let i of this.state.searchEngine){
      if(!RegExp("https://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]").test(i.url)){
        this.setState({infoMessage:settingErrors.engineNotSafe,isError:true});
      }
      if(i.engineName===""){
        this.setState({infoMessage:settingErrors.engineNameEmpty,isError:true})
      }
    }
    this.setState({ infoMessage: "保存成功", isError: false });
    chromeSet({
      quotes: this.state.quotes,
      noticeTime: Number(this.state.noticeTime),
      shouldShowNotice: this.state.shouldShowNotice,
      fetchLive: this.state.fetchLive,
      defaultEngine:this.state.defaultEngine,
      searchEngine:this.state.searchEngine,
    })
  }
  EngineRender = () => {
    let nodeArray: JSX.Element[] = [];
    let currentEngine = [...this.state.searchEngine]
    let changeListener = (i: any, prop: keyof typeof currentEngine[number]) => {
      let temp = currentEngine[i];
      return (e: React.ChangeEvent<HTMLInputElement>) => {
        temp[prop] = e.target.value
        this.setState({
          searchEngine: currentEngine
        })
      }
    }
    let deleteItem=(i:number)=>{
      return()=>{
        currentEngine.splice(i,1);
        this.setState({searchEngine:currentEngine})
      }
    }
    for (let i in currentEngine) {
      nodeArray.push(
        <div style={{position:"relative"}}>
          <MyInput label={(Number(i) + 1) + ".搜索引擎名称"} value={currentEngine[i].engineName} onChange={changeListener(i, "engineName")}></MyInput>
          <MyInput label="url（以“%keyword%”作为插入关键字的标志）" value={currentEngine[i].url} onChange={changeListener(i, "url")}></MyInput>
          <svg viewBox="64 64 896 896"  style={{...iconStyle,display:currentEngine.length<=1?"none":"block"}} onClick={deleteItem(Number(i))} focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path><path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
        </div>
      )
    }
    return nodeArray;
  }
  newEngine = () => {
    let engines = [...this.state.searchEngine]
    engines.push({ url: "", engineName: "" })
    this.setState({
      searchEngine: engines
    })
  }
  selectDefaultEngine = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      defaultEngine: Number(e.target.value)
    })
  }
  optionsRender = () => {
    let optionsArray = [];
    for (let i in this.state.searchEngine) {
      optionsArray.push(<option value={i}>{this.state.searchEngine[i].engineName}</option>)
    }
    return optionsArray;
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
            <MyButton text="添加搜索引擎" onClick={this.newEngine}></MyButton>
          </div>
          <div>
            <div style={{ margin: "12px", fontSize: "1.25em" }}>
              默认搜索引擎：
              <select onChange={this.selectDefaultEngine}>
                {this.optionsRender()}
              </select>
            </div>
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
