import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { AutoTextSize } from 'auto-text-size';

import { useGlobalVariables, } from "providers"
import { commaOnThree } from "functions"
import { BoardDetailInput, BoardDetailComment, CashDetailModal, Loader } from "components";
import { layout, style } from "styles";
import { BackArrowGray, bgCloud70, bgDarkCloud, bgSky70, bgDarkSky, bgMountain70, bgDarkMountain, BackArrowWhite, } from "assets";
import { boardAPI } from "api/api";
import * as sVar from "constants/styleVariables";
import { commentBoardLogin } from "constants/comment";

// 영수증 상세에서의 날짜 및 시간 display 함수
//// isDateOnly이면 연-월-일만 출력
//// dateConnector로 연, 월, 일 사이의 연결 문자를 변경
const displayCreatedAt = (dateStr, isDateOnly=true, dateConnector="-") => {
  let [date, time] = dateStr.split("T")
  if (dateConnector !== "-") {
    date = date.split("-").join(dateConnector)
  }
  if (isDateOnly) { 
    return date
  } else {
    time = time.split(".")[0] 
    return `${date} ${time}`
  }
}

// 영수증 번호를 문자로 바꾸는 함수
//// 입력된 숫자를 26진수로 바꾸고 그에 맞는 문자열을 반환
const changeReceiptNumToStr = (num) => {
  const baseChar = ("a").charCodeAt(0);
  let str = '';

  do {
    str = String.fromCharCode(num % 26 + baseChar) + str;
    num = Math.floor(num / 26);
  } while(num > 0);

  // 변환된 문자가 8자 미만이면 랜덤 문자를 채워주기
  while (str.length < 8) {
    const paddingChars = ['R', 'E', 'C', 'I', 'P', 'T'];
    const randomChar = paddingChars[Math.floor(Math.random() * paddingChars.length)];
    str = randomChar + str;
  }

  // 뽑힌 문자 셔플
  str = str.split('');
  for (let i = str.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [str[i], str[j]] = [str[j], str[i]];
  }
  str = str.join('');

  return str.toUpperCase();
}

