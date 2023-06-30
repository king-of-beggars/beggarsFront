import React from 'react'
import { style, layout } from "styles"
import { ProgressBarSemiCircle } from "components"

function CardBox({id, budget, spend, category, title, screenWidth, ratio, isDefault=true}) {
    const [cardWidthOrigin, cardHeightOrigin] = [301, 356]
    const [screenWidthOrigin, screenHeightOrigin] = [393, 852]
    const cardWidth = screenWidth > 393 ? cardWidthOrigin * ratio : ((screenWidth / screenWidthOrigin) * cardWidthOrigin) * ratio
    const cardHeight = cardWidth * (cardHeightOrigin / cardWidthOrigin)

    const [bigCardBtnWidth, bigCardBtnHeight] = [274, 46]
    const [smallCardBtnWidth, smallCardBtnHeight] = [151, 26]

    const cardOnClickHandler = () => {
      
    }
  return (
    <style.CardBoxContainer ratio={ratio} isDefault={isDefault} cardWidth={`${cardWidth}px`} cardHeight={`${cardHeight}px`}>
        {
            !!title ? (
                    <style.CardCategoryContainer ratio={ratio} isDefault={isDefault}>
                        <style.Card1stCategoryText ratio={ratio} isDefault={isDefault}>{category}</style.Card1stCategoryText>
                        <style.Card2ndCategoryText ratio={ratio} isDefault={isDefault}>{title}</style.Card2ndCategoryText>
                        <style.CardDivision ratio={ratio} isDefault={isDefault} />
                        <style.CardBudgetText ratio={ratio} isDefault={isDefault}>매일 {budget}원</style.CardBudgetText>
                    </style.CardCategoryContainer>
                ) : (
                    <style.CardCategoryContainer ratio={ratio} isDefault={isDefault}>
                        <style.Card2ndCategoryText ratio={ratio} isDefault={isDefault} style={{margin: `${1.5 * ratio}em 0 ${0.5 * ratio}em 0`}}>{category}</style.Card2ndCategoryText>
                        <style.CardDivision ratio={ratio} isDefault={isDefault} />
                        <style.CardBudgetText ratio={ratio} isDefault={isDefault}>매일 {budget}원</style.CardBudgetText>                    
                    </style.CardCategoryContainer>
                )
        }
      <style.CardProgressBarContainer ratio={ratio}>
        <ProgressBarSemiCircle ratio={ratio} isDefault={isDefault} spend={spend} budget={budget}/>
      </style.CardProgressBarContainer>
      { (!!isDefault && ratio >= 0.9) 
        ? <style.CardSpendText ratio={ratio} isDefault={isDefault}>{spend}원 사용</style.CardSpendText> 
        : <style.CardSpendText ratio={ratio} isDefault={isDefault} style={{paddingBottom: "0.5em"}}></style.CardSpendText> 
      }
      { (!!isDefault && ratio >= 0.9)
        ? <style.CardBtn ratio={ratio} id={id} isDefault={isDefault} btnWidth={`${bigCardBtnWidth * ratio}px`} btnHeight={`${bigCardBtnHeight * ratio}px`}>{spend > budget ? "혼쭐나러 가기" : "자랑하러 가기"}</style.CardBtn>
        : <style.CardBtn ratio={ratio} id={id} isDefault={isDefault} btnWidth={`${smallCardBtnWidth * (ratio + 0.2)}px`} btnHeight={`${smallCardBtnHeight * (ratio + 0.2)}px`}>{spend > budget ? `${spend-budget}원 초과` : `${budget-spend}원 절약`}</style.CardBtn>}
    </style.CardBoxContainer>
  )
}

export default CardBox
