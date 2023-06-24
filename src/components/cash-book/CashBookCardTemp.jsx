import React from 'react'
import { style, layout } from "styles"
import * as sVar from "constants/styleVariables";

function CashBookCardTemp({ id, index, budget, spend, category, title, cardWidth, cardHeight }) {
  return (
    <style.CashBookCardContainer cardWidth={cardWidth} cardHeight={cardHeight}>
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
      <div>thisIndex: {index}</div>
      <div>{title}</div>
      <div style={{width: "90%", borderBottom: "1px solid #eee"}}></div>
      <div>매일 {budget}원</div>
      <div>{spend}원 사용</div>
    </style.CashBookCardContainer>
  )
}

export default CashBookCardTemp