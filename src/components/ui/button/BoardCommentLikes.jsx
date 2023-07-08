import React from 'react'
import { CommentFav, CommentFavDefaultDark, CommentFavDefaultLight } from 'assets'
import { layout, style } from 'styles'

function BoardCommentLikes({ isBoasting, isLiked, likeCount }) {
    console.log("likeCount:::", likeCount)
  return (
    <layout.FlexCenterColumn style={{position: "relative"}}>
        { isLiked
            ? <CommentFav />
            : isBoasting
                ? <CommentFavDefaultLight />
                : <CommentFavDefaultDark />
        }
        <style.LikeCounts isGray={likeCount === 0}>
            {likeCount}
        </style.LikeCounts>
    </layout.FlexCenterColumn>
  )
}

export default BoardCommentLikes