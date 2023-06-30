import React from 'react'
import { style, layout } from "styles"
import { ProgressBarSemiCircle } from "components"

function CardBox({id, budget, spend, category, title, screenWidth, ratio, isDefault=true}) {
    const [cardWidthOrigin, cardHeightOrigin] = [301, 356]
    const [screenWidthOrigin, screenHeightOrigin] = [393, 852]
    const cardWidth = ((screenWidth / screenWidthOrigin) * cardWidthOrigin) * ratio
    const cardHeight = cardWidth * (cardHeightOrigin / cardWidthOrigin)

    const [bigCardBtnWidth, bigCardBtnHeight] = [274, 46]
    const [smallCardBtnWidth, smallCardBtnHeight] = [151, 26]
  return (
    <style.CardBoxContainer cardWidth={cardWidth} cardHeight={cardHeight}>
        {
            !!title ? (
                    <style.CardCategoryContainer isDefault={isDefault}>
                        <style.Card1stCategoryText isDefault={isDefault}>{category}</style.Card1stCategoryText>
                        <style.Card2ndCategoryText isDefault={isDefault}>{title}</style.Card2ndCategoryText>
                        <style.CardDivision isDefault={isDefault} />
                        <style.CardBudgetText>매일 {budget}원</style.CardBudgetText>
                    </style.CardCategoryContainer>
                ) : (
                    <style.CardCategoryContainer  isDefault={isDefault}>
                        <style.Card2ndCategoryText isDefault={isDefault} style={{margin: `${1.5 * ratio}em 0 ${0.5 * ratio}em 0`}}>{category}</style.Card2ndCategoryText>
                        <style.CardDivision isDefault={isDefault} />
                        <style.CardBudgetText>매일 {budget}원</style.CardBudgetText>                    
                    </style.CardCategoryContainer>
                )
        }
      <style.CardProgressBarContainer>
        <ProgressBarSemiCircle ratio={ratio} isDefault={isDefault} spend={spend} budget={budget}/>
      </style.CardProgressBarContainer>
      <style.CardSpendText>{spend}원 사용</style.CardSpendText>
      { (!!isDefault && ratio == 1)
        ? <style.CardBtn id={id} isDefault={isDefault} btnWidth={`${bigCardBtnWidth * ratio}px`} btnHeight={`${bigCardBtnHeight * ratio}px`}>{spend > budget ? "혼쭐나러 가기" : "자랑하러 가기"}</style.CardBtn>
        : <style.CardBtn id={id} isDefault={isDefault} btnWidth={`${smallCardBtnWidth * ratio}px`} btnHeight={`${smallCardBtnHeight * ratio}px`}>자세히 보기</style.CardBtn>}
    </style.CardBoxContainer>
  )
}

export default CardBox
