import React from 'react'

import { useGlobalVariables } from 'components';
import { getAssetSize } from 'functions'
import { style } from 'styles'

function MainRecordCardTag({ isSaved }) {
  const { frameSize, screenWidth, mainTag } = useGlobalVariables();
  const { width, height } = getAssetSize(frameSize, screenWidth, mainTag);
  const ratio = width / mainTag.width
  const tagComment = isSaved ? "절약" : "낭비"

  return (
    <>
      <style.MainRecordCardTagBox isSaved={isSaved} width={`${width}px`} height={`${height}px`} ratio={ratio}>
        {tagComment}
      </style.MainRecordCardTagBox>
    </>
  )
}

export default MainRecordCardTag