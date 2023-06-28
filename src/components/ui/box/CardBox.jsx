import React from 'react'
import { style, layout } from "styles"

function CardBox({id, budget, spend, category, title, screenWidth, ratio, isDefault=true}) {
    const [cardWidthOrigin, cardHeightOrigin] = [301, 356]
    const [screenWidthOrigin, screenHeightOrigin] = [393, 852]
    const cardWidth = ((screenWidth / screenWidthOrigin) * cardWidthOrigin) * ratio
    const cardHeight = cardWidth * (cardHeightOrigin / cardWidthOrigin)
  return (
    <style.CardBoxContainer cardWidth={cardWidth} cardHeight={cardHeight}>
        {
            !!title ? (
                    <style.CardCategoryContainer lineColor={lineColor}>
                        <style.FirstCategoryText>{category}</style.FirstCategoryText>
                        <style.SecondCategoryText>{title}</style.SecondCategoryText>
                    </style.CardCategoryContainer>
                ) : (
                    <style.CardCategoryContainer lineColor={lineColor}>
                    <style.SecondCategoryText style={{margin: "1.5em 0 0.5em 0"}}>{category}</style.SecondCategoryText>
                    </style.CardCategoryContainer>
                ) 
        }
    </style.CardBoxContainer>
  )
}

export default CardBox