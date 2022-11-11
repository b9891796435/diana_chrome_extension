export default function (url: string) {
    let urlObj = new URL(url)
    return fetch(url)
        .then(res => res.blob())
        .then(res => res.text())
        .then(res => {
            let temp = document.createElement("template");
            temp.innerHTML = res;
            let iconURL = temp.content.querySelector(`link[rel="icon"]`)?.getAttribute("href")
            if (iconURL) {
                return fetch(new URL(iconURL, urlObj.origin).href);
            } else {
                throw new Error("获取图标失败");
            }
        })
        .then(res => res.blob())
        .then(res => URL.createObjectURL(res))
        .catch(() => {
            return null
        })
}