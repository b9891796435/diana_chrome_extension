import React from 'react'
import "./MyButton.css"
export default (props:{text:string,onClick:React.MouseEventHandler<HTMLButtonElement>})=>{
    return <button className='myButtonForDiana' onClick={props.onClick}>{props.text}</button>
}