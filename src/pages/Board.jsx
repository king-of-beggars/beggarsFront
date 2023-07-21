import React from "react";
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from "react-query";

import { useGlobalVariables } from "providers"
import { layout, style } from "styles";
import { Nav, BoardCard } from "components";
import { background70Top, backgroundDarkTop, background70Middle, backgroundDarkMiddle, background70Tail, backgroundDarkTail } from 'assets';
import { boardAPI } from 'api/api';


function Board({ isBoasting, setIsBoasting }) {
  // 만들어둔 context 사용하기
  //// 1. 화면 비율 렌더링에 필요한 요소
  const { isMobile, widthRatio, headerHeight, navHeight, mainHeight, screenWidth } = useGlobalVariables();
  //// 2. 픽셀아트 적용 에셋
  const { boardBtnBar, boardBtnActivate, boardBtnSleep, boardCard } = useGlobalVariables();
  console.log('Board rendered:',isMobile, headerHeight, navHeight, mainHeight, screenWidth)

  const navigate = useNavigate();

  // isBoasting 상태에 따라 get 요청이 변경되어야 하는데 react-query의 쿼리문은 훅 안에서 쓰일 수 없으므로 useQuery의 key를 이용해 문제를 해결한다.
  // useQuery의 key가 변경되면 useQuery는 새로운 데이터를 자동으로 가져오므로, useQuery의 key를 isBoasting 상태와 연동시킨다.
  const queryNode = isBoasting
                    ? { queryKey: ["boastList"], queryFn: boardAPI.getBoastList, select: data => data.data.data }
                    : { queryKey: ["scoldedList"], queryFn: boardAPI.getScoldedList, select: data => data.data.data }

  const toggleBtnHandler = () => {
    setTimeout(() => {
      setIsBoasting(!isBoasting);
    }, 500); // 전환시 0.5초의 딜레이
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
      backPngTop={isBoasting ? `url(${background70Top})` : `url(${backgroundDarkTop})`}
      backPngTail={isBoasting ? `url(${background70Tail})` : `url(${backgroundDarkTail})`}
      backPngMiddle={isBoasting ? `url(${background70Middle})` : `url(${backgroundDarkMiddle})`}>
      <layout.Header headerHeight={`${headerHeight}px`}>
        <div className="statusBarHeight" style={{width: "inherit", height: "50px"}}></div>
        <layout.HeaderContent>
            { isBoasting
              ? (
                <style.BoardBtnBar width={`${boardBtnBar.width}px`} height={`${boardBtnBar.height}px`} ratio={widthRatio}>
                  <style.BoardBtnActivate width={`${boardBtnActivate.width}px`} height={`${boardBtnActivate.height}px`} ratio={widthRatio} isBoasting={isBoasting}>자랑하기</style.BoardBtnActivate>
                  <style.BoardBtnSleep width={`${boardBtnSleep.width}px`} height={`${boardBtnSleep.height}px`} ratio={widthRatio} onClick={toggleBtnHandler} isBoasting={isBoasting}>혼쭐나기</style.BoardBtnSleep>
                </style.BoardBtnBar>
              ) : (
                <style.BoardBtnBar width={`${boardBtnBar.width}px`} height={`${boardBtnBar.height}px`} ratio={widthRatio}>
                  <style.BoardBtnSleep width={`${boardBtnSleep.width}px`} height={`${boardBtnSleep.height}px`} ratio={widthRatio} onClick={toggleBtnHandler} isBoasting={isBoasting}>자랑하기</style.BoardBtnSleep>
                  <style.BoardBtnActivate width={`${boardBtnActivate.width}px`} height={`${boardBtnActivate.height}px`} ratio={widthRatio} isBoasting={isBoasting}>혼쭐나기</style.BoardBtnActivate>
                </style.BoardBtnBar>
              )
            }
        </layout.HeaderContent>
      </layout.Header>
      <layout.Main headerHeight={`${headerHeight}px`} mainHeight={`${mainHeight}px`}>
        <layout.MainContent>
          { !!cardList ? 
            <layout.Grid2Row ratio={widthRatio}>
              { console.log("cardList.boards:::", cardList.boards)}
              { console.log("boarCard.width:::", boardCard.width)}
              { cardList.boards.length > 0 && cardList.boards.map(card => {
                return (
                  <BoardCard 
                    id={ card.boardId }
                    isDefault={ !card.boardTypes}
                    cardData={card}
                    budget={ card.cashbookId.cashbookGoalValue }
                    spend={ card.cashbookId.cashbookNowValue }
                    category={ card.cashbookId.cashbookCategory }
                    title={ card.cashbookId.cashbookName }
                    key={ card.boardId }
                    onClickHandler={ cardClickHandler }
                  />
                )
                // return (
                //   <CardBox 
                //     id={ card.boardId }
                //     width={`${boardCard.width}px`}
                //     height={`${boardCard.height}px`}
                //     ratio={ widthRatio * 0.5 }
                //     budget={ card.cashbookId.cashbookGoalValue }
                //     spend={ card.cashbookId.cashbookNowValue }
                //     category={ card.cashbookId.cashbookCategory }
                //     title={ card.cashbookId.cashbookName }
                //     isDefault= { isBoasting }
                //     key={ card.boardId }
                //     onClickHandler={ cardClickHandler }
                //   />
                // )
              })}
            </layout.Grid2Row>
            : isLoading
              ? exceptionRenderer("loading")
              : exceptionRenderer("error")
          }

        </layout.MainContent>
      </layout.Main>
      <layout.Nav navHeight={`${navHeight}px`}>
        <Nav selected="board" ratio={widthRatio}/>
      </layout.Nav>
    </style.BackgroundPageLayout>
  );
}

export default Board;
