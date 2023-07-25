import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";

import { useGlobalVariables } from "providers";
import { layout, style } from "styles";
import { Nav, BoardCard } from "components";
import {
  bgSky50,
  bgDarkSky,
  bgCloud50,
  bgDarkCloud,
  bgMountain50,
  bgDarkMountain,
} from "assets";
import { boardAPI } from "api/api";
import InfiniteScroll from "react-infinite-scroller";
import { useInView } from "react-intersection-observer";

function Board({ isBoasting, setIsBoasting }) {
  
  const INIT_PAGE_STATE = { boast: 1, scoled: 1 }
  // 만들어둔 context 사용하기
  //// 1. 화면 비율 렌더링에 필요한 요소
  const {
    isMobile,
    widthRatio,
    headerHeight,
    navHeight,
    mainHeight,
    screenWidth,
  } = useGlobalVariables();
  //// 2. 픽셀아트 적용 에셋
  const { boardBtnBar, boardBtnActivate, boardBtnSleep, boardCard } =
    useGlobalVariables();
  // console.log(
  //   "Board rendered:",
  //   isMobile,
  //   headerHeight,
  //   navHeight,
  //   mainHeight,
  //   screenWidth
  // );

  const navigate = useNavigate();

  // isBoasting 상태에 따라 get 요청이 변경되어야 하는데 react-query의 쿼리문은 훅 안에서 쓰일 수 없으므로 useQuery의 key를 이용해 문제를 해결한다.
  // useQuery의 key가 변경되면 useQuery는 새로운 데이터를 자동으로 가져오므로, useQuery의 key를 isBoasting 상태와 연동시킨다.
  const queryNode = isBoasting
    ? {
        queryKey: ["boastList"],
        queryFn: () => boardAPI.getBoastList(page.boast),
      }
    : {
        queryKey: ["scoldedList"],
        queryFn: () => boardAPI.getScoldedList(page.scoled),
      };

  const toggleBtnHandler = () => {
    setTimeout(() => {
      setIsBoasting(!isBoasting);
      setPage(INIT_PAGE_STATE);
    }, 500); // 전환시 0.5초의 딜레이
  };

  const cardClickHandler = (id) => {
    navigate(`${id}`);
  };

  const exceptionRenderer = (responseType) => {
    // 내용 로딩이 덜 되었을 때 보여줄 렌더러, 응답에 따라 내용을 다르게 설정하기
    return (
      <>
        {/* 아래로 response type에 따른 backRenderer 호출 조건 변경 추가 예정 */}
        {responseType === "loading" ? <div>loading...</div> : <div>error!</div>}
      </>
    );
  };

  // const {
  //   data: cardList,
  //   isLoading,
  //   isError
  // } = useQuery(queryNode, {
  //   onSuccess: (res) => {
  //     console.log("response:::", res)
  //   },
  //   isLoading: (res) => {
  //     console.log("isLoading:::", res)
  //   },
  //   isError: (res) => {
  //     console.log("isError:::", res)
  //   }
  // })

  const [page, setPage] = useState(INIT_PAGE_STATE);

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    {
      ...queryNode,
      getNextPageParam: (lastPage, pages) => {
        // console.log("param-lastPage:::", lastPage);
        // console.log("param-pages:::", pages)
        const lastPageData = lastPage.data.data;
        return lastPageData.hasNextPage ? page : undefined
      },
      onSuccess: () => {
        const name = isBoasting ? "boast" : "scoled"
        const newPage = {
          ...page,
          [name] : page[name] + 1
        }
        // console.log("new page:::", newPage)
        setPage(newPage);
      }
    },
  );

  // const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status, } = useInfiniteQuery('infiniteScroll', queryNode, {
  //     getNextPageParam: (lastPage, pages) => {
  //       if (lastPage.data.data.boards.length === 0) {
  //         return undefined
  //       } else {
  //         return pages.length + 1
  //       }
  //     },
  // });

  const {ref, inView} = useInView({ threshold: 0 });
  // console.log("ref:::", ref)
  console.log("isView:::", inView)

  useEffect(() => {
    // 맨 마지막 요소를 보고있고 더이상 페이지가 존재하면
    // 다음 페이지 데이터를 가져옴
    console.log("다니 isView :::", inView);
    // console.log("다니 hasNextPage :::", hasNextPage);
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  console.log("다니 data :::", data);
  // console.log("다니 page :::", page);
  return (
    <style.BackgroundPageLayout
      screenWidth={`${screenWidth}px`}
      isMobile={isMobile}
      backPngTop={
        isBoasting ? `url(${bgSky50})` : `url(${bgDarkSky})`
      }
      backPngTail={
        isBoasting ? `url(${bgMountain50})` : `url(${bgDarkMountain})`
      }
      backPngMiddle={
        isBoasting
          ? `url(${bgCloud50})`
          : `url(${bgDarkCloud})`
      }
    >
      <layout.Header headerHeight={`${headerHeight}px`}>
        <div
          className="statusBarHeight"
          style={{ width: "inherit", height: "50px" }}
        ></div>
        <layout.HeaderContent>
          {isBoasting ? (
            <style.BoardBtnBar
              width={`${boardBtnBar.width}px`}
              height={`${boardBtnBar.height}px`}
              ratio={widthRatio}
            >
              <style.BoardBtnActivate
                width={`${boardBtnActivate.width}px`}
                height={`${boardBtnActivate.height}px`}
                ratio={widthRatio}
                isBoasting={isBoasting}
              >
                자랑하기
              </style.BoardBtnActivate>
              <style.BoardBtnSleep
                width={`${boardBtnSleep.width}px`}
                height={`${boardBtnSleep.height}px`}
                ratio={widthRatio}
                onClick={toggleBtnHandler}
                isBoasting={isBoasting}
              >
                혼쭐나기
              </style.BoardBtnSleep>
            </style.BoardBtnBar>
          ) : (
            <style.BoardBtnBar
              width={`${boardBtnBar.width}px`}
              height={`${boardBtnBar.height}px`}
              ratio={widthRatio}
            >
              <style.BoardBtnSleep
                width={`${boardBtnSleep.width}px`}
                height={`${boardBtnSleep.height}px`}
                ratio={widthRatio}
                onClick={toggleBtnHandler}
                isBoasting={isBoasting}
              >
                자랑하기
              </style.BoardBtnSleep>
              <style.BoardBtnActivate
                width={`${boardBtnActivate.width}px`}
                height={`${boardBtnActivate.height}px`}
                ratio={widthRatio}
                isBoasting={isBoasting}
              >
                혼쭐나기
              </style.BoardBtnActivate>
            </style.BoardBtnBar>
          )}
        </layout.HeaderContent>
      </layout.Header>
      <layout.Main
        headerHeight={`${headerHeight}px`}
        mainHeight={`${mainHeight}px`}
      >
        <layout.MainContent>
          {/* <InfiniteScroll
            hasMore={hasNextPage}
            loadMore={() => fetchNextPage()}
          > */}
          {!!data ? (
            <layout.Grid2Row ratio={widthRatio}>
              {/* { console.log("cardList.boards:::", cardList.boards)} */}
              {/* {console.log("boarCard.width:::", boardCard.width)} */}
              {data.pages.map((pageList, pageNum) => {
                const cardList = pageList.data.data;
                return (
                  cardList.boards.length > 0 &&
                  cardList.boards.map((card, cardIdx) => {
                    // 마지막 요소에 ref 달아주기
                    if (
                      data.pages.length - 1 === pageNum &&
                      cardList.length - 1 === cardIdx
                    ) {
                      return (
                        <BoardCard
                          id={card.boardId}
                          isDefault={!card.boardTypes}
                          cardData={card}
                          budget={card.cashbookId.cashbookGoalValue}
                          spend={card.cashbookId.cashbookNowValue}
                          category={card.cashbookId.cashbookCategory}
                          title={card.cashbookId.cashbookName}
                          key={card.boardId}
                          onClickHandler={cardClickHandler}
                          ref={ref}
                        />
                      );
                    }
                    return (
                      <BoardCard
                        id={card.boardId}
                        isDefault={!card.boardTypes}
                        cardData={card}
                        budget={card.cashbookId.cashbookGoalValue}
                        spend={card.cashbookId.cashbookNowValue}
                        category={card.cashbookId.cashbookCategory}
                        title={card.cashbookId.cashbookName}
                        key={card.boardId}
                        onClickHandler={cardClickHandler}
                      />
                    );
                  })
                );
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
              <div className="here" ref={ref} />
            </layout.Grid2Row>
          ) : isLoading ? (
            exceptionRenderer("loading")
          ) : (
            exceptionRenderer("error")
          )}
          {/* </InfiniteScroll> */}
        </layout.MainContent>
      </layout.Main>
      <layout.Nav navHeight={`${navHeight}px`}>
        <Nav selected="board" ratio={widthRatio} />
      </layout.Nav>
    </style.BackgroundPageLayout>
  );
}

export default Board;
