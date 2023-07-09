import { BackCramps } from "assets";
import React from "react";

import { style, layout } from "styles";
import CashBookInput from "components/ui/input/CashBookInput";

function WriteReceipt({ setClose, children }) {
  return (
    <style.ModalOverlay onClick={setClose}>
      <style.ModalDefault
        onClick={(event) => event.stopPropagation()}
      >
        <layout.FlexCenterRow100 style={{ top: "1em", padding: "1em" }}>
          <BackCramps
            onClick={setClose}
            style={{ position: "absolute", left: "1em", float: "left" }}
          />
          <div style={{ fontSize: "25px" }}>{children}</div>
        </layout.FlexCenterRow100>
        <layout.FlexCenterColumn style={{ margin: "20px" }}>
            <CashBookInput
                title={"제목"}
                placeholder={"제목을 입력해주세요."}
                name="title"
                type="text"
                // value={expendName}
                // onChange={onChangeInput}
                height="3em"
            />
            <CashBookInput
                title={"코멘트"}
                placeholder={"내용을 입력해주세요."}
                name="title"
                type="text"
                // value={expendName}
                // onChange={onChangeInput}
                height="5em"
            />
        </layout.FlexCenterColumn>
      </style.ModalDefault>
    </style.ModalOverlay>
  );
}

export default WriteReceipt;
