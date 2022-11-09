type themePack={
    idol:string,
    error:string,
    meme:string,
    positions:string[],
}
type member={
    chineseName:string
    uid:string,
    avatar:string,
    post:string,
    livingRoom:string,
    themeImg:themePack
}
export type members="carol"
type list = {
    [index in members]: member
}
const memberList:list={
    carol:{
        chineseName:"珈乐",
        uid:"351609538",
        avatar:require("../assets/images/carolAvatar.webp"),
        post:require("../assets/images/carolLivingPost.webp"),
        livingRoom:"https://live.bilibili.com/22634198?broadcast_type=0&is_room_feed=1",
        themeImg:{
            idol:require("../assets/images/themePack/carol/idol.png"),
            error:require("../assets/images/themePack/carol/error.png"),
            meme:require("../assets/images/themePack/carol/meme.png"),
            positions:[require("../assets/images/themePack/carol/position0.png")]
        }
    },
}
export default memberList;