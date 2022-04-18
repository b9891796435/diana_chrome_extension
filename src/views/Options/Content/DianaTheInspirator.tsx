import React,{useState} from "react";
import quotes from "../../../constants/dianaInsprite"
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
const poseArray=[require("../../../assets/images/background/diana_1.png"),require("../../../assets/images/background/diana_2.png")]
class DianaTheInspirator extends React.Component<{},{pose:number}>{
    constructor(props:any){
        super(props);
        this.state={
            pose:0,
        }
        setInterval(()=>{
            this.setState({pose:this.state.pose?0:1});
        },2500);
    }
    render(): React.ReactNode {
        return (
            <div style={styles.container}>
                <img src={require("../../../assets/images/background/flower_pot.png")} alt="" style={styles.pot} />
                <img src={poseArray[this.state.pose]} alt="" style={Object.assign({}, styles.pot, styles.diana)} />
            </div>
        )
    }
}
export default DianaTheInspirator;