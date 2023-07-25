import React, { useState } from 'react'
import useSound from "use-sound"
import { layout, style } from "styles"
import { btnClickSound } from 'assets'

function DefaultBtn({ children }) {
    const [isPressed, setIsPressed] = useState(false)
    const [play, { stop }] = useSound(
        btnClickSound,
        { volume: 0.25 }
    )
    // const onClickHandler = () => {
    //     console.log("isPressed::", isPressed)
    //     if (!isPressed) {
    //         document.getElementById("btnClicked").play()
    //     }
    //     setIsPressed(!isPressed)
    // }

    const mouseEventHandler = (event) => {
        // console.log(event)
        if (event.type === "mousedown") {
            setIsPressed(true)
            play()
        } else if (event.type === "mouseup") {
            setIsPressed(false)
            stop()
        }
        // console.log(event.type)
    }

    const touchEventHandler = (event) => {
        if (event.type === "touchstart") {
            setIsPressed(true)
            play()
        } else if (event.type === "touchend") {
            setIsPressed(false)
            stop()
        }
    }

  return (
    <layout.FlexDefault style={{position: "absolute", flexDirection: "column-reverse", bottom: "20px"}}>
        <style.Button
            isPressed={ isPressed }
            onTouchStart={ touchEventHandler }
            onTouchEnd={ touchEventHandler }
            onMouseDown={ mouseEventHandler }
            onMouseUp={ mouseEventHandler }>
            { children }
        </style.Button>
    </layout.FlexDefault>
  )
}

export default DefaultBtn