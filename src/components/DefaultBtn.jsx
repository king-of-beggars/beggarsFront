import React, { useState } from 'react'
import { layout, style } from "../styles"
import { btnClickSound } from '../assets/sounds'

function DefaultBtn({ children }) {
    const [isPressed, setIsPressed] = useState(false)
    // const onClickHandler = () => {
    //     console.log("isPressed::", isPressed)
    //     if (!isPressed) {
    //         document.getElementById("btnClicked").play()
    //     }
    //     setIsPressed(!isPressed)
    // }

    const mouseEventHandler = (event) => {
        console.log(event)
        if (event.type === "mousedown") {
            setIsPressed(true)
            document.getElementById("btnClicked").play()
        } else if (event.type === "mouseup") {
            setIsPressed(false)
        }
        console.log(event.type)
    }

  return (
    <layout.FlexDefault style={{position: "absolute", flexDirection: "column-reverse", bottom: "20px"}}>
        <style.Button isPressed={isPressed} onMouseDown={mouseEventHandler} onMouseUp={mouseEventHandler}>
            { children }
        </style.Button>
        <audio id="btnClicked" src={btnClickSound} preload="auto"/>
    </layout.FlexDefault>
  )
}

export default DefaultBtn