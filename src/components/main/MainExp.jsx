import React from 'react'

import { Textfit } from 'react-textfit'
import { getAssetSize } from 'functions'
import { AutoResizedText, useGlobalVariables } from 'components'
import { commentDayAfter } from 'constants'
import { layout, style } from 'styles'

const userName = !!decodeURIComponent(localStorage.getItem("nickname"))
                  ? decodeURIComponent(localStorage.getItem("nickname"))
                  : "여유로운 바다사자"

function MainExp({ dayCount }) {
  const { frameSize, screenWidth, mainExpBox } = useGlobalVariables()
  const { width, height } = getAssetSize(frameSize, screenWidth, mainExpBox);
  const comment = `${userName}${commentDayAfter[0]} ${dayCount}${commentDayAfter[1]}`
  const ratio = width / mainExpBox.width

  return (
    <style.MainExpBox width={`${width}px`} height={`${height}px`} ratio={ratio}>
      {comment}
        {/* <div style={{width: `${width * 0.8}px`, fontFamily: "DOSGothic"}}>
            <Textfit mode="single">
                {comment}
            </Textfit>
        </div> */}
    </style.MainExpBox>
  )
}

export default MainExp