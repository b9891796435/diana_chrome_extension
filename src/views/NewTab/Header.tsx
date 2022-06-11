import React, { useEffect, useState } from "react"
import Avatar from "../../components/Avatar";
import LivingPost from "./LivingPost";
import constants from "../../constants";
import "./Header.css"
import ShowSchedule from "./ShowSchedule";
import { chromeGet } from "../../tool/storageHandle";
const userSpaceUrl = constants.urls.userSpace;
const memberList = constants.memberList
const styles = {
    header: {
        height: "50px",
        width: "100%",
        backgroundColor: "rgb(var(--fan))",
        display: "flex",
        alignItems: "center",
    },
    image: {
        height: "40px",
        display: "block",
        justifySelf: "start",
        marginLeft: "10px"
    },
}
function Header() {
    const [hideCarol, setHideCarol] = useState<boolean>(true);
    useEffect(() => {
        chromeGet("hideCarol").then(res => {
            setHideCarol(res);
        })
    }, [])
    const carolAvatar = () => {
        if (!hideCarol) {
            return (
                <Avatar link={userSpaceUrl + memberList.carol.uid} avatar={memberList.carol.avatar}></Avatar>
            )
        }else{
            return null;
        }
    }
    return (
        <div style={styles.header} className="headerForDianaExtension">
            <a href="https://space.bilibili.com/703007996">
                <img src={require("../../assets/images/Asoul.png")} alt="ASOUL" style={styles.image} />
            </a>{
                //我们是Asoul！
            }
            <Avatar link={userSpaceUrl + memberList.diana.uid} avatar={memberList.diana.avatar}></Avatar>
            <Avatar link={userSpaceUrl + memberList.ava.uid} avatar={memberList.ava.avatar}></Avatar>
            {carolAvatar()}
            <Avatar link={userSpaceUrl + memberList.eileen.uid} avatar={memberList.eileen.avatar}></Avatar>
            <Avatar link={userSpaceUrl + memberList.bella.uid} avatar={memberList.bella.avatar}></Avatar>
            <ShowSchedule></ShowSchedule>
            <div className="transitionBlock"></div>
            <LivingPost></LivingPost>
        </div>
    )
}
export default Header;