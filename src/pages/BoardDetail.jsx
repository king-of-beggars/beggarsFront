import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Nav } from "components";
import { layout, style } from "styles";
import BoardDetailComment from "components/board/BoardDetailComment";
import { BackArrowGray,backgroundDarkTop, backgroundDarkMiddle, backgroundDarkTail, background50Head, background50Middle, background50Tail } from 'assets';
import { MENU_LIST } from 'constants';
import { useQuery } from 'react-query';
import { boardAPI } from 'api/api';
import * as sVar from "constants/styleVariables"

function BoardDetail({ isMobile, isBoasting, headerHeight, navHeight, mainHeight }) {

  const { id } = useParams() // id 패러미터 받아오기
  console.log("받아온 id:::", id)

  const screenWidth = isMobile ? parseFloat(localStorage.getItem("screenWidth")) : parseFloat(localStorage.getItem("screenWidth")) > 393 ? 393 : parseFloat(localStorage.getItem("screenWidth"));
  const navigate = useNavigate();

  const {
    data: DATA_RECEIPT,
    isLoading,
    isError
  } = useQuery(["receipt", id], () => boardAPI.getBoardDetail(id), {
    select: (data) => data.data,
    onSuccess: (res) => {
      console.log("getRes:::", res)
    }
  })

  // const DATA_CASHBOOK = DATA_RECEIPT.cashbookDetail
  // const DATA_COMMENTS = DATA_RECEIPT.comments
  // const DATA_USER = DATA_RECEIPT.userId

  console.log("receipt:::", DATA_RECEIPT)
  // console.log("cashbook:::", DATA_CASHBOOK)
  // console.log("comments:::", DATA_COMMENTS)
  // console.log("user:::", DATA_USER)

  // 뒤로 가기
  const onClickBack = () => {
    navigate(-1);
  };

  // 숫자 콤마 표시
  const digit3Comma = (digit) => {
    return digit.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <style.BackgroundPageLayout
      screenWidth={`${screenWidth}px`}
      isMobile={isMobile}
      backPngTop={isBoasting ? `url(${background50Head})` : `url(${backgroundDarkTop})`}
      backPngTail={isBoasting ? `url(${background50Tail})` : `url(${backgroundDarkTail})`}
      backPngMiddle={isBoasting ? `url(${background50Middle})` : `url(${backgroundDarkMiddle})`}>
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
          {/* {receipt.userId.userNickName} */}
        </layout.HeaderContent>
      </layout.Header>
      <layout.Main
        headerHeight={`${headerHeight}px`}
        mainHeight={`${mainHeight}px`}
      >
        <layout.MainContent style={{backgroundColor: `${sVar.white70}`}}>
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
                {/* <div>{receipt.boardId}</div> */}
              </layout.FlexCenterRow100>
              <layout.FlexCenterRow100
                style={{ justifyContent: "space-between" }}
              >
                <div>웃기고 싶어요 안 선생님</div>
                {/* <div>{receipt.boardCreatedAt}</div> */}
              </layout.FlexCenterRow100>
            </style.ReceiptInnerContainer>
            <style.ReceiptInnerContainer padding="1em" fontSize="1.2em">
              {/* {receipt.cashbookDetail.cashbookCreatedAt} */}
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
                {/* {receipt.cashbookDetail.cashbookCategory} */}
                 예산
              </div>
              <div style={{ flex: "1", textAlign: "center" }}>
                {/* {receipt.cashbookDetail.cashbookName} */}
              </div>
              <div style={{ textAlign: "left" }}>
                {/* {digit3Comma(receipt.cashbookDetail.cashbookGoalValue)}원 */}
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
              {/* {receipt.cashbookDetail.detail.map((purchase) => {
                return (
                  <layout.FlexCenterRow100
                    style={{ justifyContent: "space-between" }}
                    key={purchase.cashDetailId}
                  >
                    <div>{purchase.cashDetailText}</div>
                    <div>{digit3Comma(purchase.cashDetailValue)}원</div>
                  </layout.FlexCenterRow100>
                );
              })} */}
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
                {/* <div>{digit3Comma(receipt.cashbookDetail.cashbookNowValue)}원</div> */}
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
                {/* <div>{digit3Comma(data.cashbookRestValue)}원</div> */}
              </layout.FlexCenterRow100>
            </style.ReceiptInnerContainer>
          </layout.FlexCenterColumn100>
          {/* 게시글 -> 추후 개발*/}
          <style.ReceiptPostContainer>
            {/* <style.ReceiptPost>{receipt.boardText}</style.ReceiptPost> */}
          </style.ReceiptPostContainer>
          {/* 댓글 */}
          <layout.FlexCenterColumn100 style={{ marginTop: "30px" }}>
            <layout.Flex100 style={{paddingLeft:"8px"}}>
              <div style={{fontSize:"20px"}}>댓글</div>
              {/* <div style={{fontSize:"10px", margin:"10px"}}>{data.comment.length}개</div> */}
            </layout.Flex100>
            <layout.FlexCenterColumn100 style={{border: "1px solid red", gap:"8px"}}>
              <BoardDetailComment></BoardDetailComment>
            </layout.FlexCenterColumn100>
          </layout.FlexCenterColumn100>
        </layout.MainContent>
      </layout.Main>
      {/* 댓글창으로! */}
      <layout.Nav navHeight={`${navHeight}px`}>
        <Nav selected={MENU_LIST.board}/>
      </layout.Nav>
    </style.BackgroundPageLayout>
  );
}

export default BoardDetail;
