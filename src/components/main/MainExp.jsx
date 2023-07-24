import React from 'react'

import { Textfit } from 'react-textfit'
import { getAssetSize } from 'functions'
import { useGlobalVariables } from "providers"
import { commentDayAfter } from 'constants'
import { layout, style } from 'styles'


function MainExp({ dayCount }) {
  console.log(decodeURIComponent(localStorage.getItem("nickname")))
  const userName = !!decodeURIComponent(localStorage.getItem("nickname")) && decodeURIComponent(localStorage.getItem("nickname")) !== "null"
                    ? decodeURIComponent(localStorage.getItem("nickname"))
                    : "여유로운 바다사자"
  
  console.log('userName:::', userName)
  const { frameSize, screenWidth, mainExpBox } = useGlobalVariables()
  const { width, height } = getAssetSize(frameSize, screenWidth, mainExpBox);
  const comment = `${userName}${commentDayAfter[0]} ${dayCount}${commentDayAfter[1]}`
  const ratio = width / mainExpBox.width

  return (
    <style.MainExpBox width={`${width}px`} height={`${height}px`} ratio={ratio}>
      {/* {comment} */}
        <div style={{width: `${width * 0.8}px`, fontFamily: "DOSGothic"}}>
            <Textfit mode="single">
                {comment}
            </Textfit>
        </div>
    </style.MainExpBox>
  )
}

export default MainExp