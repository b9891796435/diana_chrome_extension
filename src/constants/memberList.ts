type member={
    uid:string,
    avatar:string,
    post:string,
}
type list={
    [index:string]:member
}
const memberList:list={
    diana:{
        uid:"672328094",
        avatar:require("../assets/images/dianaAvatar.webp"),
        post:require("../assets/images/dianaLivingPost.webp"),
    },
    ava:{
        uid:"672346917",
        avatar:require("../assets/images/avaAvatar.webp"),
        post:require("../assets/images/avaLivingPost.webp")
    },
    carol:{
        uid:"351609538",
        avatar:require("../assets/images/carolAvatar.webp"),
        post:require("../assets/images/carolLivingPost.webp")
    },
    eileen:{
        uid:"672342685",
        avatar:require("../assets/images/eileenAvatar.webp"),
        post:require("../assets/images/eileenLivingPost.webp")
    },
    bella:{
        uid:"672353429",
        avatar:require("../assets/images/bellaAvatar.webp"),
        post:require("../assets/images/bellaLivingPost.webp")
    },
}
export default memberList;