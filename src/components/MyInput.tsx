import React from 'react'
import "./MyInput.css"
const checkboxStyle: React.CSSProperties = {
    width: "20px",
    height: "20px",
    margin: "0",
    verticalAlign: "bottom",
}
export default (props: { label?: string, value: string | boolean, onChange: React.ChangeEventHandler<HTMLInputElement> }) => {
    let inputEle = typeof (props.value) == 'boolean' ? (
        <input type="checkbox" className='myCheckBoxForDiana' {...{ checked: props.value }} onChange={props.onChange} />
    ) : (
        <input type="text" className='myInputForDiana' value={props.value} onChange={props.onChange} />
    )
    return (
        <div className='myInputForDianaContainer'>
            <span style={props.label ? {} : { display: "none" }}>{props.label}</span>
            {inputEle}
        </div>
    )
}