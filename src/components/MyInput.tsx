import React from 'react'
import "./MyInput.css"
export default (props:{label:string,value:string,onChange:React.ChangeEventHandler<HTMLInputElement>}) => {
    return (
        <div className='myInputForDianaContainer'>
            <span>{props.label}</span>
            <input type="text" className='myInputForDiana' value={props.value} onChange={props.onChange} />
        </div>
    )
}