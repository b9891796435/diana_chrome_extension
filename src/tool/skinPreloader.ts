import { skin } from "./storageHandle"

export default (skin: skin, width: number, height: number): skin => {
    let temp: { name: string, src: string[] }[] = [];
    for (let i of skin.materials) {//src可能存在base64格式图片，假如塞进正则匹配里的话...想想都离谱
        temp.push({ name: i.name, src: i.src });
        i.src = [];
    }
    skin = JSON.parse(JSON.stringify(skin).replace(/%height%/g, String(height)).replace(/%width%/g, String(width)))
    for (let i of skin.materials) {
        let res = temp.find(item => item.name = i.name)?.src;
        if (res) i.src = res;
    }
    return skin;
}