import React from 'react'

import { style, layout } from "styles"
import * as sVar from "constants/styleVariables.js";

function CommentDeleteModal({ setClose, onClickHandler, children }) {
  return (
    <style.ModalOverlay onClick={setClose}>
      <style.ModalDefault style={{width: "90%", color: "black"}} onClick={(event) => event.stopPropagation()}>
        {children.map((ment)=><span>{ment}</span>)}
        <layout.FlexCenterRow100 style={{gap:"10px"}}>
        <style.CashBookNoneBtn background={sVar.bookModalYesBtn} onClick={onClickHandler}>예</style.CashBookNoneBtn>
        <style.CashBookNoneBtn background={sVar.bookModalNoBtn} onClick={setClose}>아니오</style.CashBookNoneBtn>
        </layout.FlexCenterRow100>
      </style.ModalDefault>
    </style.ModalOverlay>
  )
}

export default CommentDeleteModal