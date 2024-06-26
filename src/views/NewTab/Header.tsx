import React, { useEffect, useState } from "react"
import Avatar from "../../components/Avatar";
import LivingPost from "./LivingPost";
import constants from "../../constants";
import "./Header.css"
import ShowSchedule from "./ShowSchedule";
import { chromeGet } from "../../tool/storageHandle";
import MembersDynamic from "./MembersDynamic";
import { judgeSecondMember, members } from "../../constants/memberList";
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
    let [showSecondMember, setShowSecondMember] = useState(true);
    const avatarList = () => {
        let res = [];
        chromeGet('showSecondMember').then(res => setShowSecondMember(res))
        for (let i of memberList) {
            if (!showSecondMember&&judgeSecondMember(i.englishName)) {
                continue
            }
            res.push(<Avatar link={userSpaceUrl + i.uid} avatar={i.avatar}></Avatar>)
        }
        return res
    }
    return (
        <div style={styles.header} className="headerForDianaExtension">
            <a href="https://space.bilibili.com/703007996">
                <img src={require("../../assets/images/Asoul.png")} alt="ASOUL" style={styles.image} />
            </a>{
                //我们是Asoul！
            }
            {avatarList()}
            <MembersDynamic></MembersDynamic>
            <ShowSchedule></ShowSchedule>
            <div className="transitionBlock"></div>
            <LivingPost></LivingPost>
        </div>
    )
}
export default Header;