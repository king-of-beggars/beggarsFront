import { CommentDelDark, CommentDelLight, CommentFav, CommentFavDefaultDark, commentDelHover, commentFavDefault } from 'assets';
import { CommentFavDefaultLight } from 'components';
import React, { useState } from "react";
import { layout, style } from "styles";
import * as sVar from "constants/styleVariables"

function BoardDetailComment({ id, isBoasting, userName, likeCheck, likeCount, children }) {
  const [isLiked, setIsLiked] = useState(likeCheck)

  const likeHandler = () => {
    setIsLiked(!isLiked)
  }

  console.log("userName:::", userName)
  return (
    <layout.FlexCenterRow100
      style={{ borderRadius: "4px", padding: "13px 10px", gap: "5px", justifyContent: "space-between", backgroundColor: `${sVar.white50}`}}
    >
      <layout.FlexDefault style={{justifyContent: "center", width:"15%", marginRight:"10px"}}> 
        <style.BoardProfilePhoto />
      </layout.FlexDefault>
      <layout.FlexColumn100 style={{ width: "75%", fontSize: "0.8em" }}>
        <div style={{fontFamily: "DOSGothic", marginBottom: "5px"}}>{userName}</div>
        <div>{children}</div>
      </layout.FlexColumn100>
      <layout.FlexColumn100  style={{ width: "10%" }}>
        <layout.FlexCenterColumn>
          {/* // 댓글 삭제 아이콘 */}
          {
            isBoasting
            ? <CommentDelLight />
            : <CommentDelDark />
          }
          {/* // 좋아요 아이콘 */}
          {
            likeCheck
            ? <CommentFav />
            : isBoasting
              ? null
              : <CommentFavDefaultDark />
          }
          {/* { likeCheck 
            ? <style.BoardCommentIcon onClick={likeHandler} background={`url(${CommentFav})`} />
            : <style.BoardCommentIcon onClick={likeHandler} background={`url(${commentFavDefault})`} />
          } */}
        </layout.FlexCenterColumn>
      </layout.FlexColumn100>
    </layout.FlexCenterRow100>
  );
}

export default BoardDetailComment;
