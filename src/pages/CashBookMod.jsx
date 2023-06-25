import React from 'react'
import { Nav } from "components";
import { layout, style } from 'styles';
import { BackCrampsBlack, } from "assets";
import { Nav, CashBookInput, CashAddSelect } from "components";
import { useNavigate } from 'react-router-dom';

function CashBookMod({ isMobile, headerHeight, navHeight, mainHeight }) {
  // 뒤로가기
  const navigate = useNavigate();
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
          <div style={{ fontSize: "1em" }}>카드 수정</div>
        </layout.HeaderContent>
      </layout.Header>
      <layout.Main headerHeight={`${headerHeight}px`} mainHeight={`${mainHeight}px`}>
        <layout.MainContent>
          <CashAddSelect
            title={"카테고리"}
            options={options}
            placeholder={"카테고리 선택"}
          />
          <CashBookInput
            title={"소제목"}
            placeholder={"소제목을 입력해주세요.(선택)"}
          />
          <CashBookInput
            title={"예산"}
            placeholder={"일 별 목표 예산을 입력해주세요."}
          />
          <style.CashBookBtn marginTop="50px">{"저장"}</style.CashBookBtn>
        </layout.MainContent>
      </layout.Main>
      <layout.Nav navHeight={`${navHeight}px`}>
        <Nav selected="money" />
      </layout.Nav>
    </layout.PageLayout>
  );
}

export default CashBookMod