import React from "react";
import MyButton from "../../components/MyButton";
import MyInput from "../../components/MyInput";
type ArrayRenderProps = {
    data: string[],
    newItem: Function,
    deleteItem:Function,
    label: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void
}
const iconStyle:React.CSSProperties={
    position: "absolute",
    width: "20px",
    bottom: "4px",
    right: "-20px",
    height: "20px",
    cursor:"pointer"
}
export default (props: ArrayRenderProps) => {
    let nodeArray = []
    for (let i = 0; i < props.data.length; i++) {
        nodeArray.push(
            <div key={i} style={{position:'relative'}}>
                <MyInput label={i === 0 ? props.label : ""} value={props.data[i]}  onChange={e => props.onChange(e, i)} />
                <svg viewBox="64 64 896 896"  style={{...iconStyle,display:props.data.length==1?"none":"block"}} onClick={()=>{props.deleteItem(i)}} focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path><path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
            </div>
        )
    }
    nodeArray.push(<MyButton text="添加条目" onClick={()=>props.newItem()}></MyButton>)
    return <div >{nodeArray}</div>
}