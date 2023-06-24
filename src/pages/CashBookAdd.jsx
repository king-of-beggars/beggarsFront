import { Nav } from "components";
import CashBookInput from "components/ui/input/CashBookInput";
import CashAddSelect from "components/ui/select-box/CashAddSelect";
import React from "react";

import { layout, style } from "styles";
import { CashBookBtn } from "styles/styled-components/styles";

const options = [
  { value: "식비", name: "식비" },
  { value: "교통비", name: "교통비" },
  { value: "여가비", name: "여가비" },
];

function CashBookAdd({ isMobile }) {
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
        <div style={{ fontSize: "1.56em" }}>카드 추가</div>
      </header>
      <div style={{}}>
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
        <CashBookBtn marginTop="50px">{"저장"}</CashBookBtn>
      </div>
      <Nav selected="money" />
    </layout.PageLayout>
  );
}

export default CashBookAdd;
