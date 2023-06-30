import { BackCramps } from "assets";
import React from "react";
import { useNavigate } from "react-router-dom";

import { style, layout } from "styles";
import CashBookInput from "components/ui/input/CashBookInput";
import { CashBookBtn } from "styles/styled-components/styles";

function ExpendAddModal({ isOpen, onClose }) {
  // 뒤로가기
  const onClickBack = () => {
    onClose();
  };

  return (
    <style.ModalBackground onClick={onClose}>
      <style.Modal onClick={(event) => event.stopPropagation()}>
        <layout.FlexCenterRow100 style={{ top: "1em", padding: "1em" }}>
          <BackCramps
            onClick={onClickBack}
            style={{ position: "absolute", left: "1em", float: "left" }}
          />
          <div style={{ fontSize: "25px" }}>지출 기록</div>
        </layout.FlexCenterRow100>

        <layout.FlexCenterColumn style={{margin:"20px"}}>
          <CashBookInput
            title={"항목"}
            placeholder={"지출 항목을 입력해주세요."}
          />
          <CashBookInput
            title={"가격"}
            placeholder={"가격을 입력해주세요."}
          />
          <CashBookBtn marginTop="10px">저장</CashBookBtn>
        </layout.FlexCenterColumn>
      </style.Modal>
    </style.ModalBackground>
  );
}

export default ExpendAddModal;
