import React, { useState } from "react";
import { style, layout } from "styles"

function CashDetailModal({ setClose }) {
  return (
    <style.ModalOverlay onClick={setClose}>
      <style.ModalDefault style={{width: "90%"}}>
        <span>무지출 데이로</span>
        <span>기록하시겠습니까?</span>
      </style.ModalDefault>
    </style.ModalOverlay>
  )
}

export default CashDetailModal;
