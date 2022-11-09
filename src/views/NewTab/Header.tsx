import React, { useEffect, useState } from "react"
import Avatar from "../../components/Avatar";
import constants from "../../constants";
import "./Header.css"
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
        } else {
            return null;
        }
    }
    return (
        <div style={styles.header} className="headerForDianaExtension">{
            //希望你没有像某只-/一样拉黑四位姑娘捏
        }
            {carolAvatar()}
        </div>
    )
}
export default Header;