import React, { useState } from "react";

import { layout, style } from "styles";
import { Nav, CardBox } from "components";
import { mainBackgroundTop, mainBackgroundMiddle, mainBackgroundTail, backgroundBrightTop, backgroundDarkTop, backgroundBrightMiddle, backgroundDarkMiddle, backgroundBrightTail, backgroundDarkTail } from 'assets';

const dummies = {
  data: [
    {
      id: 0,
      cashbookCategory: "식비",
      cashbookName: "아침",
      cashbookNowValue: 4000,
      cashbookGoalValue: 8000,
      cashbookOrder: 0,
      date: "2023-06-28"
    },
    {
      id: 1,
      cashbookCategory: "식비",
      cashbookName: "점심",
      cashbookNowValue: 12000,
      cashbookGoalValue: 15000,
      cashbookOrder: 1,
      date: "2023-06-28"
    },
    {
      id: 2,
      cashbookCategory: "식비",
      cashbookName: "저녁",
      cashbookNowValue: 0,
      cashbookGoalValue: 12000,
      cashbookOrder: 2,
      date: "2023-06-29"
      
    },
    {
      id: 3,
      cashbookCategory: "간식비 / 카페",
      cashbookName: "",
      cashbookNowValue: 6000,
      cashbookGoalValue: 5000,
      cashbookOrder: 3,
      date: "2023-06-30"
    },
  ],
};

function Board({ isMobile, headerHeight, navHeight, mainHeight }) {
  // card 크기 결정
  // const cardWidth = 301 * 0.5
  // const cardHeight = 356 * 0.5

  const screenWidth = isMobile ? parseFloat(localStorage.getItem("screenWidth")) : parseFloat(localStorage.getItem("screenWidth")) > 393 ? 393 : parseFloat(localStorage.getItem("screenWidth"));
  const [isBoasting, setIsBoasting] = useState(true)

  const toggleBtnHandler = () => {
    setIsBoasting(!isBoasting)
  }

  return (
    <style.BackgroundPageLayout
      screenWidth={`${screenWidth}px`}
      isMobile={isMobile}
      backPngTop={isBoasting ? `url(${backgroundBrightTop})` : `url(${backgroundDarkTop})`}
      backPngTail={isBoasting ? `url(${backgroundBrightTail})` : `url(${backgroundDarkTail})`}
      backPngMiddle={isBoasting ? `url(${backgroundBrightMiddle})` : `url(${backgroundDarkMiddle})`}>
      <layout.Header headerHeight={`${headerHeight}px`}>
        <layout.HeaderContent>
            { isBoasting
              ? (
                <style.BoardBtnBar>
                  <style.BoardBtnActivate isBoasting={isBoasting}>자랑하기</style.BoardBtnActivate>
                  <style.BoardBtnSleep onClick={toggleBtnHandler} isBoasting={isBoasting}>혼쭐나기</style.BoardBtnSleep>
                </style.BoardBtnBar>
              ) : (
                <style.BoardBtnBar>
                  <style.BoardBtnSleep onClick={toggleBtnHandler} isBoasting={isBoasting}>자랑하기</style.BoardBtnSleep>
                  <style.BoardBtnActivate isBoasting={isBoasting}>혼쭐나기</style.BoardBtnActivate>
                </style.BoardBtnBar>
              )
            }
        </layout.HeaderContent>
      </layout.Header>
      <layout.Main headerHeight={`${headerHeight}px`} mainHeight={`${mainHeight}px`}>
        <layout.MainContent>
          <layout.Grid2Row>
            { console.log(dummies.data)}
            { console.log("isBoasting:::", isBoasting)}
            { dummies.data.map(card => {
              return (
                <CardBox 
                  id={ card.id }
                  budget={ card.cashbookGoalValue }
                  spend={ card.cashbookNowValue }
                  category={ card.cashbookCategory }
                  title={ card.cashbookName }
                  ratio={ 0.6 }
                  isDefault= { isBoasting }
                  key={ card.id }
                />
              )
            })}
          </layout.Grid2Row>
        </layout.MainContent>
      </layout.Main>
      <layout.Nav navHeight={`${navHeight}px`}>
        <Nav selected="board" />
      </layout.Nav>
    </style.BackgroundPageLayout>
  );
}

export default Board;
