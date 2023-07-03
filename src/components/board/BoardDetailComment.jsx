import { commentDel, commentFav, commentFavDefault } from 'assets';
import React from "react";

import { layout, style } from "styles";

function BoardDetailComment({ id, userName, likeCheck, children }) {
  const [isLiked, setIsLiked] = setIsLiked(likeCheck)

  const likeHandler = () => {
    setIsLiked(!isLiked)
  }

  return (
    <layout.FlexCenterRow100
      style={{ padding: "10px", gap: "5px", justifyContent: "space-between" }}
    >
      <layout.FlexCenter style={{width:"15%", marginRight:"10px"}}> 
        <style.BoardProfilePhoto />
      </layout.FlexCenter>
      <layout.FlexColumn100 style={{ width: "75%" }}>
        <div>{userName}</div>
        <div>{children}</div>
      </layout.FlexColumn100>
      <layout.FlexColumn100  style={{ width: "10%" }}>
        <div>
          // 댓글 삭제 아이콘
          <style.BoardCommentIcon background={`url(${commentDel})`} changedBackground={`url(${commendDelHover})`}/>
          // 좋아요 아이콘
          { likeCheck 
            ? <style.BoardCommentIcon onClick={likeHandler} background={`url(${commentFav})`} />
            : <style.BoardCommentIcon onClick={likeHandler} background={`url(${commentFavDefault})`} />
          }
        </div>
        <div>럽</div>
      </layout.FlexColumn100>
    </layout.FlexCenterRow100>
  );
}

export default BoardDetailComment;
