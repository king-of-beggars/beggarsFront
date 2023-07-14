import React from 'react'

import { getAssetSize } from 'functions'
import { useGlobalVariables } from 'components'
import { style } from 'styles'

function MainToggle({ isToggleOnLeft }) {
  const { frameSize, screenWidth, mainToggleBar, mainToggleBtn } = useGlobalVariables();
  const { width: barWidth, height: barHeight } = getAssetSize(frameSize, screenWidth, mainToggleBar);
  const { width: btnWidth, height: btnHeight } = getAssetSize(frameSize, screenWidth, mainToggleBtn);

  const ratio = barWidth / mainToggleBar.width

  return (
    <style.MainToggleBar ratio={ratio} width={`${barWidth}px`} height={`${barHeight}px`}>
        {isToggleOnLeft ?
        <>
            <style.MainToggleBtnActivate width={`${btnWidth}px`} height={`${btnHeight}px`} ratio={ratio}>정보</style.MainToggleBtnActivate> 
            <style.MainToggleBtnSleep width={`${btnWidth}px`} height={`${btnHeight}px`} ratio={ratio}>상세</style.MainToggleBtnSleep> 
        </>
        :
        <>
            <style.MainToggleBtnSleep width={`${btnWidth}px`} height={`${btnHeight}px`} ratio={ratio}>정보</style.MainToggleBtnSleep>
            <style.MainToggleBtnActivate width={`${btnWidth}px`} height={`${btnHeight}px`} ratio={ratio}>상세</style.MainToggleBtnActivate>
        </>
 
        }
    </style.MainToggleBar>
  )
}

export default MainToggle