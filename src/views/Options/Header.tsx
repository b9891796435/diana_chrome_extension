import React from "react"
import Avatar from "../../components/Avatar";
import LivingPost, { postProps } from "../../components/LivingPost";
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
interface headerState {
    livingMember: postProps,
}
class Header extends React.Component<{}, headerState>{
    render: () => React.ReactNode = () => {
        return (
            <div style={styles.header}>
                <img src={require("../../assets/images/Asoul.png")} alt="ASOUL" style={styles.image} />
                <Avatar link={userSpaceUrl + memberList.diana.uid} avatar={memberList.diana.avatar}></Avatar>
                <Avatar link={userSpaceUrl + memberList.ava.uid} avatar={memberList.ava.avatar}></Avatar>
                <Avatar link={userSpaceUrl + memberList.carol.uid} avatar={memberList.carol.avatar}></Avatar>
                <Avatar link={userSpaceUrl + memberList.eileen.uid} avatar={memberList.eileen.avatar}></Avatar>
                <Avatar link={userSpaceUrl + memberList.bella.uid} avatar={memberList.bella.avatar}></Avatar>
                <LivingPost member={null} link={null} post={null}></LivingPost>
            </div>
        )
    }
}
export default Header;