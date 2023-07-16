import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { useGlobalVariables } from "providers"
import {
  BoardDetailInput,
  BoardDetailComment,
  CashDetailModal,
} from "components";
import { layout, style } from "styles";
import {
  BackArrowGray,
  backgroundDarkTop,
  backgroundDarkMiddle,
  backgroundDarkTail,
  background50Top,
  background50Middle,
  background50Tail,
} from "assets";
import { boardAPI } from "api/api";
import * as sVar from "constants/styleVariables";
import { commentBoardLogin } from "constants/comment";

// function BoardDetail({ isMobile, isBoasting, headerHeight, navHeight, mainHeight }) {
function BoardDetail({ isBoasting }) {
  const { state } = useLocation();
  if (!!state) {
    isBoasting = state.isBoasting;
  }
  // 만들어둔 context 사용하기
  const { windowSize, isMobile, headerHeight, screenWidth } =
    useGlobalVariables();
  console.log(
    "BoardDetail rendered:",
    windowSize,
    isMobile,
    headerHeight,
    screenWidth
  );

  const navHeight = 110;
  const mainHeight = windowSize.height - (navHeight + headerHeight);

  const { id } = useParams(); // boardid 패러미터 받아오기
  // console.log("받아온 id:::", id);

  // const screenWidth = isMobile
  //   ? parseFloat(localStorage.getItem("screenWidth"))
  //   : parseFloat(localStorage.getItem("screenWidth")) > 393
  //   ? 393
  //   : parseFloat(localStorage.getItem("screenWidth"));
  const navigate = useNavigate();

  // let DATA_CASHBOOK;
  // let DATA_COMMENTS;
  // let DATA_USER;

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery(["receipt", id], () => boardAPI.getBoardDetail(id), {
    select: (data) => data.data.data,
    // onSuccess: (res) => {
    //   console.log("getRes:::", res);
    //   DATA_CASHBOOK = res.cashbookDetail;
    //   DATA_COMMENTS = res.comments;
    //   DATA_USER = res.userId;
    //   console.log("receipt:::", res);
    //   console.log("cashbook:::", DATA_CASHBOOK);
    //   console.log("comments:::", DATA_COMMENTS);
    //   console.log("user:::", DATA_USER);
    // },
  });

  useEffect(() => {
    if (response) {
      console.log("receipt:::", response);
      console.log("cashbook:::", response.cashbookDetail);
      console.log("comments:::", response.comments);
      console.log("user:::", response.userId);
    }
  }, [response]);

  // 비로그인 시 로그인 유도 Modal
  const [isLoginModal, setIsLoginModal] = useState(false);

  const changeLoginModal = () => {
    alert("ho");
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

  // 숫자 콤마 표시
  const digit3Comma = (digit) => {
    return digit.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };

  if (isLoading) {
    <div>Loading...</div>;
  }

  if (isError) {
    <div>Error!</div>;
  }

  if (response) {
    return (
      <style.BackgroundPageLayout
        screenWidth={`${screenWidth}px`}
        isMobile={isMobile}
        backPngTop={
          isBoasting ? `url(${background50Top})` : `url(${backgroundDarkTop})`
        }
        backPngTail={
          isBoasting ? `url(${background50Tail})` : `url(${backgroundDarkTail})`
        }
        backPngMiddle={
          isBoasting
            ? `url(${background50Middle})`
            : `url(${backgroundDarkMiddle})`
        }
      >
        <layout.Header headerHeight={`${headerHeight}px`}>
          <div
            className="statusBarHeight"
            style={{ width: "inherit", height: "50px" }}
          ></div>
          <layout.HeaderContent
            style={{ fontSize: "25px", backgroundColor: `${sVar.white70}` }}
          >
            <BackArrowGray
              onClick={onClickBack}
              style={{ position: "absolute", left: "10%", top: "60%" }}
            />
            {!!response.userId.userNickname && response.userId.userNickname}
          </layout.HeaderContent>
        </layout.Header>
        <layout.Main
          headerHeight={`${headerHeight}px`}
          mainHeight={`${mainHeight}px`}
        >
          <layout.MainContent>
            {/* 영수증 */}
            <layout.FlexCenterColumn100
              style={{ backgroundColor: `${sVar.white70}` }}
            >
              <style.ReceiptInnerContainer
                padding="0.8em"
                fontSize="0.6em"
                style={{ gap: "0.5em" }}
              >
                <layout.FlexCenterRow100
                  style={{ justifyContent: "space-between" }}
                >
                  <div>위트있는 멘트</div>
                  <div>성공한 기분 멘트</div>
                </layout.FlexCenterRow100>
                <layout.FlexCenterRow100
                  style={{ justifyContent: "space-between" }}
                >
                  <div>아주 흥미로운 멘트</div>
                  <div>{!!response.boardId && response.boardId}</div>
                </layout.FlexCenterRow100>
                <layout.FlexCenterRow100
                  style={{ justifyContent: "space-between" }}
                >
                  <div>웃기고 싶어요 안 선생님</div>
                  <div>
                    {!!response.boardCreatedAt && response.boardCreatedAt}
                  </div>
                </layout.FlexCenterRow100>
              </style.ReceiptInnerContainer>
              <style.ReceiptInnerContainer padding="1em" fontSize="1.2em">
                {console.log(
                  response.cashbookDetail.cashbookCreatedAt.split("T")
                )}
                {!!response.cashbookDetail.cashbookCreatedAt &&
                  response.cashbookDetail.cashbookCreatedAt
                    .split("T")[0]
                    .split("-")
                    .join(" / ")}
              </style.ReceiptInnerContainer>
              <style.ReceiptInnerContainer
                padding="1em"
                fontSize="0.9em"
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
                    digit3Comma(response.cashbookDetail.cashbookGoalValue)}
                  원
                </div>
              </style.ReceiptInnerContainer>
              <style.ReceiptInnerContainer padding="1em" fontSize="0.9em">
                {!!response.cashbookDetail.detail &&
                  response.cashbookDetail.detail.map((purchase) => {
                    return (
                      <layout.FlexCenterRow100
                        style={{ justifyContent: "space-between" }}
                        key={purchase.cashDetailId}
                      >
                        <div>{purchase.cashDetailText}</div>
                        <div>{digit3Comma(purchase.cashDetailValue)}원</div>
                      </layout.FlexCenterRow100>
                    );
                  })}
              </style.ReceiptInnerContainer>
              <style.ReceiptInnerContainer padding="1em" fontSize="0.9em">
                <layout.FlexCenterRow100
                  style={{ justifyContent: "space-between" }}
                >
                  <div>합계</div>
                  <div>
                    {!!response.cashbookDetail.cashbookNowValue &&
                      digit3Comma(response.cashbookDetail.cashbookNowValue)}
                    원
                  </div>
                </layout.FlexCenterRow100>
              </style.ReceiptInnerContainer>
              {/* <layout.FlexCenterColumn100
                  style={{
                    padding: "15px",
                    fontSize: "14px",
                    borderBottom: "2px dashed green",
                  }}
                > */}
              <style.ReceiptInnerContainer padding="1em" fontSize="0.9em">
                <layout.FlexCenterRow100
                  style={{ justifyContent: "space-between" }}
                >
                  <div>절약한 금액</div>
                  <div>
                    {!!response.cashbookDetail.cashbookGoalValue &&
                      digit3Comma(
                        response.cashbookDetail.cashbookGoalValue -
                          response.cashbookDetail.cashbookNowValue
                      )}
                    원
                  </div>
                </layout.FlexCenterRow100>
              </style.ReceiptInnerContainer>
            </layout.FlexCenterColumn100>
            {/* 게시글 -> 추후 개발*/}
            <style.ReceiptPostContainer
              style={{ backgroundColor: `${sVar.white70}` }}
            >
              <style.ReceiptPost>
                {!!response.boardText && response.boardText}
              </style.ReceiptPost>
            </style.ReceiptPostContainer>
            {/* 댓글 */}
            <layout.FlexCenterColumn100 style={{ marginTop: "30px" }}>
              <layout.Flex100 style={{ paddingLeft: "8px" }}>
                <div style={{ fontSize: "20px" }}>댓글</div>
                <div style={{ fontSize: "10px", margin: "10px" }}>
                  {!!response.comments.length && response.comments.length}개
                </div>
              </layout.Flex100>
              <layout.FlexCenterColumn100 style={{ gap: "5px" }}>
                {response.comments.length > 0 &&
                  response.comments.map((comment) => {
                    console.log("comment:::", comment);
                    return (
                      <BoardDetailComment
                        boardId={id}
                        isBoasting={isBoasting}
                        key={comment.commentId}
                        id={comment.commentId}
                        userName={comment.userId.userNickname}
                        likeCount={comment.likeCount}
                        likeCheck={false}
                      >
                        {comment.commentText}
                      </BoardDetailComment>
                    );
                  })}
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
      </style.BackgroundPageLayout>
    );
  }

  return <div>아무 것도 아닌 경우!</div>;
}

export default BoardDetail;
