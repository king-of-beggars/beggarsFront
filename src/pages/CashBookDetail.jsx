import { CashBookAPI } from "api/api";
import { AddDetail, BackCrampsBlack, EditCard } from "assets";
import { CashBookDetailList, ExpendAddModal, Nav } from "components";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { layout, style } from "styles";

function CashBookDetail({ isMobile, headerHeight, navHeight, mainHeight }) {
  const navigate = useNavigate();
  // Modal open, close
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showUserModal = () => {
    setIsModalOpen(true);
  };
  const closeUserModal = () => {
    setIsModalOpen(false);
  };

  // param이용하여 id 받아와서 지출 내역 받을 것
  const param = useParams();
  
  let { data, isLoading, error } = useQuery(['cashDetail'], ()=>CashBookAPI.getCashDetail(param.id));
  if (isLoading || error) {
    return <></>;
  }
  data = data.data
  console.log(data.length);
  // 여기는 가짜 데이터
  // const data = [
  //   {
  //     cashDetailId: 1,
  //     cashDetailText: "육개장",
  //     cashDetailValue: 10000,
  //   },
  //   {
  //     cashDetailId: 2,
  //     cashDetailText: "부대찌개",
  //     cashDetailValue: 8000,
  //   },
  // ];

  
  // 뒤로가기
  // query string 으로 수정할 것
  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <layout.PageLayout isMobile={isMobile}>
      <layout.Header headerHeight={`${headerHeight}px`}>
        <layout.HeaderContent>
          <BackCrampsBlack
            onClick={onClickBack}
            style={{ position: "absolute", left: "1em", float: "left" }}
          />
          <div style={{ fontSize: "1em" }}>오늘의 {} 지출</div>
          <EditCard
            // 수정 페이지로 넘어가도록 수정 필요
            style={{ position: "absolute", right: "1em", float: "right" }}
          />
        </layout.HeaderContent>
      </layout.Header>
      <layout.Main headerHeight={`${headerHeight}px`} mainHeight={`${mainHeight}px`}>
        <layout.MainContent>
          <layout.SpendingListWrap>
            {!data.length ? data.map((expend) => {
              return (
                <CashBookDetailList
                  expendName={expend.cashDetailText}
                  expendMoney={expend.cashDetailValue}
                />
              );
            }) : <></>}
          </layout.SpendingListWrap>
          <style.CashBookDetailAddBox onClick={showUserModal}>
            <AddDetail />
          </style.CashBookDetailAddBox>
        </layout.MainContent>
      </layout.Main>
      <layout.Nav navHeight={`${navHeight}px`}>
        <Nav selected="money" />
      </layout.Nav>
    </layout.PageLayout>
  );
}

export default CashBookDetail;
