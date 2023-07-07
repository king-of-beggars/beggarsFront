import React from 'react'

import { style } from "styles"
import { CommentSubmit } from 'assets'

function BoardDetailInput() {
  return (
    <style.NavWrap>
      <style.BoardDetailInputContainer>
          <style.BoardDetailInputLeft />
          <style.BoardDetailInputIcon>
              <CommentSubmit />
          </style.BoardDetailInputIcon>
      </style.BoardDetailInputContainer>
    </style.NavWrap>
  )
}

export default BoardDetailInput