import "styles/css/progressBar.css"
import React from 'react'
import { useNavigate } from 'react-router-dom';

import { useGlobalVariables } from 'providers';
import { commaOnThree } from 'functions';
import { CashbookBtn } from 'styles/styled-components/styles';
import { ProgressBarSemiCircle } from 'components';
import { style, layout } from "styles"
import * as sVar from "constants/styleVariables";;

const getDisplayDate = (dateStr) => dateStr.split("T")[0].slice(2).split("-").join("/");
const getDisplayBoardName = (boardNameStr) => boardNameStr.length > 7 ? boardNameStr.slice(0, 7) + "..." : boardNameStr;


// function BoardCard({id, onClickHandler, isDefault, cardData, writeCheck }) {
const BoardCard = React.forwardRef(({id, onClickHandler, isDefault, cardData, writeCheck}, ref) => {
  const { boardCard, widthRatio } = useGlobalVariables();
  const ratio = widthRatio * 0.96
  const cardWidth = boardCard.width * ratio
  const cardHeight = boardCard.height * ratio

  // const isBoasting = budget - spend >= 0;
  // const [isBoasting, setIsBoasting] = useState(budget-spend >= 0)

  const navigate = useNavigate();

  // 카드 수정
  // const onClickEdit = (event) => {
  //   event.stopPropagation();
  //   const sendInfo = {
  //     category,
  //     name: title,
  //   };
  //   const queryStr = new URLSearchParams(sendInfo).toString();
  //   navigate(`/cash-book/edit/${id}?${queryStr}`);
  // };

  // 게시글 이동
  // const onClickGoBoard = (event) => {
  //   event.stopPropagation();
  //   navigate(`/board/${writeCheck}`, { state: { isBoasting: isDefault } });
  // };

  return (
    <style.CardBoxContainer
      id={id}
      onClick={() => onClickHandler(id)}
      ratio={ratio}
      isDefault={isDefault}
      cardWidth={`${cardWidth}px`}
      cardHeight={`${cardHeight}px`}
      paddingLeft="7.67px"
      paddingRight="7.67px"
      paddingTop="18.64px"
      paddingBottom="19.6px"
    >
      <style.CardCategoryContainer ratio={ratio} paddingBottom="8.89px" isDefault={isDefault}>
        <style.Card1stCategoryText fontSize="7.674px" paddingTop="1.1px" paddingBottom="1.1px" paddingLeft="5.5px" paddingRight="5.5px" ratio={ratio} isDefault={isDefault}>
          {getDisplayDate(cardData.boardCreatedAt)}
        </style.Card1stCategoryText>
        <style.Card2ndCategoryText ratio={ratio} fontSize="13.704px" marginBottom="12px" isDefault={isDefault}>
          {cardData.userId.userNickname}
        </style.Card2ndCategoryText>
        <style.CardDivision marginBottom="8.89px" ratio={ratio} isDefault={isDefault} />
        <style.CardBudgetText fontSize="12px" ratio={ratio} isDefault={isDefault}>
          {getDisplayBoardName(cardData.boardName)}
        </style.CardBudgetText>
      </style.CardCategoryContainer>

      <style.CardProgressBarContainer width="88px" height="45px" ratio={ratio}>
        <ProgressBarSemiCircle
          ratio={ratio}
          fontSize="20px"
          isDefault={isDefault}
          spend={cardData.cashbookId.cashbookNowValue}
          budget={cardData.cashbookId.cashbookGoalValue}
        />
      </style.CardProgressBarContainer>
      <style.CardSpendText fontSize="12px" ratio={ratio} isDefault={isDefault}>
        {isDefault
          ? cardData.cashbookId.cashbookNowValue === null
            ? "무지출 데이!!"
            : commaOnThree(cardData.cashbookId.cashbookNowValue) + "원 절약"
          : `${commaOnThree(cardData.cashbookId.cashbookNowValue - cardData.cashbookId.cashbookGoalValue)}원 낭비`}
      </style.CardSpendText>
    </style.CardBoxContainer>
  );
// }
})

export default BoardCard