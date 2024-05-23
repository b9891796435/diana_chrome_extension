import React, { ReactEventHandler } from 'react'
import MyMessage from '../../components/MyMessage';
import MyInput from '../../components/MyInput';
import MyButton from '../../components/MyButton';
import ArrayRender from './ArrayRender';
import quotes, { quote } from '../../constants/storagePrototype/quotes';
import PopupBox from '../../components/PopupBox';
import { memberMap } from '../../constants/memberList';
import { chromeGet, chromeSet, searchEngineType } from '../../tool/storageHandle';
import { resetStorage } from "../../tool/fixStorage"
import memberList from '../../constants/memberList';
import "./App.css"
import "../../themeColor.css"
type settingsState = {
  theme: number,
  quotes: quote[],
  curr_quote: number,//注意这里的curr_quote并非存储中的curr，只是临时用于存储当前状态的变量。请在保存时存储对应的语录对象而非一个数字。
  currName: string,
  renameVisible: boolean;
  noticeTime: string,
  shouldShowNotice: boolean,
  fetchLive: boolean,
  infoMessage: string,
  isError: boolean,
  defaultEngine: number,
  searchEngine: searchEngineType,
  showTopsite: boolean,
  showLiveBadge: boolean,
  showDynamicBadge: boolean,
  showNavigation: boolean,
  dynamicPages: string,
  selectedSkin: number
}
type quotesArrayName = "daily" | "notice"
type quotesSingleName = "morning" | "noon" | "evening" | "night"
type quotesSingleHandlerGenerator = {
  (arg0: quotesSingleName): React.ChangeEventHandler<HTMLInputElement>
}
type handleType = "new" | "delete" | "change"
const iconStyle: React.CSSProperties = {
  position: "absolute",
  width: "20px",
  bottom: "4px",
  right: "-20px",
  height: "20px",
  cursor: "pointer"
}
const errorQuote = [{//啧，希望这个永远都不会被展示吧
  name: "数据损坏",
  daily: ["数据损坏"],
  morning: "数据损坏",
  noon: "数据损坏",
  evening: "数据损坏",
  night: "数据损坏",
  notice: ["数据损坏"],
}]
const settingErrors = {
  dailyEmpty: "日常条目中至少请保留一条数据",
  noticeEmpty: "久坐提醒条目中至少请保留一条数据",
  noticeTimeNAN: "请在久坐提醒间隔时间中输入正确的数字",
  engineNotSafe: "搜索引擎url只接受以https://开头的网址",
  engineNameEmpty: "搜索引擎名称不能为空"
}
enum SELECT_TYPE {
  THEME = 0,
  QUOTE,
  SKIN
}
class App extends React.Component<{}, settingsState> {//呜呜呜表单好可怕我要回Vue
  constructor(props: any) {
    super(props);
    this.state = {
      selectedSkin: 3,
      theme: 3,
      quotes: errorQuote,
      curr_quote: 0,
      noticeTime: "",
      currName: '',
      renameVisible: false,
      dynamicPages: '',
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
      ],
      showNavigation: true,
      showTopsite: false,
      showLiveBadge: false,
      showDynamicBadge: false
    }
  }
  async componentDidMount() {
    let currTheme = await chromeGet("theme");
    this.setState({
      selectedSkin: await chromeGet("selectedSkin"),
      quotes: await chromeGet("quotes"),
      noticeTime: (await chromeGet("noticeTime")).toString(),
      dynamicPages: (await chromeGet("dynamicPages")).toString(),
      shouldShowNotice: await chromeGet("shouldShowNotice"),
      fetchLive: await chromeGet("fetchLive"),
      defaultEngine: await chromeGet("defaultEngine"),
      searchEngine: await chromeGet("searchEngine"),
      theme: memberMap.findIndex(i => i == currTheme),
      showNavigation: await chromeGet("showNavigation"),
      showTopsite: await chromeGet("showTopsite"),
      showLiveBadge: await chromeGet("showLiveBadge"),
      showDynamicBadge: await chromeGet("showDynamicBadge"),
    })
    let currQuoteObj = await chromeGet('curr_quote');
    let quoteIdx = this.state.quotes.findIndex(i => i.name == currQuoteObj.name)
    this.setState({
      curr_quote: quoteIdx
    })
  }
  placeholder = () => {
    console.log('开发中')
  }
  handleRenameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ currName: e.target.value })
  }
  confirmRename = () => {
    let temp = [...this.state.quotes]
    temp[this.state.curr_quote].name = this.getCopyName(this.state.currName);
    this.setState({
      quotes: temp
    })
  }
  getCopyName = (copyName: string) => {
    let currCopyName = copyName, currIdx = 1;
    if (this.state.quotes.findIndex(i => i.name == copyName) == -1) return copyName;//扩展用于更名时检测重名
    if (this.state.quotes.findIndex(i => i.name == (currCopyName + ' ' + currIdx)) == -1) return currCopyName + ' ' + currIdx;
    while (this.state.quotes.findIndex(i => i.name == (currCopyName + ' ' + currIdx)) != -1) {
      currIdx += 1
    }
    return currCopyName + ' ' + currIdx
  }
  copyQuote = (quoteIdx: number) => {
    let temp = [...this.state.quotes]
    let newQuote = JSON.parse(JSON.stringify(this.state.quotes[quoteIdx]))
    newQuote.name = this.getCopyName(newQuote.name)
    temp.push(newQuote)
    this.setState({
      quotes: temp
    })
  }
  deleteQuote = (quoteIdx: number) => {
    let temp = [...this.state.quotes]
    if (temp.length == 1) {
      alert('请至少保留一组对话文本');
      return;
    }
    temp.splice(quoteIdx, 1);
    console.log(temp,this.state)
    this.setState({
      curr_quote: this.state.curr_quote == 0 ? 0 : this.state.curr_quote - 1,
      quotes: temp,
    })
  }
  renameQuote = (quoteIdx: number, newName: string) => {
    let temp = [...this.state.quotes]
    temp[quoteIdx].name = this.getCopyName(newName)
    this.setState({
      quotes: temp
    })
  }
  handleDialogForArray = (attr: quotesArrayName, handleType: handleType) => {//处理数组中的
    let temp = this.state.quotes;
    switch (handleType) {
      case "new": {
        return () => {
          temp[this.state.curr_quote][attr] = temp[this.state.curr_quote][attr].concat([""]);
          this.setState({ quotes: temp });
        }
      }
      case "delete": {
        return (i: number) => {
          temp[this.state.curr_quote][attr] = temp[this.state.curr_quote][attr].slice(0, i).concat(temp[this.state.curr_quote][attr].slice(i + 1, temp[this.state.curr_quote][attr].length));
          this.setState({ quotes: temp });
        }
      }
      case "change": {
        return (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
          temp[this.state.curr_quote][attr][i] = e.target.value;
          this.setState({ quotes: temp });
        }
      }
    }
  }
  handleDialogForSingle: quotesSingleHandlerGenerator = quoteType => {//写完发现这函数名好大只哦
    return e => {
      let temp = { ...this.state.quotes };
      temp[this.state.curr_quote][quoteType] = e.target.value;
      this.setState({ quotes: temp })
    }
  }
  saveSetting = () => {
    if (this.state.quotes[this.state.curr_quote].daily.length === 0) {
      this.setState({ infoMessage: settingErrors.dailyEmpty, isError: true });
      return;
    }
    if (this.state.quotes[this.state.curr_quote].notice.length === 0) {
      this.setState({ infoMessage: settingErrors.noticeEmpty, isError: true });
      return;
    }
    if (Number.isNaN(Number(this.state.noticeTime))) {
      this.setState({ infoMessage: settingErrors.noticeTimeNAN, isError: true });
      return;
    }
    for (let i of this.state.searchEngine) {
      if (!RegExp("https://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]").test(i.url)) {
        this.setState({ infoMessage: settingErrors.engineNotSafe, isError: true });
      }
      if (i.engineName === "") {
        this.setState({ infoMessage: settingErrors.engineNameEmpty, isError: true })
      }
    }
    this.setState({ infoMessage: "保存成功", isError: false });
    console.log(this.state)
    chromeSet({
      quotes: this.state.quotes,
      noticeTime: Number(this.state.noticeTime),
      dynamicPages: Number(this.state.dynamicPages),
      shouldShowNotice: this.state.shouldShowNotice,
      fetchLive: this.state.fetchLive,
      defaultEngine: this.state.defaultEngine,
      searchEngine: this.state.searchEngine,
      theme: memberMap[this.state.theme],
      selectedSkin: this.state.selectedSkin,
      curr_quote: this.state.quotes[this.state.curr_quote],
      showNavigation: this.state.showNavigation,
      showTopsite: this.state.showTopsite,
      showLiveBadge: this.state.showLiveBadge,
      showDynamicBadge: this.state.showDynamicBadge
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
    let deleteItem = (i: number) => {
      return () => {
        currentEngine.splice(i, 1);
        this.setState({ searchEngine: currentEngine })
      }
    }
    for (let i in currentEngine) {
      nodeArray.push(
        <div style={{ position: "relative" }}>
          <MyInput label={(Number(i) + 1) + ".搜索引擎名称"} value={currentEngine[i].engineName} onChange={changeListener(i, "engineName")}></MyInput>
          <MyInput label="url（以“%keyword%”作为插入关键字的标志）" value={currentEngine[i].url} onChange={changeListener(i, "url")}></MyInput>
          <svg viewBox="64 64 896 896" style={{ ...iconStyle, display: currentEngine.length <= 1 ? "none" : "block" }} onClick={deleteItem(Number(i))} focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path><path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
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
      if (Number(i) == this.state.defaultEngine)
        optionsArray.push(<option value={i} selected>{this.state.searchEngine[i].engineName}</option>)
      else
        optionsArray.push(<option value={i}>{this.state.searchEngine[i].engineName}</option>)
    }
    return optionsArray;
  }
  selectOption = (type: SELECT_TYPE) => {//先想了想我该怎么把这个Type作为参数放到事件处理函数里，再一想我直接一个闭包上去不就解决了（
    return (e: React.ChangeEvent<HTMLSelectElement>) => {
      switch (type) {
        case SELECT_TYPE.THEME:
          this.setState({
            theme: Number(e.target.value)
          });
          break;
        case SELECT_TYPE.QUOTE:
          this.setState({
            curr_quote: Number(e.target.value)
          });
          break;
        case SELECT_TYPE.SKIN:
          this.setState({
            //TODO 修改当前皮肤
            selectedSkin: Number(e.target.value)
          });
          break;
      }
    }
  }
  optionsThemeRender = (options: any[], indexState: number, getter = (item: any) => item) => {
    let optionsArray = [];
    /**
     * options为需要渲染的选项数组
     * indexState为当前选中的index的state
     * getter为如何从options中获取到需要渲染的字符串，默认为直接获取，也可传入getter
     * 选项对应的
     */
    for (let i = 0; i < options.length; i++) {
      if (i == indexState) {
        optionsArray.push(<option value={i} selected>{getter(options[i])}</option>)
      } else {
        optionsArray.push(<option value={i}>{getter(options[i])}</option>)
      }
    }
    return optionsArray;
  }
  render(): React.ReactNode {

    return (
      <div className={"App " + memberMap[this.state.theme]}>
        <div className="settingContainerForDiana">
          <h1>设置好之后要到页面最下方保存哦</h1>
          <section className='combineBox'>
            <div>
              <h1>当前主题（设置界面色系）</h1>
              <select onChange={this.selectOption(SELECT_TYPE.THEME)}>
                {this.optionsThemeRender(memberList, this.state.theme, i => i.chineseName)}
              </select>
            </div>
            <div>
              <h1>当前对话文本</h1>
              <select onChange={this.selectOption(SELECT_TYPE.QUOTE)}>
                {this.optionsThemeRender(this.state.quotes, this.state.curr_quote, i => i.name)}
              </select>
            </div>
            <div>
              <h1>当前主页皮肤</h1>
              <select onChange={this.selectOption(SELECT_TYPE.SKIN)}>
                {this.optionsThemeRender(memberList, this.state.selectedSkin, i => i.chineseName)}
              </select>
            </div>
          </section>
          <h1>对话文本设置</h1>
          <div>
            <PopupBox header={<div>更名</div>} visible={this.state.renameVisible}>
              <MyInput label='新名称' value={this.state.currName} onChange={this.handleRenameInput}></MyInput>
              <MyButton text='确认更名' onClick={() => { this.setState({ renameVisible: !this.state.renameVisible }); this.confirmRename() }}></MyButton>
            </PopupBox>
            <MyButton text='为本套文本更名' onClick={() => this.setState({ renameVisible: !this.state.renameVisible })}></MyButton>
            <MyButton text='复制本套文本' onClick={() => this.copyQuote(this.state.curr_quote)}></MyButton>
            <MyButton text='删除本套文本' onClick={() => this.deleteQuote(this.state.curr_quote)}></MyButton>
          </div>
          <ArrayRender
            data={this.state.quotes[this.state.curr_quote].daily}
            label="日常" newItem={this.handleDialogForArray("daily", "new")}
            deleteItem={this.handleDialogForArray("daily", "delete")}
            onChange={this.handleDialogForArray("daily", "change") as (e: React.ChangeEvent<HTMLInputElement>, i: number) => void}
          />
          <MyInput label='早间' value={this.state.quotes[this.state.curr_quote].morning} onChange={this.handleDialogForSingle("morning")} />
          <MyInput label='午间' value={this.state.quotes[this.state.curr_quote].noon} onChange={this.handleDialogForSingle("noon")} />
          <MyInput label='晚间' value={this.state.quotes[this.state.curr_quote].evening} onChange={this.handleDialogForSingle("evening")} />
          <MyInput label='深夜' value={this.state.quotes[this.state.curr_quote].night} onChange={this.handleDialogForSingle("night")} />
          <ArrayRender
            data={this.state.quotes[this.state.curr_quote].notice}
            label="久坐提醒" newItem={this.handleDialogForArray("notice", "new")}
            deleteItem={this.handleDialogForArray("notice", "delete")}
            onChange={this.handleDialogForArray("notice", "change") as (e: React.ChangeEvent<HTMLInputElement>, i: number) => void}
          />
          <h1>搜索引擎设置</h1>
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
          <MyInput label="成员朋友圈抓取页数（每页12条，设置过高会导致无法使用b站api）" value={this.state.dynamicPages} onChange={e => this.setState({ dynamicPages: e.target.value })}></MyInput>
          <MyInput label='是否开启跨页久坐提醒:' value={this.state.shouldShowNotice} onChange={() => this.setState({ shouldShowNotice: !this.state.shouldShowNotice })}></MyInput>
          <MyInput label='是否开启直播间状态检测:' value={this.state.fetchLive} onChange={() => this.setState({ fetchLive: !this.state.fetchLive })}></MyInput>
          <MyInput label='是否显示快捷导航:' value={this.state.showNavigation} onChange={() => this.setState({ showNavigation: !this.state.showNavigation })}></MyInput>
          <MyInput label='是否显示常用网页:' value={this.state.showTopsite} onChange={() => this.setState({ showTopsite: !this.state.showTopsite })}></MyInput>
          <MyInput label='是否显示动态更新红点:' value={this.state.showDynamicBadge} onChange={() => this.setState({ showDynamicBadge: !this.state.showDynamicBadge })}></MyInput>
          <MyInput label='是否显示直播红点:' value={this.state.showLiveBadge} onChange={() => this.setState({ showLiveBadge: !this.state.showLiveBadge })}></MyInput>
          <div>
            <MyMessage text={this.state.infoMessage} style={{ display: this.state.infoMessage ? "block" : "none", backgroundColor: this.state.isError ? "#ff4d4f" : "#52c41a" }}></MyMessage>
          </div>
          <div style={{ display: "flex" }}>
            <MyButton text={"保存"} onClick={this.saveSetting} />
            <MyButton text={"重置设置"} onClick={() => { if (window.confirm("即将重置插件设置（包括自定义的对话及工具箱内的快捷导航），是否确认？")) if (window.confirm("您即将重置插件设置（包括自定义的对话及工具箱内的快捷导航），该操作无法撤销！该操作无法撤销！该操作无法撤销！是否确认？")) resetStorage() }} />
          </div>
        </div>
      </div>
    );
  }
}

export default App