// function BoardDetail({ isMobile, isBoasting, headerHeight, navHeight, mainHeight }) {
function BoardDetail({ isBoasting }) {
  const { state } = useLocation();
  if (!!state) {
    isBoasting = state.isBoasting;
  }
  // 만들어둔 context 사용하기
  const { windowSize, isMobile, screenWidth, widthRatio } =
    useGlobalVariables();
  // 다른 페이지와 다른 header높이 및 nav 설정 : 53px, 110px
  //// 그로 인한 mainHeight 변경
  const headerHeight = 53
  const navHeight = 110;
  const mainHeight = windowSize.height - (navHeight + headerHeight + 25)

  const { id } = useParams(); // boardid 패러미터 받아오기
  // console.log("받아온 id:::", id);

  const navigate = useNavigate();

  const { data: response, isLoading, isError, } = useQuery(["receipt", id], () => boardAPI.getBoardDetail(id), {
    select: (data) => data.data.data,
  });

  useEffect(() => {
    if (response) {
      // console.log("receipt:::", response);
      // console.log("cashbook:::", response.cashbookDetail);
      // console.log("comments:::", response.comments);
      // console.log("user:::", response.userId);
    }
  }, [response]);

  // 비로그인 시 로그인 유도 Modal
  const [isLoginModal, setIsLoginModal] = useState(false);

  const changeLoginModal = () => {
    const newIsLogin = !isLoginModal;
    setIsLoginModal(newIsLogin);
  };
  const onClickInput = () => {
    navigate("/login");
  };

  // 뒤로 가기
  const onClickBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    <layout.FlexCenterColumn100>
      <div style={{width: `${screenWidth}px`, height: "60%"}}>
        <Loader>데이터 로딩중</Loader>
      </div>
    </layout.FlexCenterColumn100>

    
  }

  if (isError) {
    <div>Error!</div>;
  }


  if (response) {
    return (
      <style.BackgroundPageLayout
        isBoasting={isBoasting}
        screenWidth={`${screenWidth}px`}
        isMobile={isMobile}
        backPngTop={
          isBoasting ? `url(${bgSky70})` : `url(${bgDarkSky})`
        }
        backPngTail={
          isBoasting ? `url(${bgMountain70})` : `url(${bgDarkMountain})`
        }
        backPngMiddle={
          isBoasting
            ? `url(${bgCloud70})`
            : `url(${bgDarkCloud})`
        }
        style={{
          color: isBoasting ? `${sVar.darkGray}` : "#fff"
        }}
      >
        <layout.Header headerHeight={`${headerHeight}px`}>
          <div className="statusBarHeight" style={{ width: "inherit", height: "53px" }}></div>
        </layout.Header>
        <layout.Main ratio={widthRatio} headerHeight={`${headerHeight}px`} mainHeight={`${mainHeight}px`}>
          <layout.MainContent>
            {/* 영수증 */}
            <layout.HeaderContent
            ratio={widthRatio}
            style={{
              position: "relative",
              height: "auto",
              padding: `${25 * widthRatio}px 0`,
              width: "100%",
              backgroundColor: isBoasting? `${sVar.white70}` : null,
            }}
            >
              {
                isBoasting
                ? (
                  <BackArrowGray
                    onClick={onClickBack}
                    style={{ position: "absolute", left: `${10 * widthRatio}px` }}
                  />
                ) : (
                  <BackArrowWhite
                    onClick={onClickBack}
                    style={{ position: "absolute", left: `${10 * widthRatio}px` }}
                  />
                )
              }
                <div style={{ width:"70%", display: "flex", justifyContent:"center", alignItems:"center" }}>
                  <AutoTextSize mode="multiline"
                    minFontSizePx={1}
                    maxFontSizePx={24}>
                    { !!response.boardName
                      && response.boardName
                    }
                  </AutoTextSize>
                </div>
            </layout.HeaderContent>
            <layout.FlexCenterColumn100
              style={{
                backgroundColor: isBoasting? `${sVar.white70}` : null,
              }}
            >
              <style.ReceiptInnerContainer
                isBoasting={isBoasting}
                padding={`${11 * widthRatio}px ${13 * widthRatio}px`}
                fontSize={`${9 * widthRatio}px`}
                style={{ lineHeight: "130%" }}
              >
                <layout.FlexCenterRow100
                  style={{ justifyContent: "space-between" }}
                >
                  <div>영수증 주인</div>
                  <div>{!!response.userId.userNickname && `${response.userId.userNickname}의 영수증`}</div>
                </layout.FlexCenterRow100>
                <layout.FlexCenterRow100
                  style={{ justifyContent: "space-between" }}
                >
                  <div>영수증 번호</div>
                  <div>{!!response.boardId && changeReceiptNumToStr(response.boardId)}</div>
                </layout.FlexCenterRow100>
                <layout.FlexCenterRow100
                  style={{ justifyContent: "space-between" }}
                >
                  <div>벽보 게시일</div>
                  <div>
                    {!!response.boardCreatedAt && displayCreatedAt(response.boardCreatedAt, false)}
                  </div>
                </layout.FlexCenterRow100>
              </style.ReceiptInnerContainer>
              <style.ReceiptInnerContainer isBoasting={isBoasting} padding={`${16 * widthRatio}px`} fontSize={`${20 * widthRatio}px`}>
                {!!response.cashbookDetail.cashbookCreatedAt && displayCreatedAt(response.cashbookDetail.cashbookCreatedAt, true, " / ")}
              </style.ReceiptInnerContainer>
              <style.ReceiptInnerContainer
                isBoasting={isBoasting}
                padding={`${20 * widthRatio}px ${10 * widthRatio}px`}
                fontSize={`${14 * widthRatio}px`}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <div style={{ textAlign: "right" }}>
                  {!!response.cashbookDetail.cashbookCategory &&
                    response.cashbookDetail.cashbookCategory}
                  예산
                </div>
                <div style={{ flex: "1", textAlign: "center" }}>
                  {!!response.cashbookDetail.cashbookName &&
                    response.cashbookDetail.cashbookName}
                </div>
                <div style={{ textAlign: "left" }}>
                  {!!response.cashbookDetail.cashbookGoalValue &&
                    commaOnThree(response.cashbookDetail.cashbookGoalValue)}
                  원
                </div>
              </style.ReceiptInnerContainer>
              <style.ReceiptInnerContainer
                isBoasting={isBoasting}
                padding={`${20 * widthRatio}px ${10 * widthRatio}px`}
                fontSize={`${14 * widthRatio}px`}
              >
                {
                  response.cashbookDetail.cashbookNowValue === null
                  ? (
                    <div>🎉 무지출 데이!! 🎉</div>
                  ) : !!response.cashbookDetail.detail &&
                    response.cashbookDetail.detail.map((purchase) => {
                      return (
                        <layout.FlexCenterRow100
                          style={{ justifyContent: "space-between" }}
                          key={purchase.cashDetailId}
                        >
                          <div>{purchase.cashDetailText}</div>
                          <div>{commaOnThree(purchase.cashDetailValue)}원</div>
                        </layout.FlexCenterRow100>
                      );
                    })
                }

              </style.ReceiptInnerContainer>
              <style.ReceiptInnerContainer
                isBoasting={isBoasting}
                padding={`${20 * widthRatio}px ${10 * widthRatio}px`}
                fontSize={`${14 * widthRatio}px`}
              >
                <layout.FlexCenterRow100
                  style={{ justifyContent: "space-between" }}
                >
                  <div>합계</div>
                  <div>
                    {!!response.cashbookDetail.cashbookNowValue
                      ? commaOnThree(response.cashbookDetail.cashbookNowValue)
                      : response.cashbookDetail.cashbookNowValue === null
                        ? 0
                        : ""
                      }
                    원
                  </div>
                </layout.FlexCenterRow100>
              </style.ReceiptInnerContainer>
              <style.ReceiptInnerContainer
                isBoasting={isBoasting}
                padding={`${20 * widthRatio}px ${10 * widthRatio}px`}
                fontSize={`${14 * widthRatio}px`}
              >
                <layout.FlexCenterRow100
                  style={{ justifyContent: "space-between" }}
                >
                  {/* { console.log("boardType:::", response.boardTypes)} */}
                  <div>{!!response.boardTypes ? "낭비한 금액" : "절약한 금액"}</div>
                  <div>
                    {!!response.cashbookDetail.cashbookGoalValue &&
                      commaOnThree(
                        Math.abs(response.cashbookDetail.cashbookGoalValue -
                          response.cashbookDetail.cashbookNowValue)
                      )}
                    원
                  </div>
                </layout.FlexCenterRow100>
              </style.ReceiptInnerContainer>
            </layout.FlexCenterColumn100>
            {/* 게시글 */}
            <style.ReceiptPostContainer
              isBoasting={isBoasting}
              style={{
                backgroundColor: isBoasting? `${sVar.white70}` : null,
              }}
            >
              <style.ReceiptPost isBoasting={isBoasting} ratio={widthRatio}>
                <style.ReceiptMemoTitle isBoasting={isBoasting} ratio={widthRatio}>메모</style.ReceiptMemoTitle>
                <style.ReceiptMemoContent><pre>{!!response.boardText && response.boardText}</pre></style.ReceiptMemoContent>
              </style.ReceiptPost>
            </style.ReceiptPostContainer>
            {/* 댓글 */}
            <layout.FlexCenterColumn100 style={{ marginTop: "30px" }}>
              <layout.Flex100 style={{ paddingLeft: "8px" }}>
                <div style={{ fontSize: "20px" }}>댓글</div>
                <div style={{ fontSize: "10px", margin: "10px" }}>
                  {!!response.comments.length && response.comments.length}
                  {response.comments.length === 0 && 0}개
                </div>
              </layout.Flex100>
              <layout.FlexCenterColumn100 style={{ gap: "5px" }}>
                {response.comments.length > 0
                  ? response.comments.map((comment) => {
                      // console.log("comment:::", comment);
                      return (
                        <BoardDetailComment
                          boardAuthor={response.userId.userId}
                          commentedBy={comment.userId.userId}
                          boardId={id}
                          isBoasting={isBoasting}
                          key={comment.commentId}
                          id={comment.commentId}
                          userName={comment.userId.userNickname}
                          likeCount={comment.likeCount}
                          likeCheck={comment.likeCheck}
                        >
                          {comment.commentText}
                        </BoardDetailComment>
                      );
                    })
                  : (<style.BoardDetailNoComment isBoasting={isBoasting} ratio={widthRatio}>작성된 댓글이 아직 없다네!</style.BoardDetailNoComment>)
                  }
              </layout.FlexCenterColumn100>
            </layout.FlexCenterColumn100>
          </layout.MainContent>
        </layout.Main>
        {/* 댓글창으로! */}
        <layout.Nav
          navHeight={`${navHeight}px`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0",
          }}
        >
          <BoardDetailInput
            boardId={id}
            userId={response.userId.userId}
            changeLoginModal={changeLoginModal}
          />
        </layout.Nav>
        {isLoginModal && (
          <CashDetailModal
            setClose={changeLoginModal}
            onClickHandler={onClickInput}
          >
            {commentBoardLogin}
          </CashDetailModal>
        )}
        {/* {
          isDeleteModal && (
            <CommentDeleteModal
              setClose={() => setIsDeleteModal(INIT_MODAL_STATE)}
              onClickHandler={onClickDeleteComment}
            >
              {commentBoardDelete}
            </CommentDeleteModal>
          )
        } */}
      </style.BackgroundPageLayout>
    );
  } else {
    return (
      <layout.FlexCenterColumn100>
      <div style={{width: `${screenWidth}px`, height: "60%"}}>
        <Loader>데이터 로딩중</Loader>
      </div>
    </layout.FlexCenterColumn100>
    );
  }
}

export default BoardDetail;
