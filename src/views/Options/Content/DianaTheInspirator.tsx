import React,{useState} from "react";
const styles = {
    pot: {
        position: "fixed" as "fixed",
        bottom: "0",
        left: "0",
        height: "calc(100% - 50px)",
        zIndex: 3
    },
    diana: {
        height: "calc(54% - 27px)",//(100% - 50px) * ( 588 / 1080 )，这个比例是然比图与花盆图高之比。
        zIndex: 4,
    },
    container:{
        position:"absolute" as "absolute",
        top:"50px",
        left:"0",
        width:"100%",
        height:"calc(100% - 50px)",
        zIndex:"-1"
    },
}
function DianaTheInspirator() {
    const [pose,setPose]=useState(0);
    const poseArray=[require("../../../assets/images/background/diana_1.png"),require("../../../assets/images/background/diana_2.png")]
    setTimeout(()=>{//什么？你问我为什么不用settimeinterval？因为用那个然比会开摇。state钩子在变动时会重新计算该函数
        setPose(pose?0:1);
    },3000)
    return (
        <div style={styles.container}>
            <img src={require("../../../assets/images/background/flower_pot.png")} alt="" style={styles.pot} />
            <img src={poseArray[pose]} alt="" style={Object.assign({}, styles.pot, styles.diana)} />
        </div>
    )
}
export default DianaTheInspirator;