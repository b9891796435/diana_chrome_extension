import React from "react";
import SearchBox from "./SearchBox";//负责了上方搜索框
import BackgroundSky from"./BackgroundSky"//负责背景以及天空换色
import DianaTheInspirator from "./DianaTheInspirator";//负责然比以及她的舞台
import YinTun from "./YinTun";//负责阿草的银屯以及他的工具箱
const styles={
    
}
class Content extends React.Component{
    render(): React.ReactNode {
        return(
            <div>
                <SearchBox></SearchBox>
                <BackgroundSky></BackgroundSky>
                <DianaTheInspirator></DianaTheInspirator>
                <YinTun></YinTun>
            </div>
        )
    }
} 
export default Content;