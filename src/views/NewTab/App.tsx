import React, { useEffect, useState } from 'react'
import { members } from '../../constants/memberList';
import Header from './Header';//头顶一行
import Content from './Content';//下面所有
import "./App.css"
import "../../themeColor.css";
import { chromeGet } from '../../tool/storageHandle';
function App() {
  let [theme,setTheme]=useState<members>("diana")
  useEffect(()=>{
    chromeGet("theme").then(res=>{
      setTheme(res);
    })
  },[])
  return (
    <div className={"App "+theme}>
      <Header></Header>
      <Content></Content>
    </div>
  );
}

export default App
