import React from "react";
interface avatarProp{
    link:string,
    avatar:string|undefined
}
const styles={
    avatar:{
        height:"30px",
        width:"30px",
        display:"block",
        borderRadius:"50%",
        borderWidth:"4px",
        borderStyle:"solid",
        borderColor:"rgba(255,255,255,0.3)",
        marginLeft:"16px"
    }
}
function Avatar(props:avatarProp){
    return (
        <a href={props.link}>
            <img src={props.avatar} alt="" style={styles.avatar}/>
        </a>
    )
}
export default Avatar;