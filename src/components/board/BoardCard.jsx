import "styles/css/progressBar.css"
import React from 'react'
import { CashbookBtn } from 'styles/styled-components/styles';
import { ProgressBarSemiCircle } from 'components';
import { style, layout } from "styles"
import * as sVar from "constants/styleVariables";;


function BoardCard({ id, index, budget, spend, category, title, ratio }) {
  const cardWidthOrigin = 301
  const cardHeightOrigin = 356

  const btnWidth = 274 * 0.8;
  const btnHeight = 46 * 0.8;
  console.log(cardWidthOrigin * ratio)
  return (
    <style.CashBookCardContainer cardWidth={`${cardWidthOrigin * ratio}px`} cardHeight={`${cardHeightOrigin * ratio}px`}>
      
      {
        !!title ? (
          <style.CashbookCategoryContainer ratio={ratio}>
            <style.FirstCategoryText ratio={ratio}>{category}</style.FirstCategoryText>
            <style.SecondCategoryText ratio={ratio}>{title}</style.SecondCategoryText>
          </style.CashbookCategoryContainer>
        ) : (
        <style.CashbookCategoryContainer ratio={ratio}>
          <style.SecondCategoryText ratio={ratio} style={{margin: `${1.5 * ratio}em 0 ${0.5 * ratio}em 0`}}>{category}</style.SecondCategoryText>
        </style.CashbookCategoryContainer>
        ) 
      }
      <div style={{fontSize: `${1 * ratio}em`, color:`${sVar.middleYellow}`}}>매일 {budget}원</div>
      <div id="container" style={{width: `${9 * ratio}em`, height: `${3 * ratio}em`, margin: `${1 * ratio}em`}}>
        <ProgressBarSemiCircle ratio={ratio} type="semiCircle" spend={spend} budget={budget}/>
      </div>
      <div style={{color: `${sVar.middleYellow}`, margin: `${1 * (ratio * 1.8)}em ${1 * (ratio * 1.5)}em`, fontSize: `${1 * ratio}em`}}>{spend}원 사용</div>
      <CashbookBtn ratio={ratio} btnWidth={`${btnWidth * ratio}px`} btnHeight={`${btnHeight * (ratio * 1.1)}px`}>자세히 보기</CashbookBtn>
    </style.CashBookCardContainer>
  )
}

export default BoardCard