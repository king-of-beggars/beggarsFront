import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Nav } from "components";
import { layout, style } from "styles";
import { BackArrowWhite, BackArrowWGray } from "assets";
import BoardDetailComment from "components/board/BoardDetailComment";
import { backgroundBrightTop, backgroundDarkTop, backgroundBrightMiddle, backgroundDarkMiddle, backgroundBrightTail, backgroundDarkTail } from 'assets';

function BoardDetail({ isMobile, isBoasting, headerHeight, navHeight, mainHeight }) {

  const { id } = useParams() // id 패러미터 받아오기
  console.log("받아온 id:::", id)

  const screenWidth = isMobile ? parseFloat(localStorage.getItem("screenWidth")) : parseFloat(localStorage.getItem("screenWidth")) > 393 ? 393 : parseFloat(localStorage.getItem("screenWidth"));
  const navigate = useNavigate();

  // 뒤로 가기
  const onClickBack = () => {
    navigate(-1);
  };

  // 숫자 콤마 표시
  const digit3Comma = (digit) => {
    return digit.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };

  const data = {
    userId: 15,
    userEmail: "wdasd@naver.com",
    userNickName: "김거지",
    boardText: "나는 매일 거지네",
    cashbookId: 5,
    cashbookCategory: "식비",
    cashbookName: "간식비",
    cashbookNowValue: "2000",
    cashbookRestValue: "1000",
    cashbookGoalValue: "3000",
    cashbookCreatedAt: "Date",
    cashbookDetail: [
      {
        cashDetailId: 4,
        cashDetailText: "도넛",
        cashDetailValue: 1500,
      },
      {
        cashDetailId: 5,
        cashDetailText: "야쿠르트",
        cashDetailValue: 500,
      },
    ],
    boardType: 1,
    comment: [
      {
        userId: 5,
        userEmail: "sdsfd@naver.com",
        userNickName: "개방거지",
        commentText: "ㅋㅋ그러니거지지",
        likeCount: 4,
        likeCheck: true,
      },
      {
        userId: 2,
        userEmail: "sdsfd@naver.com",
        userNickName: "왕부자",
        commentText: "걸어가셈",
        likeCount: 6,
        likeCheck: false,
      },
    ],
  };

  return (
    <style.BackgroundPageLayout
      screenWidth={`${screenWidth}px`}
      isMobile={isMobile}
      backPngTop={isBoasting ? `url(${backgroundBrightTop})` : `url(${backgroundDarkTop})`}
      backPngTail={isBoasting ? `url(${backgroundBrightTail})` : `url(${backgroundDarkTail})`}
      backPngMiddle={isBoasting ? `url(${backgroundBrightMiddle})` : `url(${backgroundDarkMiddle})`}>
      <layout.Header headerHeight={`${headerHeight}px`}>
        <BackArrowWhite
          onClick={onClickBack}
          style={{
            position: "absolute",
            left: "1em",
            top: "2em",
          }}
        />
        <layout.HeaderContent style={{ fontSize: "25px" }}>
          {data.userNickName}
        </layout.HeaderContent>
      </layout.Header>
      <layout.Main
        headerHeight={`${headerHeight}px`}
        mainHeight={`${mainHeight}px`}
      >
        <layout.MainContent>
          {/* 영수증 */}
          <layout.FlexCenterColumn100 style={{ border: "1px solid red" }}>
            <layout.FlexCenterColumn100
              style={{
                padding: "10px",
                fontSize: "9px",
                borderBottom: "2px dashed green",
              }}
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
                <div>영수증 발행 번호 랜덤으로?</div>
              </layout.FlexCenterRow100>
              <layout.FlexCenterRow100
                style={{ justifyContent: "space-between" }}
              >
                <div>웃기고 싶어요 안 선생님</div>
                <div>작성 시점 날짜 및 시간</div>
              </layout.FlexCenterRow100>
            </layout.FlexCenterColumn100>
            <layout.FlexCenter100
              style={{
                padding: "15px",
                fontSize: "20px",
                borderBottom: "2px dashed green",
              }}
            >
              YY / MM / DD
            </layout.FlexCenter100>
            <layout.Flex100
              style={{
                padding: "15px",
                fontSize: "14px",
                borderBottom: "2px dashed green",
              }}
            >
              <div style={{ textAlign: "right" }}>
                {data.cashbookCategory} 예산
              </div>
              <div style={{ flex: "1", textAlign: "center" }}>
                {data.cashbookName}
              </div>
              <div style={{ textAlign: "left" }}>
                {digit3Comma(data.cashbookGoalValue)}원
              </div>
            </layout.Flex100>
            <layout.FlexCenterColumn100
              style={{
                padding: "10px",
                fontSize: "14px",
                borderBottom: "2px dashed green",
              }}
            >
              {data.cashbookDetail.map((purchase) => {
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
            </layout.FlexCenterColumn100>
            <layout.FlexCenterColumn100
              style={{
                padding: "15px",
                fontSize: "14px",
                borderBottom: "2px dashed green",
              }}
            >
              <layout.FlexCenterRow100
                style={{ justifyContent: "space-between" }}
              >
                <div>합계</div>
                <div>{digit3Comma(data.cashbookNowValue)}원</div>
              </layout.FlexCenterRow100>
            </layout.FlexCenterColumn100>
            <layout.FlexCenterColumn100
              style={{
                padding: "15px",
                fontSize: "14px",
                borderBottom: "2px dashed green",
              }}
            >
              <layout.FlexCenterRow100
                style={{ justifyContent: "space-between" }}
              >
                <div>절약한 금액</div>
                <div>{digit3Comma(data.cashbookRestValue)}원</div>
              </layout.FlexCenterRow100>
            </layout.FlexCenterColumn100>
          </layout.FlexCenterColumn100>
          {/* 게시글 -> 추후 개발*/}
          {/* 댓글 */}
          <layout.FlexCenterColumn100 style={{ marginTop: "30px" }}>
            <layout.Flex100 style={{paddingLeft:"8px"}}>
              <div style={{fontSize:"20px"}}>댓글</div>
              <div style={{fontSize:"10px", margin:"10px"}}>{data.comment.length}개</div>
            </layout.Flex100>
            <layout.FlexCenterColumn100 style={{border: "1px solid red", gap:"8px"}}>
              <BoardDetailComment></BoardDetailComment>
            </layout.FlexCenterColumn100>
          </layout.FlexCenterColumn100>
        </layout.MainContent>
      </layout.Main>
      {/* 댓글창으로! */}
      <layout.Nav navHeight={`${navHeight}px`}>
        <Nav selected="main" />
      </layout.Nav>
    </style.BackgroundPageLayout>
  );
}

export default BoardDetail;
