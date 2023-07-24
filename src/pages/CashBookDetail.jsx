import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { useGlobalVariables } from "providers"
import { CashBookAPI } from "api/api";
import { AddDetail, BackCrampsBlack, bgCloud50, bgMountain50, bgSky50 } from "assets";
import { CashBookDetailList, ExpendAddModal, Nav } from "components";
import CashDetailModal from "components/ui/modal/CashDetailModal";
import { layout, style } from "styles";
import { commentZeroSpend } from "constants";
import { AutoTextSize } from "auto-text-size";

function CashBookDetail() {
  // 만들어둔 context 사용하기
  const {
    widthRatio,
    isMobile,
    headerHeight,
    navHeight,
    mainHeight,
    screenWidth,
  } = useGlobalVariables();

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
    onError: () => alert("무지출 등록을 실패하였습니다."),
  });

  const onClickNone = () => {
    mutationNone.mutate({ cardId });
  };

  // 상세 내역 받아오기
  let { data, isLoading, error } = useQuery(
    ["cashDetail"],
    () => CashBookAPI.getCashDetail(cardId),
    {
      select: (data) => data.data.data.result,
      onSuccess: (data) => {
        console.log("cashbookDetail:::", data);
      },
    }
  );
  if (isLoading || error) {
    return <></>;
  }
  console.log("writecheck", !!data.writeCheck);

  let detail = [];
  let result = true;
  if (Object.keys(data).includes("consumption")) {
    // result = data.result.detail.cashDetailValue;
    result = data.consumption;
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
  // console.log(detail);
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

  return (
    <style.BackgroundPageLayout
      screenWidth={`${screenWidth}px`}
      isMobile={isMobile}
      backPngTop={`url(${bgSky50})`}
      backPngMiddle={`url(${bgCloud50})`}
      backPngTail={`url(${bgMountain50})`}
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
            {/* <div style={{ fontSize: "1em" }}>
              오늘의{" "}
              {!!data.cashbookName ? data.cashbookName : data.cashbookCategory}{" "}
              지출
            </div> */}
            <div style={{ width:"80%", display: "flex", justifyContent:"center", alignItems:"center" }}>
              <AutoTextSize mode="multiline"
                minFontSizePx={1}
                maxFontSizePx={24}>
                오늘의{" "}
                {!!data.cashbookName
                  ? data.cashbookName
                  : data.cashbookCategory}{" "}
                지출
              </AutoTextSize>
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
                  console.log("expend:::", expend);
                  return (
                    <CashBookDetailList
                      key={expend.cashDetailId}
                      cardId={cardId}
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
              visible={!!data.writeCheck ? "hidden" : "visible"}
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
              <CashDetailModal
                setClose={changeNoneModal}
                onClickHandler={onClickNone}
              >
                {commentZeroSpend}
              </CashDetailModal>
            )}
          </layout.MainContent>
        </layout.Main>
        <layout.Nav navHeight={`${navHeight}px`}>
          <Nav ratio={widthRatio} selected="money" />
        </layout.Nav>
      </layout.PageLayout>
    </style.BackgroundPageLayout>
  );
}

export default CashBookDetail;
