import React from 'react'

import { layout, style } from 'styles'
import { commentDayAfter } from 'constants'
import { AutoResizedText } from 'components'
import { Textfit } from 'react-textfit'

function MainExp({ userName, dayCount, width, height }) {
    const comment = `${userName}${commentDayAfter[0]} ${dayCount}${commentDayAfter[1]}`
  return (
    <style.MainExpBox width={`${width}px`} height={`${height}px`}>
        {/* <div style={{width: `${width * 0.75}px`, fontFamily: "DOSGothic"}}>
            <Textfit mode="single" forceSingleModeWidth={false}>
                {comment}
            </Textfit>
        </div> */}
    </style.MainExpBox>
  )
}

export default MainExp