import React from "react";
import "./YinTun.css"
const styles={
    yinTun:{
        height:"64px",
        width:"64px"
    }
}
function YinTun(){
    return (
        <div className="YinTun">
            <img src={require("../../../assets/images/YinTun.png")} alt="" style={styles.yinTun}/>
        </div>
    )
}
export default YinTun;