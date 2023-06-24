import React, { useState, useEffect } from "react";
import { layout, style } from "styles";
import * as sVar from "constants/styleVariables";
import { GoCardDetails } from 'assets';
import { cashbookCardYellow } from 'assets';

function CashBookCard({ id, budget, spend, category, title }) {
  const isMobile = sessionStorage.getItem("isMobile") === "true"
  const getCardSize = (screenWidth) => {
    const partial = screenWidth * 0.9
    const cardRatio = 356 / 301
    const cardWidth = isMobile && screenWidth < 500 ? partial * 356 / 393 : (500 * 0.9) * 356 / 393
    const cardHeight = cardWidth * cardRatio
    return { cardWidth, cardHeight }
  }
  
  const [screenWidth, setScreenWidth] = useState(parseFloat(sessionStorage.getItem("screenWidth")))
  const [cardWidth, setCardWidth] = useState(0)
  const [cardHeight, setCardHeight] = useState(0)
  const [margin, setMargin] = useState(0)

  const handleResize = () => {
    setScreenWidth(window.innerWidth)
  }

  const updateCardSize = () => {
    const { cardWidth, cardHeight } = getCardSize(screenWidth)
    setCardWidth(cardWidth)
    setCardHeight(cardHeight)
  }

  const updateMargin = () => {
    setMargin(screenWidth * 0.1)
  }
  
  useEffect(() => {
    window.addEventListener("resize", handleResize)

    setMargin()
    updateCardSize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    setMargin()
    updateCardSize()
  }, [screenWidth])

  
  console.log("screenWidth:::", screenWidth)
  console.log("cardWidth:::", cardWidth)
  console.log("cardHeight:::", cardHeight)
  return (
    <layout.FlexCenterColumn100 style={{zIndex: "0", backgroundImage: `url(${cashbookCardYellow})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", width: `${cardWidth}px`, height: `${cardHeight}px`, marginBottom: "20px"}}>
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
