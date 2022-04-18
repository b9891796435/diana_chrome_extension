import React from 'react'
import Header from './Header';//头顶一行
import Content from './Content';//下面所有
import "./App.css"
function App() {
  return (
    <div className="App">
      <Header></Header>
      <Content></Content>
    </div>
  );
}

export default App
