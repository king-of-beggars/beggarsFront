import { Nav, CashBookInput, CashAddSelect } from "components";
import React from "react";
import { BackCrampsBlack, } from "assets";

import { layout, style } from "styles";
import { useNavigate } from 'react-router-dom';

const options = [
  { value: "식비", name: "식비" },
  { value: "교통비", name: "교통비" },
  { value: "여가비", name: "여가비" },
];

function CashBookAdd({ isMobile, headerHeight, navHeight, mainHeight }) {
  // 
  const [userInfo, setUserInfo] = useState({ id: "", pw: "" });
  const { id, pw } = userInfo;

  // onChange 적용 함수
  const onChangeInput = (changeObj) => {
    const { name, value } = changeObj.target;

    const newUser = {
      ...userInfo,
      [name]: value,
    };

    setUserInfo(newUser);
  };

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
          <div style={{ fontSize: "1em" }}>카드 추가</div>
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

export default CashBookAdd;
