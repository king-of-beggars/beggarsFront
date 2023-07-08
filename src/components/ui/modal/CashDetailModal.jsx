import React, { useState } from "react";
import { style, layout } from "styles"
import * as sVar from "constants/styleVariables.js";
import { useMutation, useQueryClient } from "react-query";
import { CashBookAPI } from "api/api";
// import { CashBookNoneBtn } from "styles/styled-components/styles";

function CashDetailModal({ setClose, typeModal, onClickHandler, children }) {
  // 예 눌렀을 때 변경사항
  const queryClient = useQueryClient();
  // const mutationNone = useMutation(CashBookAPI.putCashNone, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['cashCard']);
  //     // navigate("/cash-book");
  //   },
  //   onError: () => alert("카드 추가에 실패하였습니다."),
  // })
  return (
    <style.ModalOverlay onClick={setClose}>
      <style.ModalDefault style={{width: "90%"}} onClick={(event) => event.stopPropagation()}>
        {children.map((ment)=><span>{ment}</span>)}
        <layout.FlexCenterRow100>
        <style.CashBookNoneBtn background={sVar.bookModalYesBtn} onClick={onClickHandler}>예</style.CashBookNoneBtn>
        <style.CashBookNoneBtn background={sVar.bookModalNoBtn}>아니오</style.CashBookNoneBtn>
        </layout.FlexCenterRow100>
      </style.ModalDefault>
    </style.ModalOverlay>
  )
}

export default CashDetailModal;
