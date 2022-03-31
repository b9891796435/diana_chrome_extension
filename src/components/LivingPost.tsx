import React from "react";
export type postProps ={
    member: string | null,
    link: string | null,
    post: string | null
}
const styles: any = {
    livingPostDiv: {
        position: "relative",
        marginLeft: "auto",
        alignSelf: "start",
        display: "flex",
        padding: "0 30px"
    },
    livingNotice: {
        borderRadius: "5px",
        fontSize: "16px",
        display: "block",
        backgroundColor: "rgba(255,255,255,0.45)",
        boxShadow: "0px 0px 10px 1px rgb(255 255 255 / 30%)",
        padding: "8px",
        margin: "auto",
        zIndex: "2",
        fontWeight: "600",
        marginTop: "8px",

    },
    livingPost: {
        height: "50px",
        width: "100%",
        position: "absolute",
        top: "0",
        right: "0",
        zIndex: "1"
    }
}
export default function LivingPost(props: postProps) {
    // if (props.member == null || props.link == null || props.post == null) {//麻了，掘金插件可以跨域是因为人家有接口专门接插件，可b站没有啊
        return (
            <div style={styles.livingPostDiv}>
                <span style={styles.livingNotice}>A-SOUL时代，沸腾期待！</span>
                <img src={require("../assets/images/AsoulPost.webp")} alt="" style={styles.livingPost} />
            </div>
        )
    // }
    // return (
    //     <div style={styles.livingPostDiv}>
    //         <a href={props.link}>
    //             <span style={styles.livingNotice}>{props.member}正在直播~点击进入直播间</span>
    //             <img src={props.post} alt="" style={styles.livingPost} />
    //         </a>
    //     </div>
    // )
}