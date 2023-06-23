import React, { useState } from "react";
import { useMutation } from "react-query";

import { layout, style } from "styles";
import {
  SignupInputBox,
  SigupInputWrap,
  BigBlackBtn,
} from "styles/styled-components/styles";
import { AuthAPI } from "api/api";
import { useNavigate } from "react-router-dom";

function Signup({ isMobile }) {
  const navigate = useNavigate();

  // user info state
  const [userInfo, setUserInfo] = useState({
    nickName: "",
    id: "",
    pw: "",
    pwCofirm: "",
  });
  const { nickName, id, pw, pwCofirm } = userInfo;

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
  const onClickBack = () => {
    navigate(-1);
  }

  // 닉네임 중복 체크
  const mutationNick = useMutation(AuthAPI.postNickCheck, {
    onSuccess: () => {
      alert("이 닉네임을 사용하실 수 있습니다.");
    },
    onError: () => alert("다른 닉네임을 사용해 주세요."),
  });

  const mutationId = useMutation(AuthAPI.postIdCheck, {
    onSuccess: () => {
      alert("이 아이디를 사용하실 수 있습니다.")
    },
    onError: () => alert("다른 아이디를 사용해 주세요.")
  })

  const onClickNickCheck = () => {
    const newNick = {userNickname: nickName}
    mutationNick.mutate(newNick);
  };

  const onClickIdCheck = () => {
    const newId = { userName: id }
    mutationId.mutate(newId)
  }

  return (
    <layout.PageLayout isMobile={isMobile}>
      <div style={{ position: "absolute", left: "1em", top: "1em" }} onClick={onClickBack}>
        {" "}
        {"<"}{" "}
      </div>
      <div style={{ fontSize: "1.8em", marginBottom: "80px" }}>회원가입</div>
      <SigupInputWrap>
        <SignupInputBox>
          <input
            name="nickName"
            type="text"
            value={nickName}
            onChange={onChangeInput}
            placeholder="닉네임 입력"
          />
          <button onClick={onClickNickCheck}>중복확인</button>
        </SignupInputBox>
        <SignupInputBox>
          <input 
          name="id"
          tyle="text"
          value={id}
          onChange={onChangeInput}
          placeholder="아이디 입력" />
          <button onClick={onClickIdCheck}>중복확인</button>
        </SignupInputBox>
      </SigupInputWrap>

      <SigupInputWrap>
        <SignupInputBox>
          <input placeholder="비밀번호 입력" />
        </SignupInputBox>
        <SignupInputBox>
          <input placeholder="비밀번호 확인" />
        </SignupInputBox>
      </SigupInputWrap>

      <BigBlackBtn>여정 시작</BigBlackBtn>
    </layout.PageLayout>
  );
}

export default Signup;
