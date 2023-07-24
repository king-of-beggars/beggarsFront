import React from 'react'

import { useGlobalVariables } from "providers"
import { getAssetSize } from 'functions'
import { style } from 'styles'

function MainRecordCardTag({ dayCount, weatherCode }) {
  const { frameSize, screenWidth, mainTag } = useGlobalVariables();
  const { width, height } = getAssetSize(frameSize, screenWidth, mainTag);
  const ratio = width / mainTag.width
  // const tagComment = weatherCode > 0 ? "절약" : "과소비"
  const tagComment = dayCount === 0
                      ? "환영!"
                      : weatherCode > 0
                        ? "절약"
                        : "과소비"

  return (
    <>
      <style.MainRecordCardTagBox weatherCode={weatherCode} width={`${width}px`} height={`${height}px`} ratio={ratio}>
        {tagComment}
      </style.MainRecordCardTagBox>
    </>
  )
}

export default MainRecordCardTag