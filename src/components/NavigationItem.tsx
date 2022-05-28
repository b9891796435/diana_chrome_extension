import React, { useEffect, useState } from "react"
import getFavicon from "../tool/getFavicon";
import "./NavigationItem.css"
export default function (props: { url: string, summary: string }) {
    let [favicon, setFavicon] = useState<null | string>(null);
    useEffect(() => {
        try {
            getFavicon(props.url).then(res => {
                setFavicon(res)
            })
        } catch (e) {
            chrome.storage.local.get("debugMode").then(res => {
                if (res.debugMode === "true") {
                    console.log(e)
                }
            })
        }
    },[])
    return (
        <a href={props.url} className="searchBoxNavigationAnchor">
            <div className="searchBoxNavigationItem">
                <div className="searchBoxNavigationInnerIcon">
                    {
                        favicon === null ? <div>{props.summary[0]}</div> : <img src={favicon} className="searchBoxNavigationFavicon" />
                    }
                </div>
                <div className="searchBoxNavigationInnerItem">
                    {props.summary}
                </div>
            </div>
        </a>
    )
}