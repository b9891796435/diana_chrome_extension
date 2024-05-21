type themePack = {
    idol: string,
    error: string,
    meme: string,
    positions: string[],
}
type member = {
    chineseName: string,
    englishName: members,
    uid: string,
    avatar: string,
    post: string,
    livingRoom: string,
    themeImg: themePack
}
export type members = "ava" | "bella" | "diana" | "eileen"
const memberList: member[] = [
    {//晚晚，要幸福哦
        chineseName: "向晚",
        englishName: 'ava',
        uid: "672346917",
        avatar: require("../assets/images/avaAvatar.webp"),
        post: require("../assets/images/avaLivingPost.webp"),
        livingRoom: "https://live.bilibili.com/22625025?broadcast_type=0&is_room_feed=1",
        themeImg: {
            idol: require("../assets/images/themePack/ava/idol.png"),
            error: require("../assets/images/themePack/ava/error.png"),
            meme: require("../assets/images/themePack/ava/meme.png"),
            positions: [require("../assets/images/themePack/ava/position0.png"), require("../assets/images/themePack/ava/position1.png")]
        }
    },
    {
        chineseName: "贝拉",
        englishName: 'bella',
        uid: "672353429",
        avatar: require("../assets/images/bellaAvatar.webp"),
        post: require("../assets/images/bellaLivingPost.webp"),
        livingRoom: "https://live.bilibili.com/22632424?broadcast_type=0&is_room_feed=1",
        themeImg: {
            idol: require("../assets/images/themePack/bella/idol.png"),
            error: require("../assets/images/themePack/bella/error.png"),
            meme: require("../assets/images/themePack/bella/meme.png"),
            positions: [require("../assets/images/themePack/bella/position0.png"), require("../assets/images/themePack/bella/position1.png")]
        }
    },
    {
        chineseName: "嘉然",
        englishName: 'diana',
        uid: "672328094",

        avatar: require("../assets/images/dianaAvatar.webp"),
        post: require("../assets/images/dianaLivingPost.webp"),
        livingRoom: "https://live.bilibili.com/22637261?broadcast_type=0&is_room_feed=1",
        themeImg: {
            idol: require("../assets/images/themePack/diana/idol.png"),
            error: require("../assets/images/themePack/diana/error.png"),
            meme: require("../assets/images/themePack/diana/meme.png"),
            positions: [require("../assets/images/themePack/diana/position0.png"), require("../assets/images/themePack/diana/position1.png")]
        }
    },
    {
        chineseName: "乃琳",
        englishName: 'eileen',
        uid: "672342685",
        avatar: require("../assets/images/eileenAvatar.webp"),
        post: require("../assets/images/eileenLivingPost.webp"),
        livingRoom: "https://live.bilibili.com/22625027?broadcast_type=0&is_room_feed=1",
        themeImg: {
            idol: require("../assets/images/themePack/eileen/idol.png"),
            error: require("../assets/images/themePack/eileen/error.png"),
            meme: require("../assets/images/themePack/eileen/meme.png"),
            positions: [require("../assets/images/themePack/eileen/position0.png"), require("../assets/images/themePack/eileen/position1.png")]
        }
    },
]
export default memberList;
export const memberMap: members[] = ['ava', 'bella', 'diana', 'eileen']
export const getMemberIndex = (memberEng: members) => {
    switch (memberEng) {
        case 'ava': return 0;
        case 'bella': return 1;
        case 'diana': return 2;
        case 'eileen': return 3;
    }
}