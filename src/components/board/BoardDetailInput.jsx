import React, { useState } from 'react'

import { style } from "styles"
import { CommentSubmit } from 'assets'
import { useMutation, useQueryClient } from 'react-query';
import { boardAPI } from 'api/api';

function BoardDetailInput({boardId}) {
  // 댓글 state
  const [comment, setComment] = useState('');

  const onChangeComment = (changeObj) => {
    const newComment = changeObj.target.value;
    setComment(newComment);
  }

  // 댓글 입력 API
  const queryClient = useQueryClient();
  const mutationAddComment = useMutation(boardAPI.postBoardComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["receipt", boardId]);
      console.log(boardId, comment)
      setComment('');
    },
    onError: () => alert("조언에 실패하셨구려."),
  })
  // 댓글 입력 버튼
  const onClickInputBtn = () => {
    const newInput = {
      commentText : comment
    };
    mutationAddComment.mutate({boardId, newInput})
  }
  return (
    <style.NavWrap style={{height: "auto", bottom: "auto"}}>
      <style.BoardDetailInputContainer>
          <style.BoardDetailInputLeft 
            placeholder={"조언을 해주게."}
            onChange={onChangeComment}
            value={comment}
          />
          <style.BoardDetailInputIcon>
              <CommentSubmit onClick={onClickInputBtn}/>
          </style.BoardDetailInputIcon>
      </style.BoardDetailInputContainer>
    </style.NavWrap>
  )
}

export default BoardDetailInput