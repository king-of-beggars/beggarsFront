import React from 'react';
import { style, layout } from 'styles';
import * as sVar from 'common/constants/styleVariables.js';
// import { CashBookNoneBtn } from "styles/styled-components/styles";

function CashDetailModal({ setClose, onClickHandler, children }) {
  return (
    <style.ModalOverlay onClick={setClose}>
      <style.ModalDefault
        style={{ width: '90%', color: 'black' }}
        onClick={(event) => event.stopPropagation()}
      >
        {children.map((ment) => {
          return <span>{ment}</span>;
        })}
        <layout.FlexCenterRow100 style={{ gap: '10px' }}>
          <style.CashBookNoneBtn
            background={sVar.bookModalYesBtn}
            onClick={onClickHandler}
          >
            예
          </style.CashBookNoneBtn>
          <style.CashBookNoneBtn
            background={sVar.bookModalNoBtn}
            onClick={setClose}
          >
            아니오
          </style.CashBookNoneBtn>
        </layout.FlexCenterRow100>
      </style.ModalDefault>
    </style.ModalOverlay>
  );
}

export default CashDetailModal;

// 현재 cashbook쪽과 boardDetail 모두에서 사용하고 있음
