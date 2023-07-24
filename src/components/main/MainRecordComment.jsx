import React from 'react'

import { getRandomComment } from 'functions'
import { style } from 'styles'
import { positiveComments, negativeComments, welcomeComments } from "constants"

function MainRecordComment({ dayCount, weatherCode, ratio }) {
  const overallComment = getRandomComment(
                          dayCount === 0
                            ? welcomeComments
                            : weatherCode > 0
                              ? positiveComments
                              : negativeComments)
  return (
    <style.MainRecordCardComment ratio={ratio}>
      {overallComment}
    </style.MainRecordCardComment>
  )
}

export default MainRecordComment