import React from "react";
import "./MyMessage.css";
export default (props:{text:string,style:React.CSSProperties})=>{
    return(
        <div style={props.style} className="myMessageForDiana">{props.text}</div>
    )
}