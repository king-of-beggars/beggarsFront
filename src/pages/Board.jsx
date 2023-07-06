import React from "react";
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from "react-query";

import { layout, style } from "styles";
import { Nav, CardBox } from "components";
import { backgroundBrightTop, backgroundDarkTop, backgroundBrightMiddle, backgroundDarkMiddle, backgroundBrightTail, backgroundDarkTail } from 'assets';
import { boardAPI } from 'api/api';
import { useGlobalVariables } from 'components';


// function Board({ isBoasting, setIsBoasting, isMobile, headerHeight, navHeight, mainHeight }) {
function Board({ isBoasting, setIsBoasting }) {
  // 만들어둔 context 사용하기
  const { windowSize, isMobile, headerHeight, navHeight, mainHeight, screenWidth } = useGlobalVariables();
  console.log('Board rendered:', windowSize, isMobile, headerHeight, navHeight, mainHeight, screenWidth)

  // cardRatio
  const CARD_RATIO = 0.6

  // card 크기 결정
  // const cardWidth = 301 * 0.5
  // const cardHeight = 356 * 0.5

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // isBoasting 상태에 따라 get 요청이 변경되어야 하는데 react-query의 쿼리문은 훅 안에서 쓰일 수 없으므로 useQuery의 key를 이용해 문제를 해결한다.
  // useQuery의 key가 변경되면 useQuery는 새로운 데이터를 자동으로 가져오므로, useQuery의 key를 isBoasting 상태와 연동시킨다.
  const queryNode = isBoasting
                    ? { queryKey: ["boastList"], queryFn: boardAPI.getBoastList, select: data => data.data }
                    : { queryKey: ["scoldedList"], queryFn: boardAPI.getScoldedList, select: data => data.data }

  const toggleBtnHandler = () => {
    setIsBoasting(!isBoasting)
  }

  const cardClickHandler = (id) => {
    navigate(`${id}`)
  }
  
  const exceptionRenderer = (responseType) => { // 내용 로딩이 덜 되었을 때 보여줄 렌더러, 응답에 따라 내용을 다르게 설정하기
    return (
      <>
        { /* 아래로 response type에 따른 backRenderer 호출 조건 변경 추가 예정 */ }
        { responseType === "loading" 
          ? <div>loading...</div>
          : <div>error!</div>
        }
      </>
    )
  }

  const { 
    data: cardList,
    isLoading,
    isError
  } = useQuery(queryNode, {
    onSuccess: (res) => {
      console.log("response:::", res)
    },
    isLoading: (res) => {
      console.log("isLoading:::", res)
    },
    isError: (res) => {
      console.log("isError:::", res)
    }
  })

  return (
    <style.BackgroundPageLayout
      screenWidth={`${screenWidth}px`}
      isMobile={isMobile}
      backPngTop={isBoasting ? `url(${backgroundBrightTop})` : `url(${backgroundDarkTop})`}
      backPngTail={isBoasting ? `url(${backgroundBrightTail})` : `url(${backgroundDarkTail})`}
      backPngMiddle={isBoasting ? `url(${backgroundBrightMiddle})` : `url(${backgroundDarkMiddle})`}>
      <layout.Header headerHeight={`${headerHeight}px`}>
        <div className="statusBarHeight" style={{width: "inherit", height: "50px"}}></div>
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
          { !!cardList ? 
            <layout.Grid2Row>
              { console.log("cardList:::", cardList)}
              { cardList.length !== 0 && cardList.map(card => {
                console.log(card)
                return (
                  <CardBox 
                    id={ card.boardId }
                    budget={ card.cashbookId.cashbookGoalValue }
                    spend={ card.cashbookId.cashbookNowValue }
                    category={ card.cashbookId.cashbookCategory }
                    title={ card.cashbookId.cashbookName }
                    ratio={ CARD_RATIO }
                    isDefault= { isBoasting }
                    key={ card.cashbookId.boardId }
                    onClickHandler={ cardClickHandler }
                  />
                )
              })}
            </layout.Grid2Row>
            : isLoading
              ? exceptionRenderer("loading")
              : exceptionRenderer("error")
          }

        </layout.MainContent>
      </layout.Main>
      <layout.Nav navHeight={`${navHeight}px`}>
        <Nav selected="board" />
      </layout.Nav>
    </style.BackgroundPageLayout>
  );
}

export default Board;
