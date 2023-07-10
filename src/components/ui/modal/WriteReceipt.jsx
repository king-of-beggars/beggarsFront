 import { BackCramps } from "assets";
import React from "react";

import { style, layout } from "styles";
import { CashBookBtn } from 'styles/styled-components/styles';
import { LabeledInput, LabeledTextarea } from "components"

function WriteReceipt({ setClose, children }) {
  const comment = children === "자랑하러 가기" ? "자랑하기" : "혼쭐나기"
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
                // value={expendName}
                // onChange={onChangeInput}
                height="3em"
            />
            <LabeledTextarea
                title={"코멘트"}
                placeholder={"내용을 입력해주세요."}
                name="comment"
                // value={expendName}
                // onChange={onChangeInput}
                height="150px"
            />
            <CashBookBtn style={{fontFamily: "DOSMyungjo", marginTop: "10px"}}>{comment}</CashBookBtn> 
        </layout.FlexCenterColumn100>
      </style.ModalDefault>
    </style.ModalOverlay>
  );
}

export default WriteReceipt;
