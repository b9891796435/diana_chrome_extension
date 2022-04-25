import React from "react"
import Avatar from "../../components/Avatar";
import LivingPost from "./LivingPost";
import constants from "../../constants";
const userSpaceUrl = constants.urls.userSpace;
const memberList = constants.memberList
const styles= {
    header: {
        height: "50px",
        width: "100%",
        backgroundColor: "#e799b0",
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
class Header extends React.Component{
    render: () => React.ReactNode = () => {
        return (
            <div style={styles.header}>
                <a href="https://space.bilibili.com/703007996">
                    <img src={require("../../assets/images/Asoul.png")} alt="ASOUL" style={styles.image} />
                </a>{
                    //我们是Asoul！
                }
                <Avatar link={userSpaceUrl + memberList.diana.uid} avatar={memberList.diana.avatar}></Avatar>
                <Avatar link={userSpaceUrl + memberList.ava.uid} avatar={memberList.ava.avatar}></Avatar>
                <Avatar link={userSpaceUrl + memberList.carol.uid} avatar={memberList.carol.avatar}></Avatar>
                <Avatar link={userSpaceUrl + memberList.eileen.uid} avatar={memberList.eileen.avatar}></Avatar>
                <Avatar link={userSpaceUrl + memberList.bella.uid} avatar={memberList.bella.avatar}></Avatar>
                <LivingPost></LivingPost>
            </div>
        )
    }
}
export default Header;