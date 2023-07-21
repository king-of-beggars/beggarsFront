import React, { useState } from "react";
import { useMutation, useQueryClient } from 'react-query';

import { CommentDelDark, CommentDelLight, CommentFav, CommentFavDefaultDark, CommentFavDefaultLight, commentDelHover, commentFavDefault } from 'assets';
import { layout, style } from "styles";
import * as sVar from "constants/styleVariables"
import { BoardCommentLikes, CommentDeleteModal } from 'components';
import { commentBoardDelete } from 'constants';
import { boardAPI } from 'api/api';


function BoardDetailComment({ id, boardId, isBoasting, userName, likeCheck, likeCount, children }) {
  // 좋아요 버튼 handler
  const [isLiked, setIsLiked] = useState(likeCheck)
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const likeHandler = () => {
    mutationLike.mutate(id);
    // setIsLiked(!isLiked)
  }

  // 좋아요 API
  const mutationLike = useMutation(boardAPI.postLikeComment, {
    onSuccess: () => {
      setIsLiked(!isLiked)
      queryClient.invalidateQueries(["receipt", boardId]);
    },
    onError: () => alert("좋아요 변환에 실패하였습니다."),
  })

  // console.log("", id, boardId)

  // 댓글 삭제 API
  const queryClient = useQueryClient();
  const mutationDeleteComment = useMutation(boardAPI.deleteBoardComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["receipt", boardId]);
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
            <div onClick={(() => setIsDeleteModal(!isDeleteModal))}>
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
      {
          isDeleteModal && (
            <CommentDeleteModal
              setClose={() => setIsDeleteModal(false)}
              onClickHandler={onClickDeleteComment}
            >
              {commentBoardDelete}
            </CommentDeleteModal>
          )
        }
    </layout.FlexCenterRow100>
  );
}

export default BoardDetailComment;
