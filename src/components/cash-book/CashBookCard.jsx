import React from "react";
import { layout, style } from "styles";
import * as sVar from "constants/styleVariables";
import { GoCardDetails } from 'assets';

function CashBookCard({ id, budget, spend, category, title }) {
  return (
    <layout.FlexCenterColumn100>
      <GoCardDetails />
      <div
        style={{
          borderRadius: "0.65em",
          background: `${sVar.bookCategory1Color}`,
          padding: "0 5px"
        }}
      >
        <span style={{ color: `${sVar.bookCategory1FontColor}` }}>
          {category}
        </span>
      </div>
    </layout.FlexCenterColumn100>
  );
}

export default CashBookCard;
