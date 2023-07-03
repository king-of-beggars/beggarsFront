import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

import { style, layout } from "styles";
import { BackCramps } from "assets";
import CashBookInput from "components/ui/input/CashBookInput";
import { CashBookBtn } from "styles/styled-components/styles";
import { CashBookAPI } from "api/api";
import { useMutation } from "react-query";

function ExpendAddModal({ setClose, cardId }) {
  const navigate = useNavigate();
  const INIT_INPUT_VALUE = "";
  // 상세 지출 내역 state
  const [expendInfo, setExpendInfo] = useState({
    expendName: INIT_INPUT_VALUE,
    expendPrice: INIT_INPUT_VALUE,
  });
  const { expendName, expendPrice } = expendInfo;

  // onChange 적용 함수
  const onChangeInput = (changeObj) => {
    let { name, value } = changeObj.target;

    // 가격일 경우 컴마 추가 및 숫자만 허용
    if (name === "expendPrice") {
      const onlyNumber = value.replace(/[^0-9]/g, "");

      const numValue = onlyNumber.replaceAll(",", "");
      value = numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const newExpend = {
      ...expendInfo,
      [name]: value,
    };

    setExpendInfo(newExpend);
    console.log(newExpend)
  };

  // 지출 상세 내역 저장
  const mutation = useMutation(CashBookAPI.postCashDetailAdd, {
    onSuccess: (response) => {
      navigate(`/cash-book/${cardId}`);
    },
    onError: () => alert("지출 내역 저장에 실패했습니다."),
  });

  const onClickSave = () => {
    if (!expendName | !expendPrice) {
      alert("지출 상세 내역을 모두 입력해주세요.");
    } else {
      const newExpend = {
        cashDetailText: expendName,
        cashDetailValue: Number(expendPrice.replace(",", "")),
      };
      // alert(newExpend.cashDetailText);
      mutation.mutate(cardId, newExpend)
    }
  };

  return (
    <style.ModalOverlay onClick={setClose}>
      <style.Modal onClick={(event) => event.stopPropagation()}>
        <layout.FlexCenterRow100 style={{ top: "1em", padding: "1em" }}>
          <BackCramps
            onClick={setClose}
            style={{ position: "absolute", left: "1em", float: "left" }}
          />
          <div style={{ fontSize: "25px" }}>지출 기록</div>
        </layout.FlexCenterRow100>

        <layout.FlexCenterColumn style={{ margin: "20px" }}>
          <CashBookInput
            title={"항목"}
            placeholder={"지출 항목을 입력해주세요."}
            name="expendName"
            type="text"
            value={expendName}
            onChange={onChangeInput}
          />
          <CashBookInput
            title={"가격"}
            placeholder={"가격을 입력해주세요."}
            name="expendPrice"
            type="text"
            value={expendPrice}
            onChange={onChangeInput}
          />
          <CashBookBtn marginTop="10px" onClick={onClickSave}>
            저장
          </CashBookBtn>
        </layout.FlexCenterColumn>
      </style.Modal>
    </style.ModalOverlay>
  );
}

export default ExpendAddModal;
