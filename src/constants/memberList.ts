type member={
    chineseName:string
    uid:string,
    avatar:string,
    post:string,
    livingRoom:string,
}
export type members="ava"|"bella"|"carol"|"diana"|"eileen"
type list = {
    [index in members]: member
}
const memberList:list={
    diana:{
        chineseName:"嘉然",
        uid:"672328094",
        avatar:require("../assets/images/dianaAvatar.webp"),
        post:require("../assets/images/dianaLivingPost.webp"),
        livingRoom:"https://live.bilibili.com/22637261?broadcast_type=0&is_room_feed=1"
    },
    ava:{
        chineseName:"向晚",
        uid:"672346917",
        avatar:require("../assets/images/avaAvatar.webp"),
        post:require("../assets/images/avaLivingPost.webp"),
        livingRoom:"https://live.bilibili.com/22625025?broadcast_type=0&is_room_feed=1"
    },
    carol:{
        chineseName:"珈乐",
        uid:"351609538",
        avatar:require("../assets/images/carolAvatar.webp"),
        post:require("../assets/images/carolLivingPost.webp"),
        livingRoom:"https://live.bilibili.com/22634198?broadcast_type=0&is_room_feed=1"
    },
    eileen:{
        chineseName:"乃琳",
        uid:"672342685",
        avatar:require("../assets/images/eileenAvatar.webp"),
        post:require("../assets/images/eileenLivingPost.webp"),
        livingRoom:"https://live.bilibili.com/22625027?broadcast_type=0&is_room_feed=1"
    },
    bella:{
        chineseName:"贝拉",
        uid:"672353429",
        avatar:require("../assets/images/bellaAvatar.webp"),
        post:require("../assets/images/bellaLivingPost.webp"),
        livingRoom:"https://live.bilibili.com/22632424?broadcast_type=0&is_room_feed=1"
    },
}
export default memberList;