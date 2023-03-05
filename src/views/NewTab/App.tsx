import React, { useEffect, useState } from 'react'
import { members } from '../../constants/memberList';
import Header from './Header';//头顶一行
import Content from './Content';//下面所有
import "./App.css"
import "../../themeColor.css";
import { chromeGet, chromeSet } from '../../tool/storageHandle';
import { getUpdate } from '../../background';
function App() {
  let [theme, setTheme] = useState<members>("diana")
  useEffect(() => {
    chromeGet("theme").then(res => {
      setTheme(res);
    })
  }, []);
  getUpdate().then(res => {
    if (res) {
      if (window.confirm('发现新版本\n' + res.content + '\n点击确定以跳转至更新页，点击取消以跳过该版本')) {
        window.location.href = res.url
      } else {
        console.log(res.version)
        chromeSet({ knownVersion: res.version })
      }
    }
  })
  return (
    <div className={"App " + theme}>
      <Header></Header>
      <Content></Content>
    </div>
  );
}

export default App
