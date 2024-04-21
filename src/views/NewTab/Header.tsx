import React, { useEffect, useState } from "react"
import Avatar from "../../components/Avatar";
import LivingPost from "./LivingPost";
import constants from "../../constants";
import "./Header.css"
import ShowSchedule from "./ShowSchedule";
import { chromeGet } from "../../tool/storageHandle";
import MembersDynamic from "./MembersDynamic";
import { members } from "../../constants/memberList";
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
    const avatarList = () => {
        let res = [];
        for (let i in memberList) {
            res.push(<Avatar link={userSpaceUrl + memberList[i as members].uid} avatar={memberList[i as members].avatar}></Avatar>)
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
            <Avatar link={'https://space.bilibili.com/3537115310721781'} avatar={require('../../assets/images/GladysAvatar.jpg')}></Avatar>
            <Avatar link={'https://space.bilibili.com/3537115310721181'} avatar={require('../../assets/images/FionaAvatar.jpg')}></Avatar>
            <MembersDynamic></MembersDynamic>
            <ShowSchedule></ShowSchedule>
            <div className="transitionBlock"></div>
            <LivingPost></LivingPost>
        </div>
    )
}
export default Header;