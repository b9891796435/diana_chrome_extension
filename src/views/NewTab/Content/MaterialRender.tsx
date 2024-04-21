// import { useState } from "react"
// import { material } from "../../../tool/storageHandle"
// export default (props: { data: material, poke: () => void }) => {
//     const [imgTimer, setImgTimer] = useState(0);
//     let start: DOMHighResTimeStamp;
//     let RAFfunc = (timestamp: DOMHighResTimeStamp) => {
//         if (start === undefined) {
//             start = timestamp;
//         }
//         const elapsed = timestamp - start;
//         setImgTimer(Math.floor(elapsed / 1000 * props.data.fps));
//         requestAnimationFrame(RAFfunc);
//     }
//     requestAnimationFrame(RAFfunc);
//     let style = 'css' in props.data ? props.data.css : {
//         position: 'fixed' as 'fixed',
//         ...props.data.position,
//         ...props.data.size,
//         zIndex: props.data.zIndex,
//     }
//     return (<img src={props.data.src[imgTimer % props.data.src.length]} style={style} onClick={() => { if (props.data.isInspirator && props.poke) props.poke() }}>
//     </img>)
// }
export {}