import React, { useState } from "react";
import { style, layout } from "styles"
import * as sVar from "constants/styleVariables.js";

function CashDetailModal({ setClose }) {
  return (
    <style.ModalOverlay onClick={setClose}>
      <style.ModalDefault style={{width: "90%"}}>
        <span>무지출 데이로</span>
        <span>기록하시겠습니까?</span>
        <layout.FlexCenterRow100>
        <CashBookNoneBtn background={sVar.bookModalYesBtn}>예</CashBookNoneBtn>
        <CashBookNoneBtn background={sVar.bookModalNoBtn}>아니오</CashBookNoneBtn>
        </layout.FlexCenterRow100>
      </style.ModalDefault>
    </style.ModalOverlay>
  )
}

export default CashDetailModal;
