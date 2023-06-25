import React from 'react'
import { style, layout } from "styles"
import * as sVar from "constants/styleVariables";
import ProgressBarCashbook from './ProgressBarCashbook';
import "styles/css/progressBar.css"
import { CashbookBtn } from 'styles/styled-components/styles';

function CashBookCardTemp({ id, index, budget, spend, category, title, cardWidth, cardHeight }) {
  const btnWidth = 274 * 0.8;
  const btnHeight = 46 * 0.8;
  return (
    <style.CashBookCardContainer cardWidth={cardWidth} cardHeight={cardHeight}>
      
      {
        !!title ? (
          <style.CashbookCategoryContainer>
            <style.FirstCategoryText>{category}</style.FirstCategoryText>
            <style.SecondCategoryText>{title}</style.SecondCategoryText>
          </style.CashbookCategoryContainer>
        ) : (
        <style.CashbookCategoryContainer>
          <style.SecondCategoryText style={{margin: "1.5em 0 0.5em 0"}}>{category}</style.SecondCategoryText>
        </style.CashbookCategoryContainer>
        ) 
      }
      <div style={{fontSize: "0.9em", color:`${sVar.middleYellow}`}}>매일 {budget}원</div>
      <div id="container" style={{width: "9em", height: "3em", margin: "1em"}}>
        <ProgressBarCashbook type="semiCircle" spend={spend} budget={budget}/>
      </div>
      <div style={{color: `${sVar.middleYellow}`, margin: "1em 0"}}>{spend}원 사용</div>
      <CashbookBtn btnWidth={`${btnWidth}px`} btnHeight={`${btnHeight}px`}>{spend > budget ? "혼쭐나러 가기" : "자랑하러 가기"}</CashbookBtn>
    </style.CashBookCardContainer>
  )
}

export default CashBookCardTemp