import { BackCramps } from "assets";
import React from "react";

import { style, layout } from "styles";

function WriteReceipt({ setClose, children }) {
  return (
    <style.ModalOverlay onClick={setClose}>
      <style.ModalDefault
        style={{ width: "90%" }}
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
            
        </layout.FlexCenterColumn>
      </style.ModalDefault>
    </style.ModalOverlay>
  );
}

export default WriteReceipt;
