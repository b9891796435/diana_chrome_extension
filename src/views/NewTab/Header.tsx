import React, { useEffect, useState } from "react"
import Avatar from "../../components/Avatar";
import LivingPost from "./LivingPost";
import constants from "../../constants";
import "./Header.css"
import ShowSchedule from "./ShowSchedule";
import { chromeGet } from "../../tool/storageHandle";
import MembersDynamic from "./MembersDynamic";
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
    return (
        <div style={styles.header} className="headerForDianaExtension">
            <a href="https://space.bilibili.com/703007996">
                <img src={require("../../assets/images/Asoul.png")} alt="ASOUL" style={styles.image} />
            </a>{
                //我们是Asoul！
            }
            <Avatar link={userSpaceUrl + memberList.diana.uid} avatar={memberList.diana.avatar}></Avatar>
            <Avatar link={userSpaceUrl + memberList.ava.uid} avatar={memberList.ava.avatar}></Avatar>
            <Avatar link={userSpaceUrl + memberList.eileen.uid} avatar={memberList.eileen.avatar}></Avatar>
            <Avatar link={userSpaceUrl + memberList.bella.uid} avatar={memberList.bella.avatar}></Avatar>
            <MembersDynamic></MembersDynamic>
            <ShowSchedule></ShowSchedule>
            <div className="transitionBlock"></div>
            <LivingPost></LivingPost>
        </div>
    )
}
export default Header;