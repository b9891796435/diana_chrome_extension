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
    useEffect(() => {
        chromeGet("dynamicAvatar").then(async res => {
            if (res) {
                let temp = Object.assign({}, avatar)
                for (let i in avatar) {
                    temp[i as members] = (await (await fetch(`https://api.bilibili.com/x/space/wbi/acc/info?mid=${memberList[i as members].uid}&platform=web`)).json()).data.face;
                    console.log(temp)
                }
                setAvatar(temp)
            }
        })
    }, [])
    const [avatar, setAvatar] = useState<{ [index in members]: string }>({
        ava: memberList.ava.avatar,
        bella: memberList.bella.avatar,
        diana: memberList.diana.avatar,
        eileen: memberList.eileen.avatar
    });
    return (
        <div style={styles.header} className="headerForDianaExtension">
            <a href="https://space.bilibili.com/703007996">
                <img src={require("../../assets/images/Asoul.png")} alt="ASOUL" style={styles.image} />
            </a>{
                //我们是Asoul！
            }
            <Avatar link={userSpaceUrl + memberList.diana.uid} avatar={avatar.diana}></Avatar>
            <Avatar link={userSpaceUrl + memberList.ava.uid} avatar={avatar.ava}></Avatar>
            <Avatar link={userSpaceUrl + memberList.eileen.uid} avatar={avatar.eileen}></Avatar>
            <Avatar link={userSpaceUrl + memberList.bella.uid} avatar={avatar.bella}></Avatar>
            <MembersDynamic></MembersDynamic>
            <ShowSchedule></ShowSchedule>
            <div className="transitionBlock"></div>
            <LivingPost></LivingPost>
        </div>
    )
}
export default Header;