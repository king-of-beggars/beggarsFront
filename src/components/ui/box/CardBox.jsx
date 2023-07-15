import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { style, layout } from "styles";
import { ProgressBarSemiCircle } from "components";
import { DeleteCard, EditCashbook } from "assets";
import { commaOnThree } from "functions";
import { commentGoBoard } from "constants/comment";

function CardBox({
  id,
  onClickHandler,
  budget,
  spend,
  category,
  title,
  screenWidth,
  ratio,
  changeWriteModal,
  changeDeleteModal,
  writeCheck,
  isDefault = true,
}) {
  // console.log(id, " ::: ", writeCheck)
  const [cardWidthOrigin, cardHeightOrigin] = [301, 356];
  const [screenWidthOrigin, screenHeightOrigin] = [393, 852];
  const cardWidth =
    screenWidth > 393
      ? cardWidthOrigin * ratio
      : (screenWidth / screenWidthOrigin) * cardWidthOrigin * ratio;
  console.log("cardWidth:::", cardWidth);
  const cardHeight = cardWidth * (cardHeightOrigin / cardWidthOrigin);

  const isBoasting = budget - spend >= 0;
  // const [isBoasting, setIsBoasting] = useState(budget-spend >= 0)
  const [bigCardBtnWidth, bigCardBtnHeight] = [274, 46];
  const [smallCardBtnWidth, smallCardBtnHeight] = [151, 26];

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
    <style.CardBoxContainer
      id={id}
      onClick={() => onClickHandler(id)}
      ratio={ratio}
      isDefault={isDefault}
      cardWidth={`${cardWidth}px`}
      cardHeight={`${cardHeight}px`}
    >
      <DeleteCard
        id={id}
        style={{ position: "absolute", left: "1em", top: "1em" }}
        onClick={changeDeleteModal}
        visibility={writeCheck===undefined ? "hidden" : "visible"}
      />
      <EditCashbook
        onClick={onClickEdit}
        style={{ position: "absolute", right: "2.5em", top: "1em" }}
        visibility={writeCheck===undefined ? "hidden" : "visible"}
      />
      {!!title ? (
        <style.CardCategoryContainer ratio={ratio} isDefault={isDefault}>
          <style.Card1stCategoryText ratio={ratio} isDefault={isDefault}>
            {category}
          </style.Card1stCategoryText>
          <style.Card2ndCategoryText ratio={ratio} isDefault={isDefault}>
            {title}
          </style.Card2ndCategoryText>
          <style.CardDivision ratio={ratio} isDefault={isDefault} />
          <style.CardBudgetText ratio={ratio} isDefault={isDefault}>
            매일 {commaOnThree(budget)}원
          </style.CardBudgetText>
        </style.CardCategoryContainer>
      ) : (
        <style.CardCategoryContainer ratio={ratio} isDefault={isDefault}>
          <style.Card2ndCategoryText
            ratio={ratio}
            isDefault={isDefault}
            style={{ margin: `${1.5 * ratio}em 0 ${0.5 * ratio}em 0` }}
          >
            {category}
          </style.Card2ndCategoryText>
          <style.CardDivision ratio={ratio} isDefault={isDefault} />
          <style.CardBudgetText ratio={ratio} isDefault={isDefault}>
            매일 {commaOnThree(budget)}원
          </style.CardBudgetText>
        </style.CardCategoryContainer>
      )}
      <style.CardProgressBarContainer ratio={ratio}>
        <ProgressBarSemiCircle
          ratio={ratio}
          isDefault={isDefault}
          spend={spend}
          budget={budget}
        />
      </style.CardProgressBarContainer>
      {!!isDefault && ratio >= 0.9 ? (
        <style.CardSpendText ratio={ratio} isDefault={isDefault}>
          {spend === null ? "무지출 데이!!" : commaOnThree(spend) + "원 사용"}
        </style.CardSpendText>
      ) : (
        <style.CardSpendText
          ratio={ratio}
          isDefault={isDefault}
          style={{ paddingBottom: "0.5em" }}
        ></style.CardSpendText>
      )}
      {!!isDefault && ratio >= 0.9 ? (
        <style.CardBtn
          ratio={ratio}
          id={id}
          isDefault={isDefault}
          isWrite={writeCheck === 0 ? false : true}
          btnWidth={`${bigCardBtnWidth * ratio}px`}
          btnHeight={`${bigCardBtnHeight * ratio}px`}
          onClick={writeCheck === 0 ? changeWriteModal : onClickGoBoard}
          disabled={spend === 0}
        >
          {writeCheck === 0
            ? spend > budget
              ? "혼쭐나러 가기"
              : "자랑하러 가기"
            : commentGoBoard}
        </style.CardBtn>
      ) : (
        <style.CardBtn
          ratio={ratio}
          id={id}
          isDefault={isDefault}
          btnWidth={`${smallCardBtnWidth * (ratio + 0.2)}px`}
          btnHeight={`${smallCardBtnHeight * (ratio + 0.2)}px`}
        >
          {isBoasting ? `${budget - spend}원 절약` : `${spend - budget}원 초과`}
        </style.CardBtn>
      )}
    </style.CardBoxContainer>
  );
}

export default CardBox;
