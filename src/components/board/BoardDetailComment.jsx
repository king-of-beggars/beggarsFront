import React, { useState } from "react";
import { useMutation, useQueryClient } from 'react-query';

import { CommentDelDark, CommentDelLight, CommentFav, CommentFavDefaultDark, CommentFavDefaultLight, commentDelHover, commentFavDefault } from 'assets';
import { layout, style } from "styles";
import * as sVar from "constants/styleVariables"
import { BoardCommentLikes } from 'components';
import { boardAPI } from 'api/api';


function BoardDetailComment({ id, boardId, isBoasting, userName, likeCheck, likeCount, children }) {
  // 좋아요 버튼 handler
  const [isLiked, setIsLiked] = useState(likeCheck)

  const likeHandler = () => {
    setIsLiked(!isLiked)
  }

  // console.log("", id, boardId)

  // 댓글 삭제 API
  const queryClient = useQueryClient();
  const mutationDeleteComment = useMutation(boardAPI.deleteBoardComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["receipt", boardId]);
      // navigate("/cash-book");
    },
    onError: () => alert("댓글 삭제에 실패하였습니다."),
  })

  // 댓글 삭제 버튼 handler
  const onClickDeleteComment = () => {
    mutationDeleteComment.mutate({boardId, commentId:id});
  }
  
  // console.log("userName:::", userName)
  // console.log("local ::: ", decodeURIComponent(localStorage.getItem("nickname")))
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
            decodeURIComponent(localStorage.getItem("nickname")) === String(userName) ? 
            <div onClick={onClickDeleteComment}>
              {isBoasting ? <CommentDelLight /> : <CommentDelDark />}
            </div>
            : <></>
          }
          {/* // 좋아요 아이콘 */}
          <BoardCommentLikes isBoasting={isBoasting} isLiked={isLiked} likeCount={likeCount} likeHandler={likeHandler}/>
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
