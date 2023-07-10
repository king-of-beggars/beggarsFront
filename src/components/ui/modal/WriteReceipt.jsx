 import { BackCramps } from "assets";
import React, { useState } from "react";

import { style, layout } from "styles";
import { CashBookBtn } from 'styles/styled-components/styles';
import { LabeledInput, LabeledTextarea } from "components";
import { useMutation, useQueryClient } from "react-query";
import { CashBookAPI } from "api/api";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function WriteReceipt({ setClose, cardId, children }) {
  const navigate = useNavigate();
  const comment = children === "자랑하러 가기" ? "자랑하기" : "혼쭐나기"

  // 게시글 state
  const [postContent, setPostContent] = useState({
    title: "",
    content: "",
  });
  const { title, content } = postContent;

  const onChangeInput = (changeObj) => {
    const { name, value } = changeObj.target;

    const newPost = {
      ...postContent,
      [name]: value,
    };

    setPostContent(newPost);
  }

  // 게시글 등록 API
  const queryClient = useQueryClient();
  const mutationAddBoard = useMutation(CashBookAPI.postCardBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries([`cashCard${moment().format("YYYY-MM-DD")}`]);
      navigate("/cash-book");
    },
    onError: () => alert("카드 수정을 실패했습니다."),
  });

  const onClickSave = () => {
    const newBoard= {boardName: title,
    boardText: content};
    mutationAddBoard.mutate({cardId, newBoard});
    alert("게시글 작성 성공!!");
    setClose();
  }

  return (
    <style.ModalOverlay onClick={setClose}>
      <style.ModalDefault style={{width: "90%", gap: "30px"}}
        onClick={(event) => event.stopPropagation()}
      >
        <layout.FlexCenter100 style={{ position: "relative" }}>
          <BackCramps
            onClick={setClose}
            style={{ position: "absolute", left: "0" }}
          />
          <div style={{ fontSize: "25px" }}>{children}</div>
        </layout.FlexCenter100>
        <layout.FlexCenterColumn100 style={{fontFamily: "DOSGothic"}}>
            <LabeledInput
                title={"제목"}
                placeholder={"제목을 입력해주세요."}
                name="title"
                type="text"
                value={title}
                onChange={onChangeInput}
                height="3em"
            />
            <LabeledTextarea
                title={"코멘트"}
                placeholder={"내용을 입력해주세요."}
                name="content"
                value={content}
                onChange={onChangeInput}
                height="150px"
            />
            <CashBookBtn style={{fontFamily: "DOSMyungjo", marginTop: "10px"}} onClick={onClickSave} name="book">{comment}</CashBookBtn> 
        </layout.FlexCenterColumn100>
      </style.ModalDefault>
    </style.ModalOverlay>
  );
}

export default WriteReceipt;
