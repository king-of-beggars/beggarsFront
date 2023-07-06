import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { CashBookAPI } from "api/api";
import { AddDetail, BackCrampsBlack, EditCard, EditCashbook } from "assets";
import { CashBookDetailList, ExpendAddModal, Nav } from "components";
import CashDetailModal from "components/ui/modal/CashDetailModal";
import { layout, style } from "styles";
import { useGlobalVariables } from 'components';

function CashBookDetail() {
// function CashBookDetail({ isMobile, headerHeight, navHeight, mainHeight }) {
  // 만들어둔 context 사용하기
  const { windowSize, isMobile, headerHeight, navHeight, mainHeight } = useGlobalVariables();
  console.log('CashBookDetail rendered:', windowSize, isMobile, headerHeight, navHeight, mainHeight)

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

  let { data, isLoading, error } = useQuery(["cashDetail"], () =>
    CashBookAPI.getCashDetail(cardId)
  );
  if (isLoading || error) {
    return <></>;
  }
  // data = data.data
  // if (data.consumption) {
  //   data = [];
  // }
  console.log(data);
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
    navigate(`/cash-book/edit/${cardId}?${queryStr}`)
  };

  return (
    <layout.PageLayout isMobile={isMobile}>
      <layout.Header headerHeight={`${headerHeight}px`}>
        <div className="statusBarHeight" style={{width: "inherit", height: "50px"}}></div>
        <layout.HeaderContent>
          <BackCrampsBlack
            onClick={onClickBack}
            style={{ position: "absolute", left: "1em", float: "left" }}
          />
          <div style={{ fontSize: "1em" }}>오늘의 {} 지출</div>
          <EditCashbook
            onClick={onClickEdit}
            style={{ position: "absolute", right: "1em", float: "right" }}
          />
        </layout.HeaderContent>
      </layout.Header>
      <layout.Main
        headerHeight={`${headerHeight}px`}
        mainHeight={`${mainHeight}px`}
      >
        <layout.MainContent>
          <layout.SpendingListWrap>
            {!data.length ? (
              <></>
            ) : (
              data.map((expend) => {
                return (
                  <CashBookDetailList
                    expendName={expend.cashDetailText}
                    expendMoney={expend.cashDetailValue}
                  />
                );
              })
            )}
          </layout.SpendingListWrap>
          <style.CashBookDetailAddBox onClick={showAddModal}>
            <AddDetail />
          </style.CashBookDetailAddBox>
          {isAddModalOpen && (
            <ExpendAddModal setClose={closeAddModal} cardId={cardId} />
          )}
          <style.CashBookDetailNoneBtn
            visible={!data.length ? "visible" : "hidden"}
            onClick={changeNoneModal}
          >
            무지출 데이 기록 🎉
          </style.CashBookDetailNoneBtn>
          {isNoneModal && (
            <CashDetailModal setClose={changeNoneModal}></CashDetailModal>
          )}
        </layout.MainContent>
      </layout.Main>
      <layout.Nav navHeight={`${navHeight}px`}>
        <Nav selected="money" />
      </layout.Nav>
    </layout.PageLayout>
  );
}

export default CashBookDetail;
