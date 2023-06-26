import { Nav, CashBookInput, CashAddSelect } from "components";
import React, { useState } from "react";
import { BackCrampsBlack } from "assets";

import { layout, style } from "styles";
import { useNavigate } from "react-router-dom";

const options = [
  { value: "식비", name: "식비" },
  { value: "교통비", name: "교통비" },
  { value: "여가비", name: "여가비" },
];

function CashBookAdd({ isMobile, headerHeight, navHeight, mainHeight }) {
  // 카드 정보 state
  const [cardInfo, setCardInfo] = useState({
    category: "",
    subHead: "",
    budget: "",
  });
  const { category, subHead, budget } = cardInfo;

  // onChange 적용 함수
  const onChangeInput = (changeObj) => {
    let { name, value } = changeObj.target;

    // 가격일 경우 컴마 추가 및 숫자만 허용
    if (name === "budget") {
      const onlyNumber = value.replace(/[^0-9]/g, "");

      const numValue = onlyNumber.replaceAll(",", "");
      value = numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const newCard = {
      ...cardInfo,
      [name]: value,
    };

    setCardInfo(newCard);
    console.log(newCard)
  };

  // 뒤로가기
  const navigate = useNavigate();
  const onClickBack = () => {
    navigate('/cash-book');
  };

  // 저장하기 버튼 클릭
  const onClickSave = () => {

    navigate('/cash-book');
  }

  return (
    <layout.PageLayout isMobile={isMobile}>
      <layout.Header headerHeight={`${headerHeight}px`}>
        <layout.HeaderContent>
          <BackCrampsBlack
            onClick={onClickBack}
            style={{ position: "absolute", left: "1em", float: "left" }}
          />
          <div style={{ fontSize: "1em" }}>카드 추가</div>
        </layout.HeaderContent>
      </layout.Header>
      <layout.Main
        headerHeight={`${headerHeight}px`}
        mainHeight={`${mainHeight}px`}
      >
        <layout.MainContent>
          <CashAddSelect
            title={"카테고리"}
            options={options}
            placeholder={"카테고리 선택"}
            onChange={onChangeInput}
          />
          <CashBookInput
            title={"소제목"}
            placeholder={"소제목을 입력해주세요.(선택)"}
            onChange={onChangeInput}
            name={"subHead"}
            value={subHead}
          />
          <CashBookInput
            title={"예산"}
            placeholder={"일 별 목표 예산을 입력해주세요."}
            onChange={onChangeInput}
            name={"budget"}
            value={budget}
          />
          <style.CashBookBtn marginTop="50px" onClick={onClickSave}>{"저장"}</style.CashBookBtn>
        </layout.MainContent>
      </layout.Main>
      <layout.Nav navHeight={`${navHeight}px`}>
        <Nav selected="money" />
      </layout.Nav>
    </layout.PageLayout>
  );
}

export default CashBookAdd;
