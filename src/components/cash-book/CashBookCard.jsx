import React from "react";
import { layout, style } from "styles";
import * as sVar from "constants/styleVariables";
import { GoCardDetails } from 'assets';
import { cashbookCardYellow } from 'assets';

function CashBookCard({ id, budget, spend, category, title }) {
  const widthRatio = 356 / 393
  const cardRatio = 356 / 301
  return (
    <layout.FlexCenterColumn100 style={{zIndex: "0", backgroundImage: `url(${cashbookCardYellow})`, width: "300px", height: "auto", border: "1px solid blue", marginBottom: "20px"}}>
      <GoCardDetails style={{position: "fixed", top: "0", right: "20px"}}/>
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
      <div>{title}</div>
      <div style={{width: "90%", borderBottom: "1px solid #eee"}}></div>
      <div>매일 {budget}원</div>
      <div>{spend}원 사용</div>
    </layout.FlexCenterColumn100>
  );
}

export default CashBookCard;
