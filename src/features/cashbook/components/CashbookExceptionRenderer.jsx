import React from 'react';

import { cashbookDummyData } from 'common/constants';
import { bgCloud100, bgMountain100, bgSky100 } from 'assets';

import { layout, style } from 'styles';
import Navigation from 'common/components/Navigation';
import { useGlobalVariables } from 'common/components/provider/GlobalVariableProvider';
// import BlurOverlay from 'common/components/effect/BlurOverlay';
import ScreenBlur from 'common/components/effect/ScreenBlur';
import CashBookCard from './CashBookCard';

function CashbookExceptionRenderer({ comment, addComponent }) {
  const {
    isMobile,
    widthRatio,
    headerHeight,
    navHeight,
    mainHeight,
    screenWidth,
  } = useGlobalVariables();

  const { cashbookDateBox } = useGlobalVariables();
  const dateBoxWidth = cashbookDateBox.width * widthRatio;
  const dateBoxHeight = cashbookDateBox.height * widthRatio;

  return (
    <style.BackgroundPageLayout
      screenWidth={`${screenWidth}px`}
      isMobile={isMobile}
      backPngTop={`url(${bgSky100})`}
      backPngMiddle={`url(${bgCloud100})`}
      backPngTail={`url(${bgMountain100})`}
    >
      <layout.Header
        headerHeight={`${headerHeight}px`}
        style={{ zIndex: '10' }}
      >
        <div
          className="statusBarHeight"
          style={{ width: 'inherit', height: '50px' }}
        ></div>
        <layout.HeaderContent style={{ flexDirection: 'column' }}>
          <layout.FlexCenter100>
            <style.CashBookHeader ratio={widthRatio}>
              가계부
            </style.CashBookHeader>
          </layout.FlexCenter100>
          {/* <layout.Flex100>
            <style.DayPickerWrap
              dateBoxWidth={`${dateBoxWidth}px`}
              dateBoxHeight={`${dateBoxHeight}px`}
              ratio={widthRatio}
            >
              2023-07-25
            </style.DayPickerWrap>
          </layout.Flex100> */}
        </layout.HeaderContent>
      </layout.Header>
      <layout.Main
        headerHeight={`${headerHeight}px`}
        mainHeight={`${mainHeight}px`}
        style={{ position: 'relative' }}
      >
        <ScreenBlur comment={comment} addComponent={addComponent}>
          <layout.MainContent style={{ width: 'inherit' }}>
            <layout.CashBookMainContent className="thisCash">
              <layout.FlexCenterColumn style={{ gap: '20px' }}>
                {cashbookDummyData.map((card, idx) => {
                  return (
                    <CashBookCard
                      key={idx}
                      id={card.cashbookId}
                      budget={card.cashbookGoalValue}
                      spend={card.cashbookNowValue}
                      category={card.cashbookCategory}
                      title={card.cashbookName}
                      ratio={widthRatio}
                      writeCheck={card.writeCheck}
                      isDefault={true}
                    />
                  );
                })}
              </layout.FlexCenterColumn>
            </layout.CashBookMainContent>
          </layout.MainContent>
        </ScreenBlur>
      </layout.Main>
      <layout.Nav navHeight={`${navHeight}px`}>
        <Navigation selected="money" ratio={widthRatio} />
      </layout.Nav>
    </style.BackgroundPageLayout>
  );
}

export default CashbookExceptionRenderer;
