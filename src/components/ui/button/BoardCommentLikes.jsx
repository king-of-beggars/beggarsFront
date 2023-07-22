import React from "react";
import {
  CommentFav,
  CommentFavDefaultDark,
  CommentFavDefaultLight,
} from "assets";
import { layout, style } from "styles";
import { chkLoggedIn } from "functions";

function BoardCommentLikes({ isBoasting, isMyComment, isLiked, likeCount, likeHandler }) {
  // 로그인 유무에 따른 노출 여부
  const isVisibility = chkLoggedIn() ? "visible" : "hidden"

  // console.log("likeCount:::", likeCount);
  return (
    <layout.FlexCenterColumn style={{ position: "relative" }}>
      {
        isMyComment
        ? isBoasting
          ? (
            <CommentFavDefaultLight aria-disabled visibility={isVisibility} />
          ) : (
            <CommentFavDefaultDark aria-disabled visibility={isVisibility} />
          )
        : !!isLiked ? (
            <CommentFav onClick={likeHandler} visibility={isVisibility} />
          ) : isBoasting ? (
            <CommentFavDefaultLight onClick={likeHandler} visibility={isVisibility} />
          ) : (
            <CommentFavDefaultDark onClick={likeHandler} visibility={isVisibility} />
          )
      }
      <style.LikeCounts isGray={likeCount === 0} visibility={isVisibility}>{likeCount}</style.LikeCounts>
    </layout.FlexCenterColumn>
  );
}

export default BoardCommentLikes;
