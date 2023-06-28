import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Nav } from "components";
import { layout } from "styles";
import { BackArrow } from "assets";

function BoardDetail({ isMobile, headerHeight, navHeight, mainHeight }) {
  const navigate = useNavigate();

  // 뒤로 가기
  const onClickBack = () => {
    navigate(-1);
  };

  const data = [{}]

  return (
    <layout.PageLayout isMobile={isMobile}>
      <layout.Header headerHeight={`${headerHeight}px`}>
        <BackArrow
          onClick={onClickBack}
          style={{ position: "absolute", left: "1em", top: "2em", backgroundColor: "green" }}
        />
        <layout.HeaderContent style={{ fontSize: "25px" }}>
          사용자 이름
        </layout.HeaderContent>
      </layout.Header>
      <layout.Main
        headerHeight={`${headerHeight}px`}
        mainHeight={`${mainHeight}px`}
      >
        <layout.MainContent>내용</layout.MainContent>
      </layout.Main>
      {/* 댓글창으로! */}
      <layout.Nav navHeight={`${navHeight}px`}>
        <Nav selected="main" />
      </layout.Nav>
    </layout.PageLayout>
  );
}

export default BoardDetail;
