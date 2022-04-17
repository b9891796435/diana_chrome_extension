import React from "react";
const styles = {
    container:{
        position:"absolute" as "absolute",
        top:"50px",
        left:"0",
        width:"100%",
        height:"calc(100% - 50px)",
        zIndex:"-1"
    },
    background: {
        position: "absolute" as "absolute",
        height: "100%",
        width: "100%",
        top: "0",
        left: "0",
    },

    grider:{
        width:"80px",
        height:"100%",
        top:"0",
        left:"calc(50% - 40px)"
    }
}
const skys = [require("../../../assets/images/background/sky_day.jpg"), require("../../../assets/images/background/sky_night.png")]
class BackgroundSky extends React.Component{
    render(): React.ReactNode {
        let hNow = Number(Date().split(" ")[4].split(":")[0])
        let skySub=hNow<=6||hNow>=19?1:0
        return (
            <div style={styles.container}>
                <img src={skys[skySub]} alt="" style={styles.background}/>
                <img src={require("../../../assets/images/background/window_2.png")} alt="" style={Object.assign({},styles.background,{zIndex:2})}/>
                <img src={require("../../../assets/images/background/grider.png")} alt="" style={Object.assign({},styles.background,styles.grider)}/>
           </div>
        )
    }
}
export default BackgroundSky;