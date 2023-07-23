import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { style, layout } from "styles";
import { ProgressBarSemiCircle } from "components";
import { DeleteCard, EditCashbook } from "assets";
import { commaOnThree } from "functions";
import { commentGoBoard } from "constants/comment";
import { useGlobalVariables } from 'providers';

function CashBookCard({ 
  id,
  horizontalSwipe,
  cardData,
  onClickHandler,
  budget,
  spend,
  category,
  title,
  ratio,
  changeWriteModal,
  changeDeleteModal,
  changeDataNoneModal,
  writeCheck,
  isDiffDate = false,
  isDefault = true }) {
  // context 사용
  //// 1. 렌더링을 위한 컨텍스트
  const { isMobile, screenWidth, widthRatio, headerHeight, mainHeight, navHeight } = useGlobalVariables();
  //// 2. 픽셀아트 에셋
  const { cashbookCard, cashbookCardBtn } = useGlobalVariables();
  const cardWidth = cashbookCard.width
  const cardHeight = cashbookCard.height
  const bigCardBtnWidth = cashbookCardBtn.width
  const bigCardBtnHeight = cashbookCardBtn.height
  console.log("cardWidth:::", cardWidth);
  console.log("cardHeight:::", cardHeight);
   // console.log(id, " ::: ", writeCheck)
  //  const [cardWidthOrigin, cardHeightOrigin] = [301, 356];
  //  const [screenWidthOrigin, screenHeightOrigin] = [393, 852];
  //  const cardWidth =
  //    screenWidth > 393
  //      ? cardWidthOrigin * ratio
  //      : (screenWidth / screenWidthOrigin) * cardWidthOrigin * ratio;
  //  console.log("cardWidth:::", cardWidth);
  //  const cardHeight = cardWidth * (cardHeightOrigin / cardWidthOrigin);
 
  // const isBoasting = cardData.cashbookGoalValue - cardData.cashbookNowValue >= 0;
   const isBoasting = budget - spend >= 0;
   // const [isBoasting, setIsBoasting] = useState(budget-spend >= 0)
  //  const [bigCardBtnWidth, bigCardBtnHeight] = [274, 46];
  //  const [smallCardBtnWidth, smallCardBtnHeight] = [151, 26];
 
   const navigate = useNavigate();
 
   // 카드 수정
   const onClickEdit = (event) => {
     event.stopPropagation();
     const sendInfo = {
       category,
       name: title,
     };
     const queryStr = new URLSearchParams(sendInfo).toString();
     navigate(`/cash-book/edit/${id}?${queryStr}`);
   };
 
   // 게시글 이동
   const onClickGoBoard = (event) => {
     event.stopPropagation();
     navigate(`/board/${writeCheck}`, { state: { isBoasting: isBoasting } });
   };

   return (
    <style.CardBoxContainer horizontalSwipe={horizontalSwipe} className="cardBoxContainer" paddingTop="13px" paddingBottom="25px" paddingLeft="13px" paddingRight="13px" id={id} width={`${cardWidth}px`} height={`${cardHeight}px`} ratio={widthRatio} isDefault={true} onClick={() => onClickHandler(id)}>
      { /* delete와 수정 버튼 */ }
      <layout.FlexCenterRow100 style={{ justifyContent: "space-between" }}>
        <DeleteCard
          id={id}
          onClick={changeDeleteModal}
        />
        <EditCashbook
          onClick={onClickEdit}
        />
      </layout.FlexCenterRow100>
        {!!title ? (
         <style.CardCategoryContainer paddingBottom="16.22px" ratio={ratio} isDefault={isDefault}>
           <style.Card1stCategoryText fontSize="14px" paddingLeft="10px" paddingRight="10px" paddingTop="2px" paddingBottom="2px" ratio={ratio} isDefault={isDefault}>
             {category}
           </style.Card1stCategoryText>
           <style.Card2ndCategoryText fontSize="25px" marginBottom="22px" ratio={ratio} isDefault={isDefault}>
             {title}
           </style.Card2ndCategoryText>
           <style.CardDivision marginBottom="16.22px" ratio={ratio} isDefault={isDefault} />
           <style.CardBudgetText ratio={ratio} fontSize="16px" isDefault={isDefault}>
             매일 {commaOnThree(budget)}원
           </style.CardBudgetText>
         </style.CardCategoryContainer>
       ) : (
         <style.CardCategoryContainer paddingTop="24.5px" paddingBottom="16.22px" ratio={ratio} isDefault={isDefault}>
          {/* <div style={{height: `${(14 + 2 + 2) * widthRatio}px`}}></div> */}
          {/* <style.Card1stCategoryText fontSize="14px" paddingLeft="10px" paddingRight="10px" paddingTop="2px" paddingBottom="2px" ratio={ratio} isDefault={isDefault}>
             {category}
          </style.Card1stCategoryText> */}
          <style.Card2ndCategoryText
            fontSize="25px"
            marginBottom="22px"
            ratio={ratio}
            isDefault={isDefault}
            //style={{ margin: `${1.5 * ratio}em 0 ${0.5 * ratio}em 0` }}
           >
             {category}
           </style.Card2ndCategoryText>
           <style.CardDivision  marginBottom="16.22px" ratio={ratio} isDefault={isDefault} />
           <style.CardBudgetText fontSize="16px" ratio={ratio} isDefault={isDefault}>
             매일 {commaOnThree(budget)}원
           </style.CardBudgetText>
         </style.CardCategoryContainer>
       )}
        <style.CardProgressBarContainer width="161px" height="80.5px" ratio={ratio}>
          <ProgressBarSemiCircle
            ratio={ratio}
            isDefault={isDefault}
            spend={spend}
            budget={budget}
            fontSize="36.485px"
          />
        </style.CardProgressBarContainer>
        <style.CardSpendText fontSize="20px" ratio={ratio} isDefault={isDefault}>
          {spend === null ? "무지출 데이!!" : commaOnThree(spend) + "원 사용"}
        </style.CardSpendText>
        <style.CardBtn
            ratio={ratio}
            id={id}
            isDefault={isDefault}
            isWrite={writeCheck === 0 ? false : true}
            btnWidth={`${bigCardBtnWidth}px`}
            btnHeight={`${bigCardBtnHeight}px`}
            onClick={writeCheck === 0
                      ? spend === 0
                        ? changeDataNoneModal
                        : changeWriteModal
                      : onClickGoBoard}
            disabled={isDiffDate}
          >
            {writeCheck === 0
              ? spend > budget
                  ? "혼쭐나러 가기"
                  : "자랑하러 가기"
              : commentGoBoard}
          </style.CardBtn>
    </style.CardBoxContainer>
   )
 
  //  return (
  //    <style.CardBoxContainer
  //      id={id}
  //      onClick={() => onClickHandler(id)}
  //      ratio={ratio}
  //      isDefault={isDefault}
  //      cardWidth={`${cardWidth}px`}
  //      cardHeight={`${cardHeight}px`}
  //    >
  //      {writeCheck === undefined ? (
  //        <></>
  //      ) : (
  //        <layout.FlexCenterRow100 style={{ justifyContent: "space-between" }}>
  //          <div>
  //            <DeleteCard
  //              id={id}
  //              onClick={changeDeleteModal}
  //            />
  //          </div>
  //          <div>
  //            <EditCashbook
  //              onClick={onClickEdit}
  //            />
  //          </div>
  //        </layout.FlexCenterRow100>
  //      )}
 
  //      {!!title ? (
  //        <style.CardCategoryContainer ratio={ratio} isDefault={isDefault}>
  //          <style.Card1stCategoryText ratio={ratio} isDefault={isDefault}>
  //            {category}
  //          </style.Card1stCategoryText>
  //          <style.Card2ndCategoryText ratio={ratio} isDefault={isDefault}>
  //            {title}
  //          </style.Card2ndCategoryText>
  //          <style.CardDivision ratio={ratio} isDefault={isDefault} />
  //          <style.CardBudgetText ratio={ratio} isDefault={isDefault}>
  //            매일 {commaOnThree(budget)}원
  //          </style.CardBudgetText>
  //        </style.CardCategoryContainer>
  //      ) : (
  //        <style.CardCategoryContainer ratio={ratio} isDefault={isDefault}>
  //          <style.Card2ndCategoryText
  //            ratio={ratio}
  //            isDefault={isDefault}
  //            style={{ margin: `${1.5 * ratio}em 0 ${0.5 * ratio}em 0` }}
  //          >
  //            {category}
  //          </style.Card2ndCategoryText>
  //          <style.CardDivision ratio={ratio} isDefault={isDefault} />
  //          <style.CardBudgetText ratio={ratio} isDefault={isDefault}>
  //            매일 {commaOnThree(budget)}원
  //          </style.CardBudgetText>
  //        </style.CardCategoryContainer>
  //      )}
  //      <style.CardProgressBarContainer ratio={ratio}>
  //        <ProgressBarSemiCircle
  //          ratio={ratio}
  //          isDefault={isDefault}
  //          spend={spend}
  //          budget={budget}
  //        />
  //      </style.CardProgressBarContainer>
  //      {!!isDefault && ratio >= 0.9 ? (
  //        <style.CardSpendText ratio={ratio} isDefault={isDefault}>
  //          {spend === null ? "무지출 데이!!" : commaOnThree(spend) + "원 사용"}
  //        </style.CardSpendText>
  //      ) : (
  //        <style.CardSpendText
  //          ratio={ratio}
  //          isDefault={isDefault}
  //          style={{ paddingBottom: "0.5em" }}
  //        ></style.CardSpendText>
  //      )}
  //        <style.CardBtn
  //          ratio={ratio}
  //          id={id}
  //          isDefault={isDefault}
  //          isWrite={writeCheck === 0 ? false : true}
  //          btnWidth={`${bigCardBtnWidth * ratio}px`}
  //          btnHeight={`${bigCardBtnHeight * ratio}px`}
  //          onClick={writeCheck === 0 ? spend === 0 ? changeDataNoneModal:changeWriteModal : onClickGoBoard}
  //          // disabled={(spend === 0) | isDiffDate}
  //        >
  //          {writeCheck === 0
  //            ? spend > budget
  //              ? "혼쭐나러 가기"
  //              : "자랑하러 가기"
  //            : commentGoBoard}
  //        </style.CardBtn>
  //    </style.CardBoxContainer>
  //  );
 }

export default CashBookCard