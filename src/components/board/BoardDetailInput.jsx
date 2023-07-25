import React, { useState, useContext } from "react";
import { useMutation, useQueryClient } from "react-query";

import { useGlobalVariables, AuthContext } from 'providers';
import { style } from "styles";
import { CommentSubmit } from "assets";
import { boardAPI } from "api/api";
import * as sVar from 'constants/styleVariables';

function BoardDetailInput({ boardId, userId, changeLoginModal }) {
  const { isLoggedIn } = useContext(AuthContext);
  const { widthRatio } = useGlobalVariables();
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
      // console.log(boardId, comment);
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
    <style.NavWrap ratio={widthRatio} style={{ position:"static", padding: "0", height: "50px", justifyContent: "center", alignItems: "center"}}>
      <style.BoardDetailInputContainer>
        {isLoggedIn ? (
          <style.BoardDetailInputLeft
            ratio={widthRatio}
            placeholder={
              localStorage.getItem("userId") === String(userId)
                ? "첨언을 해보게."
                : "조언을 해주게."
            }
            onChange={onChangeComment}
            value={comment}
            disabled={!isLoggedIn}
          />
        ) : (
          <style.BoardDetailBtnLeft style={{width: "inherit", textAlign: "left", paddingLeft: `${widthRatio * 10}px`, color: `${sVar.gray757575}`}} ratio={widthRatio} onClick={changeLoginModal}>
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
