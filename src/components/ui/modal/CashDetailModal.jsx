import React, { useState } from "react";
import { style, layout } from "styles"
import * as sVar from "constants/styleVariables.js";
// import { CashBookNoneBtn } from "styles/styled-components/styles";

function CashDetailModal({ setClose }) {
  return (
    <style.ModalOverlay onClick={setClose}>
      <style.ModalDefault style={{width: "90%"}}>
        <span>무지출 데이로</span>
        <span>기록하시겠습니까?</span>
        <layout.FlexCenterRow100>
        <style.CashBookNoneBtn background={sVar.bookModalYesBtn}>예</style.CashBookNoneBtn>
        <style.CashBookNoneBtn background={sVar.bookModalNoBtn}>아니오</style.CashBookNoneBtn>
        </layout.FlexCenterRow100>
      </style.ModalDefault>
    </style.ModalOverlay>
  )
}

export default CashDetailModal;
