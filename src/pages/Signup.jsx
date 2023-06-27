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
import { BackCramps } from 'assets';
import * as sVar from "constants/styleVariables"

function Signup({ isMobile, headerHeight, navHeight, mainHeight }) {
  const navigate = useNavigate();

  // user info state
  const [userInfo, setUserInfo] = useState({
    nickName: "",
    id: "",
    pw: "",
    pwConfirm: "",
  });
  const { nickName, id, pw, pwConfirm } = userInfo;

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

  const [isNickChked, setIsNickChked] = useState(false)
  const [isIdChked, setIsIdChked] = useState(false)
  const [pwLengthChk, setPwLengthChk] = useState(null)
  const [pwRegChk, setPwRegChk] = useState(null)

  const onClickNickCheck = () => {
    const minLenChk = nickName.length > 1;
    const maxLenChk = nickName.length < 13;
    const regexChk = /^[ㄱ-ㅎ가-힣ㅏ-ㅣa-zA-Z0-9]+$/
    if (!(minLenChk && maxLenChk)) {
      alert("닉네임의 길이를 다시 확인하세요.");
    } else if(!nickName.match(regexChk)) {
      alert("닉네임으로는 한글, 영어, 숫자만 입력이 가능합니다.")
    } else {
      const newNick = {userNickname: nickName}
      mutationNick.mutate(newNick);
    }
  };

  // 이후에 텍스트 조건 변경해서 보여주는 것으로 바꿀 예정!
  // const idCheck = (id) => {
  //   const minLenChk = id.length > 3;
  //   const maxLenChk = id.length < 13;
  //   const regexChk = /^[a-zA-Z0-9]+$/
    // if (id.length === 0) {
    //   setIsIdChked(false)
    //   return <style.ConditionText>영문 및 숫자로 이루어진 4~12자</style.ConditionText>
    // } else if (!(minLenChk && maxLenChk)) {
    //   setIsIdChked(false)
    //   return <style.ConditionColorText color={"tomato"}>아이디의 길이를 다시 확인해줘...</style.ConditionColorText>
    // } else if (!id.match(regexChk)) {
    //   setIsIdChked(false)
    //   return <style.ConditionColorText color={"tomato"}>아이디에는 영어 또는 숫자만 사용 가능하다네!</style.ConditionColorText>
    // } else {
    //   setIsIdChked(true)
    //   return <style.ConditionColorText color={"#00804f"}>아주 좋아!</style.ConditionColorText>
    // }

  // }

  const onClickIdChk = () => {
    const minLenChk = id.length > 3;
    const maxLenChk = id.length < 13;
    const regexChk = /^[a-zA-Z0-9]+$/
    if (!(minLenChk && maxLenChk)) {
      alert("아이디의 길이를 다시 확인하세요.");
    } else if(!id.match(regexChk)) {
      alert("아이디에는 영어 및 숫자만 사용 가능합니다.")
    } else {
      const newId = { userName: id }
      mutationId.mutate(newId)
    }
  }

  // const pwChk = () => {
  //   const lengthChk = pw.length > 7 && pw.length < 21
  //   const regex = /[^A-Za-z0-9]/;
  //   const regexChk = regex.test(pw)
  //   setPwChkResult(lengthChk && regexChk)
  // }

  const samePwChk = (pw, pwConfirm) => {
    if (pwConfirm.length === 0) {
      return (
        <style.ConditionText>비밀번호를 확인해주세요!</style.ConditionText>
      )
    } else if (pwConfirm === pw) {
      return (
        <style.ConditionColorText color={"#00804f"}>비밀번호가 일치합니다!</style.ConditionColorText>
      )
    } else {
      return (
        <style.ConditionColorText color={"tomato"}>비밀번호가 일치하지 않아요...</style.ConditionColorText>
      )
    }
  }

  const signUpHandler = () => {

  }

  return (
    <layout.PageLayout isMobile={isMobile}>
      <layout.Header headerHeight={`${headerHeight}px`}>
        <layout.HeaderContent>
          <BackCramps
              onClick={onClickBack}
              style={{ position: "absolute", left: "1em", top: "2em" }}
          />
        </layout.HeaderContent>
      </layout.Header>
      <layout.Main headerHeight={`${headerHeight}px`} mainHeight={`${mainHeight}px`}>
        <layout.MainContent>
          <layout.LoginWrap>
            <style.JoinHeader>회원가입</style.JoinHeader>
            <style.SignupInputWrap>
              <style.SignupInputBox>
                <input
                  name="nickName"
                  type="text"
                  value={nickName}
                  onChange={onChangeInput}
                  placeholder="닉네임 입력"
                />
                <button style={{marginBottom: "5px"}} tf={isNickChked} onClick={onClickNickCheck}>중복확인</button>
              </style.SignupInputBox>
              <style.ConditionText><span>한/영 숫자로 이루어진</span> <span>2~12자</span></style.ConditionText>
              <style.SignupInputBox>
                <input
                  name="id"
                  type="text"
                  value={id}
                  onChange={onChangeInput}
                  placeholder="아이디 입력"
                />
                {/* { isIdChked ? <button onClick={onClickIdChk}>중복확인</button> : <button style={{cursor: "not-allowed", background: "lightgray", color: "gray"}} disabled>중복확인</button>} */}
                <button style={{marginBottom: "5px"}} onClick={onClickIdChk}>중복확인</button>
              </style.SignupInputBox>
              {/* { idCheck(id) } */}
              <style.ConditionText><span>영문 및 숫자로 이루어진</span> <span>4~12자</span></style.ConditionText>
            </style.SignupInputWrap>
            <style.SignupInputWrap>
              <style.SignupInputBox>
                <input name="pw" type="text" value={pw} onChange={(event) => {
                  onChangeInput(event)
                  const regex = /[^A-Za-z0-9]/;
                  if (pw.length == 0 || pw === "") {
                    setPwLengthChk(null)
                    setPwRegChk(null)
                  } else {
                    setPwLengthChk(pw.length > 5 && pw.length < 21)
                    setPwRegChk(regex.test(pw))
                  }
                  console.log(pwLengthChk)
                }} placeholder="비밀번호 입력" />
              </style.SignupInputBox>
              <style.ConditionText>
                { pwRegChk === null && <span>영문과 숫자를 사용하고 1개 이상의 특수문자 포함한</span> }
                { pwRegChk === true && <span style={{color: `${sVar.trusyBlue}`}}>영문과 숫자를 사용하고 1개 이상의 특수문자 포함한</span> }
                { pwRegChk === false && <span style={{color: `${sVar.falsyRed}`}}>영문과 숫자를 사용하고 1개 이상의 특수문자 포함한</span> }
                { pwLengthChk === null && <span> 6~20자</span> }
                { pwLengthChk === true && <span style={{color: `${sVar.trusyBlue}`}}> 6~20자</span> }
                { pwLengthChk === false && <span style={{color: `${sVar.falsyRed}`}}> 6~20자</span> }
              </style.ConditionText>
              <style.SignupInputBox>
                <input name="pwConfirm" type="password" value={pwConfirm} onChange={onChangeInput} placeholder="비밀번호 확인" />
              </style.SignupInputBox>
              { samePwChk(pw, pwConfirm) }
            </style.SignupInputWrap>
            <layout.FlexCenter style={{marginBottom: "3em"}}>
              <style.BigBlackBtn onClick={signUpHandler}>여정 시작</style.BigBlackBtn>
            </layout.FlexCenter>
            
          </layout.LoginWrap>
        </layout.MainContent>
      </layout.Main>
    </layout.PageLayout>
  );
}

export default Signup;
