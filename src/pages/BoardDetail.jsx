import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BoardDetailInput, Nav } from "components";
import { layout, style } from "styles";
import BoardDetailComment from "components/board/BoardDetailComment";
import {
  BackArrowGray,
  backgroundDarkTop,
  backgroundDarkMiddle,
  backgroundDarkTail,
  background50Head,
  background50Middle,
  background50Tail,
} from "assets";
import { MENU_LIST } from "constants";
import { useQuery } from "react-query";
import { boardAPI } from "api/api";
import * as sVar from "constants/styleVariables";

function BoardDetail({
  isMobile,
  isBoasting,
  headerHeight,
  navHeight,
  mainHeight,
}) {
  const { id } = useParams(); // id 패러미터 받아오기
  console.log("받아온 id:::", id);

  const screenWidth = isMobile
    ? parseFloat(localStorage.getItem("screenWidth"))
    : parseFloat(localStorage.getItem("screenWidth")) > 393
    ? 393
    : parseFloat(localStorage.getItem("screenWidth"));
  const navigate = useNavigate();

  // let DATA_CASHBOOK;
  // let DATA_COMMENTS;
  // let DATA_USER;

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery(["receipt", id], () => boardAPI.getBoardDetail(id), {
    select: (data) => data.data,
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

  // 뒤로 가기
  const onClickBack = () => {
    navigate(-1);
  };

  // 숫자 콤마 표시
  const digit3Comma = (digit) => {
    return digit.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };

  if (isLoading) {
    <div>Loading...</div>
  }

  if (isError) {
    <div>Error!</div>
  }

  if (response) {
    return (
      <style.BackgroundPageLayout
        screenWidth={`${screenWidth}px`}
        isMobile={isMobile}
        backPngTop={
          isBoasting ? `url(${background50Head})` : `url(${backgroundDarkTop})`
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
          <BackArrowGray
            onClick={onClickBack}
            style={{
              position: "absolute",
              left: "1em",
              top: "2em",
            }}
          />
          <layout.HeaderContent style={{ fontSize: "25px" }}>
            {!!response.userId.userNickname && response.userId.userNickname}
          </layout.HeaderContent>
        </layout.Header>
        <layout.Main
          headerHeight={`${headerHeight}px`}
          mainHeight={`${mainHeight}px`}
        >
          <layout.MainContent style={{ backgroundColor: `${sVar.white70}` }}>
            {/* 영수증 */}
            <layout.FlexCenterColumn100 style={{ border: "1px solid red" }}>
              <style.ReceiptInnerContainer padding="0.8em" fontSize="0.6em">
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
                {!!response.cashbookDetail.cashbookCreatedAt &&
                  response.cashbookDetail.cashbookCreatedAt}
              </style.ReceiptInnerContainer>
              <style.ReceiptInnerContainer padding="1em" fontSize="0.9em">
                {/* <layout.Flex100
                  style={{
                    padding: "15px",
                    fontSize: "14px",
                    borderBottom: "2px dashed green",
                  }}
                > */}
                <div style={{ textAlign: "right" }}>
                  {!!response.cashbookDetail.cashbookCategory &&
                    response.cashbookDetail.cashbookCategory}
                  예산
                </div>
                <div style={{ flex: "1", textAlign: "center" }}>
                  {!!response.cashbookDetail.cashbookName && response.cashbookDetail.cashbookName}
                </div>
                <div style={{ textAlign: "left" }}>
                  {!!response.cashbookDetail.cashbookGoalValue &&
                    digit3Comma(response.cashbookDetail.cashbookGoalValue)}
                  원
                </div>
              </style.ReceiptInnerContainer>
              <style.ReceiptInnerContainer>
                {/* <layout.FlexCenterColumn100
                  style={{
                    padding: "10px",
                    fontSize: "14px",
                    borderBottom: "2px dashed green",
                  }}
                > */}
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
            <style.ReceiptPostContainer>
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
              <layout.FlexCenterColumn100
                style={{ border: "1px solid red", gap: "8px" }}
              >
                <BoardDetailComment></BoardDetailComment>
              </layout.FlexCenterColumn100>
            </layout.FlexCenterColumn100>
          </layout.MainContent>
        </layout.Main>
        {/* 댓글창으로! */}
        <layout.Nav navHeight={`${navHeight}px`}>
          <BoardDetailInput />
        </layout.Nav>
      </style.BackgroundPageLayout>
    );
  }

  return <div>아무 것도 아닌 경우!</div>

}

export default BoardDetail;
