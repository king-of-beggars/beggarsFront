import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import queryString from "query-string";
import moment from "moment";
import { useMutation, useQueryClient } from "react-query";

import { layout, style } from "styles";
import { BackCrampsBlack } from "assets";
import { Nav, CashBookInput, CashAddSelect } from "components";
import { categoryList } from "constants/category";
import { useGlobalVariables } from "components";
import {
  backgroundBrightMiddle,
  backgroundBrightTail,
  backgroundBrightTop,
} from "assets";
import { CashBookAPI } from "api/api";


// function CashBookMod({ isMobile, headerHeight, navHeight, mainHeight }) {
function CashBookMod() {
  // 만들어둔 context 사용하기
  const { windowSize, isMobile, headerHeight, navHeight, mainHeight, screenWidth } =
    useGlobalVariables();
  console.log(
    "CashBookMod rendered:",
    windowSize,
    isMobile,
    headerHeight,
    navHeight,
    mainHeight
  );

  // 카테고리 정보
  const options = categoryList;

  // 쿼리스트링 정보 받아오기
  const { search } = useLocation();
  let searchCondition = queryString.parse(search);
  // console.log(searchCondition);

  // param이용하여 id 받아와서 지출 내역 받을 것
  const param = useParams();
  const cardId = param.id;

  // 카드 정보 state
  // 기존의 정보로 수정 필요
  const [cardInfo, setCardInfo] = useState({
    category: searchCondition.category,
    subHead: searchCondition.name,
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
    console.log(newCard);
  };

  // 뒤로가기
  const navigate = useNavigate();
  const onClickBack = () => {
    navigate(-1);
  };

  // 카드 수정 API
  const queryClient = useQueryClient();
  const mutationEditCard = useMutation(CashBookAPI.postCashEdit, {
    onSuccess: () => {
      queryClient.invalidateQueries([`cashCard${moment().format("YYYY-MM-DD")}`]);
      navigate("/cash-book");
    },
    onError: () => alert("카드 수정을 실패했습니다."),
  });

  // 저장하기 버튼 클릭
  const onClickSave = () => {
    const editCard = {
      cashCategory: category,
      cashName: subHead,
      cashListGoalValue: Number(budget.replace(",", "")),
    };

    mutationEditCard.mutate({cardId, editCard});
    alert("카드 수정이 완료되셨습니다.");
    navigate("/cash-book");
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
            <div style={{ fontSize: "1em" }}>카드 수정</div>
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
              name={"category"}
              value={category}
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
            <style.CashBookBtn marginTop="50px" onClick={onClickSave}>
              {"저장"}
            </style.CashBookBtn>
          </layout.MainContent>
        </layout.Main>
        <layout.Nav navHeight={`${navHeight}px`}>
          <Nav selected="money" />
        </layout.Nav>
      </layout.PageLayout>
    </style.BackgroundPageLayout>
  );
}

export default CashBookMod;
