import React from 'react'

import { getRandomComment } from 'functions'
import { style } from 'styles'
import { positiveComments, negativeComments } from "constants"

function MainRecordComment({ weatherCode, ratio }) {
  const overallComment = getRandomComment(weatherCode > 0 ? positiveComments : negativeComments)
  return (
    <style.MainRecordCardComment ratio={ratio}>
      {overallComment}
    </style.MainRecordCardComment>
  )
}

export default MainRecordComment