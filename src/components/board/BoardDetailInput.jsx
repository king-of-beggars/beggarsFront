import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { style } from "styles";
import { CommentSubmit } from "assets";
import { boardAPI } from "api/api";
import { chkLoggedIn } from "functions";

function BoardDetailInput({ boardId, userId, changeLoginModal }) {
  // 댓글 state
  const [comment, setComment] = useState("");

  const onChangeComment = (changeObj) => {
    const newComment = changeObj.target.value;
    setComment(newComment);
  };

  // 댓글 입력 API
  const queryClient = useQueryClient();
  const mutationAddComment = useMutation(boardAPI.postBoardComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["receipt", boardId]);
      console.log(boardId, comment);
      setComment("");
    },
    onError: () => alert("조언에 실패하셨구려."),
  });
  // 댓글 입력 버튼
  const onClickInputBtn = () => {
    if (comment !== "") {
      const newInput = {
        commentText: comment,
      };
      mutationAddComment.mutate({ boardId, newInput });
    }
  };

  // console.log("localStorage ::: ", typeof localStorage.getItem("userId"))
  // console.log("API get ::: ", typeof userId)

  return (
    <style.NavWrap style={{ height: "auto", bottom: "auto", justifyContent: "center"}}>
      <style.BoardDetailInputContainer>
        {chkLoggedIn() ? (
          <style.BoardDetailInputLeft
            placeholder={
              localStorage.getItem("userId") === String(userId)
                ? "첨언을 해보게."
                : "조언을 해주게."
            }
            onChange={onChangeComment}
            value={comment}
            disabled={!chkLoggedIn()}
          />
        ) : (
          <style.BoardDetailBtnLeft onClick={changeLoginModal}>
            로그인한다면 조언을 할 수 있다네.
          </style.BoardDetailBtnLeft>
        )}
        {/* <style.BoardDetailInputLeft
          placeholder={
            chkLoggedIn()
              ? localStorage.getItem("userId") === String(userId)
                ? "첨언을 해보게."
                : "조언을 해주게."
              : "로그인한다면 조언을 할 수 있다네."
          }
          onChange={onChangeComment}
          value={comment}
          disabled={!chkLoggedIn()}
          onClick={onClickInputBox}
        /> */}
        <style.BoardDetailInputIcon>
          <CommentSubmit onClick={onClickInputBtn} />
        </style.BoardDetailInputIcon>
      </style.BoardDetailInputContainer>
    </style.NavWrap>
  );
}

export default BoardDetailInput;
