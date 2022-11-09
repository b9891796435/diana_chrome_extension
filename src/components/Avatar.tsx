import React from "react";
interface avatarProp{
    link:string,
    avatar:string|undefined,
    size?:string
}
const styles={
    avatar:{
        display:"block",
        borderRadius:"50%",
        borderWidth:"4px",
        borderStyle:"solid",
        borderColor:"rgba(255,255,255,0.3)",
        marginLeft:'32px'
    }
}
function Avatar(props:avatarProp){
    return (
        <a href={props.link}>
            <img src={props.avatar} alt="" style={Object.assign({},styles.avatar,{width:props.size?props.size:"30px",height:props.size?props.size:"30px"})}/>
        </a>
    )
}
export default Avatar;