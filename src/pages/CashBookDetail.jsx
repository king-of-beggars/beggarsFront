import { AddDetail, BackCrampsBlack, EditCard } from "assets";
import { CashBookDetailList, ExpendAddModal, Nav } from "components";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { layout, style } from "styles";

function CashBookDetail({ isMobile }) {
  const navigate = useNavigate();
  // param이용하여 id 받아와서 지출 내역 받을 것
  const param = useParams();
  // 여기는 가짜 데이터
  const data = [
    {
      cashDetailId: 1,
      cashDetailText: "육개장",
      cashDetailValue: 10000,
    },
    {
      cashDetailId: 2,
      cashDetailText: "부대찌개",
      cashDetailValue: 8000,
    },
  ];

  // Modal open, close
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showUserModal = () => {
    setIsModalOpen(true);
  };
  const closeUserModal = () => {
    setIsModalOpen(false);
  };

  // 뒤로가기
  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <layout.PageLayout isMobile={isMobile}>
      <header
        style={{
          position: "fixed",
          top: "0px",
          display: "flex",
          alignItems: "center",
          padding: "20px 40px",
          display: "flex",
          width: "inherit",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BackCrampsBlack
          onClick={onClickBack}
          style={{ position: "absolute", left: "1em", float: "left" }}
        />
        <div style={{ fontSize: "1.56em" }}>오늘의 ... 지출</div>
        <EditCard
          // 수정 페이지로 넘어가도록 수정 필요
          style={{ position: "absolute", right: "1em", float: "right" }}
        />
      </header>
      <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}
      >
        {data.map((expend) => {
          return (
            <CashBookDetailList
              expendName={expend.cashDetailText}
              expendMoney={expend.cashDetailValue}
            />
          );
        })}
        <style.CashBookDetailAddBox onClick={showUserModal}>
          <AddDetail />
        </style.CashBookDetailAddBox>
        {isModalOpen && (
          <ExpendAddModal isOpen={isModalOpen} onClose={closeUserModal} />
        )}
      </div>
      <Nav selected="money" />
    </layout.PageLayout>
  );
}

export default CashBookDetail;
