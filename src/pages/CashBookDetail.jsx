import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { CashBookAPI } from "api/api";
import { AddDetail, BackCrampsBlack, EditCard, EditCashbook } from "assets";
import { CashBookDetailList, ExpendAddModal, Nav } from "components";
import CashDetailModal from "components/ui/modal/CashDetailModal";
import { layout, style } from "styles";
import { useGlobalVariables } from "components";
import {
  backgroundBrightMiddle,
  backgroundBrightTail,
  backgroundBrightTop,
} from "assets";
import { noneAddMent } from "constants/comment";

function CashBookDetail() {
  // function CashBookDetail({ isMobile, headerHeight, navHeight, mainHeight }) {
  // 만들어둔 context 사용하기
  const {
    windowSize,
    isMobile,
    headerHeight,
    navHeight,
    mainHeight,
    screenWidth,
  } = useGlobalVariables();
  console.log(
    "CashBookDetail rendered:",
    windowSize,
    isMobile,
    headerHeight,
    navHeight,
    mainHeight
  );

  const navigate = useNavigate();
  // 지출 기록 Modal open, close
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const showAddModal = () => {
    setIsAddModalOpen(true);
  };
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // 무지출 Modal
  const [isNoneModal, setIsNoneModal] = useState(false);
  const changeNoneModal = () => {
    const newIsNone = !isNoneModal;
    setIsNoneModal(newIsNone);
  };

  // param이용하여 id 받아와서 지출 내역 받을 것
  const param = useParams();
  const cardId = param.id;

  // 무지출 API 적용
  const queryClient = useQueryClient();
  const mutationNone = useMutation(CashBookAPI.putCashNone, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cashDetail"]);
      changeNoneModal();
    },
    onError: () => alert("상세 항목 삭제에 실패하였습니다."),
  });

  const onClickNone = () => {
    console.log(cardId);
    mutationNone.mutate({cardId});
  }

  // 상세 내역 받아오기
  let { data, isLoading, error } = useQuery(
    ["cashDetail"],
    () => CashBookAPI.getCashDetail(cardId),
    {
      select: (data) => data.data.data,
    }
  );
  if (isLoading || error) {
    return <></>;
  }
  console.log(data);

  let detail = [];
  let result = true;
  if (!!data.result) {
    result = data.result.consumption;
    // result = false;
    if (!result) {
      detail.push({
        cashDetailId: 0,
        cashDetailText: "무지출 데이 >__<!",
        cashDetailValue: 0,
      });
    }
  } else {
    detail = data.detail;
  }
  console.log(detail);
  // 여기는 가짜 데이터
  // const data = [
  //   // {
  //   //   cashDetailId: 1,
  //   //   cashDetailText: "육개장",
  //   //   cashDetailValue: 10000,
  //   // },
  //   // {
  //   //   cashDetailId: 2,
  //   //   cashDetailText: "부대찌개",
  //   //   cashDetailValue: 8000,
  //   // },
  // ];

  // 뒤로가기
  // query string 으로 수정할 것
  const onClickBack = () => {
    navigate(-1);
  };

  // 수정 카드
  // 쿼리 스트링 수정 필요
  const onClickEdit = () => {
    const sendInfo = {
      category: data.cashbookCategory,
      name: data.cashbookName,
    };
    const queryStr = new URLSearchParams(sendInfo).toString();
    // alert(`/cash-book/edit/${cardId}?${queryStr}`);
    navigate(`/cash-book/edit/${cardId}?${queryStr}`);
  };

  return (
    <style.BackgroundPageLayout
      screenWidth={`${screenWidth}px`}
      isMobile={isMobile}
      backPngTop={`url(${backgroundBrightTop})`}
      backPngMiddle={`url(${backgroundBrightMiddle})`}
      backPngTail={`url(${backgroundBrightTail})`}
    >
      <layout.PageLayout isMobile={isMobile}>
        <layout.Header headerHeight={`${headerHeight}px`}>
          <div
            className="statusBarHeight"
            style={{ width: "inherit", height: "50px" }}
          ></div>
          <layout.HeaderContent>
            <BackCrampsBlack
              onClick={onClickBack}
              style={{ position: "absolute", left: "1em", float: "left" }}
            />
            <div style={{ fontSize: "1em" }}>
              오늘의{" "}
              {!!data.cashbookName ? data.cashbookName : data.cashbookCategory}{" "}
              지출
            </div>
            {/* <EditCashbook
              onClick={onClickEdit}
              style={{ position: "absolute", right: "1em", float: "right" }}
            /> */}
          </layout.HeaderContent>
        </layout.Header>
        <layout.Main
          headerHeight={`${headerHeight}px`}
          mainHeight={`${mainHeight}px`}
        >
          <layout.MainContent>
            <layout.SpendingListWrap>
              {!detail.length ? (
                <></>
              ) : (
                detail.map((expend) => {
                  return (
                    <CashBookDetailList
                      key={expend.cashDetailId}
                      cashDetailId={expend.cashDetailId}
                      expendName={expend.cashDetailText}
                      expendMoney={expend.cashDetailValue}
                    />
                  );
                })
              )}
            </layout.SpendingListWrap>
            <style.CashBookDetailAddBox
              onClick={showAddModal}
              style={!result ? { display: "none" } : {}}
            >
              <AddDetail />
            </style.CashBookDetailAddBox>
            {isAddModalOpen && (
              <ExpendAddModal setClose={closeAddModal} cardId={cardId} />
            )}
            <style.CashBookDetailNoneBtn
              visible={!detail.length ? "visible" : "hidden"}
              onClick={changeNoneModal}
            >
              무지출 데이 기록 🎉
            </style.CashBookDetailNoneBtn>
            {isNoneModal && (
              <CashDetailModal setClose={changeNoneModal} onClickHandler={onClickNone}>
                {noneAddMent}
              </CashDetailModal>
            )}
          </layout.MainContent>
        </layout.Main>
        <layout.Nav navHeight={`${navHeight}px`}>
          <Nav selected="money" />
        </layout.Nav>
      </layout.PageLayout>
    </style.BackgroundPageLayout>
  );
}

export default CashBookDetail;
