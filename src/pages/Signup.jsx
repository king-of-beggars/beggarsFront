import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { layout, style } from "styles";
import { AuthAPI } from "api/api";
import { BackCramps } from 'assets';
import * as sVar from "constants/styleVariables"
import { usePassword, useNickname, useId } from 'hooks';
import { useGlobalVariables } from 'components';

const INIT_INPUT_VALUE = ""

// function Signup({ isMobile, headerHeight, navHeight, mainHeight }) {
function Signup() {
  // 만들어둔 context 사용하기
  const { windowSize, isMobile, headerHeight, navHeight, mainHeight } = useGlobalVariables();
  console.log('Signup rendered:', windowSize, isMobile, headerHeight, navHeight, mainHeight)

  // nav가 없는 페이지인 경우 header를 줄이고 main을 늘려주기
  const noNavHeaderHeight = headerHeight - 50
  const noNavMainHeight = mainHeight + navHeight + 50

  const navigate = useNavigate();

  const [password, setPassword, isValid] = usePassword(INIT_INPUT_VALUE)
  const [nickname, setNickname, isNickValid] = useNickname(INIT_INPUT_VALUE)
  const [id, setId, isIdValid] = useId(INIT_INPUT_VALUE)
  const [passConfirm, setPassConfirm] = useState(INIT_INPUT_VALUE)

  const [isNickChked, setIsNickChked] = useState(false)
  const [isIdChked, setIsIdChked] = useState(false)

  // onChange 적용 함수
  const onChangeInput = (changeObj) => {
    const { name, value } = changeObj.target;

    if (name === "pw") {
      setPassword(value)
      setPassConfirm(passConfirm, value)
    } else if (name === "nickName") {
      setNickname(value)
      setIsNickChked(false)
    } else if (name === "id") {
      setId(value)
      setIsIdChked(false)
    } else if (name === "pwConfirm") {
      setPassConfirm(value)
    }
  };

  // 뒤로가기
  const onClickBack = () => {
    navigate(-1);
  }

  // 닉네임 중복 체크
  const mutationNick = useMutation(AuthAPI.postNickCheck, {
    onSuccess: () => {
      alert("이 닉네임을 사용하실 수 있습니다.");
      setIsNickChked(true)
    },
    onError: () => {
      alert("중복된 닉네임입니다. 다른 닉네임을 사용해 주세요.")
      setIsNickChked(false)
    }
  });

  const mutationId = useMutation(AuthAPI.postIdCheck, {
    onSuccess: () => {
      alert("이 아이디를 사용하실 수 있습니다.")
      setIsIdChked(true)
    },
    onError: () => {
      alert("다른 아이디를 사용해 주세요.")
      setIsIdChked(false)
    }
  })

  const mutationSignUp = useMutation(AuthAPI.postSignUp, {
    onSuccess: () => {
      alert("회원가입이 완료되었습니다.")
      navigate("/login")
    },
    onError: () => alert("회원가입이 실패하였습니다.")
  })

  const nickDupleChk = () => {
    if (!!isNickValid.isValidLen && !!isNickValid.isValidRegex) {
      const newNick = { userNickname: nickname }
      mutationNick.mutate(newNick)
    } else {
      alert("닉네임의 조건이 맞지 않습니다.")
    }

  }

  const idDupleChk = () => {
    if (!!isIdValid.isValidLen && !!isIdValid.isValidRegex) {
      const newId = { userName: id }
      mutationId.mutate(newId)
    } else {
      alert("아이디의 조건이 맞지 않습니다.")
    }
  }

  const signUpHandler = () => {
    const isPwSame = passConfirm === password
    if (isIdChked && isNickChked && isPwSame) {
      const newUser = {
        userName: id,
        userPwd: password,
        userNickname: nickname
      }
      mutationSignUp.mutate(newUser)
    } else {
      alert("정보를 제대로 입력했는지 확인해주세요.")
    }
  }

  const samePwTextRenderer = (passConfirm, password) => {
    if (passConfirm === "") {
      return (
        <style.ConditionText>비밀번호를 확인해주세요!</style.ConditionText>
      )
    } else if (passConfirm === password) {
      return (
        <style.ConditionColorText color={`${sVar.trusyBlue}`}>비밀번호가 일치합니다!</style.ConditionColorText>
      )
    } else {
      return (
        <style.ConditionColorText color={`${sVar.falsyRed}`}>비밀번호가 일치하지 않아요...</style.ConditionColorText>
      )
    }
  }

  return (
    <layout.PageLayout isMobile={isMobile}>
      <layout.Header headerHeight={`${noNavHeaderHeight}px`}>
        <div className="statusBarHeight" style={{width: "inherit", height: "50px"}}></div>
        <layout.HeaderContent>
          <BackCramps
              onClick={onClickBack}
              style={{ position: "absolute", left: "1em", top: "2em" }}
          />
        </layout.HeaderContent>
      </layout.Header>
      <layout.Main headerHeight={`${noNavHeaderHeight}px`} mainHeight={`${noNavMainHeight}px`}>
        <layout.MainContent>
          <layout.LoginWrap>
            <style.JoinHeader>회원가입</style.JoinHeader>
            <style.SignupInputWrap>
              <style.SignupInputBox>
                <input
                  name="nickName"
                  type="text"
                  value={nickname}
                  onChange={onChangeInput}
                  placeholder="닉네임 입력"
                  autoComplete="off"
                />
                <button style={{marginBottom: "5px"}} tf={isNickChked} onClick={nickDupleChk}>중복확인</button>
              </style.SignupInputBox>
              <style.ConditionText>
                { isNickValid.isValidRegex === null && <span>한/영 숫자로 이루어진</span> }
                { isNickValid.isValidRegex === true && <span style={{color: `${sVar.trusyBlue}`}}>한/영 숫자로 이루어진</span> }
                { isNickValid.isValidRegex === false && <span style={{color: `${sVar.falsyRed}`}}>한/영 숫자로 이루어진</span> }
                { isNickValid.isValidLen === null && <span> 2~12자</span> }
                { isNickValid.isValidLen === true && <span style={{color: `${sVar.trusyBlue}`}}> 2~12자</span> }
                { isNickValid.isValidLen === false && <span style={{color: `${sVar.falsyRed}`}}> 2~12자</span> }
              </style.ConditionText>
              <style.SignupInputBox>
                <input
                  name="id"
                  type="text"
                  value={id}
                  onChange={onChangeInput}
                  placeholder="아이디 입력"
                  autoComplete="off"
                />
                <button style={{marginBottom: "5px"}} onClick={idDupleChk}>중복확인</button>
              </style.SignupInputBox>
              <style.ConditionText>
                { isIdValid.isValidRegex === null && <span>영문 및 숫자로 이루어진</span> }
                { isIdValid.isValidRegex === true && <span style={{color: `${sVar.trusyBlue}`}}>영문 및 숫자로 이루어진</span> }
                { isIdValid.isValidRegex === false && <span style={{color: `${sVar.falsyRed}`}}>영문 및 숫자로 이루어진</span> }
                { isIdValid.isValidLen === null && <span> 4~12자</span> }
                { isIdValid.isValidLen === true && <span style={{color: `${sVar.trusyBlue}`}}> 4~12자</span> }
                { isIdValid.isValidLen === false && <span style={{color: `${sVar.falsyRed}`}}> 4~12자</span> }
                {/* <style.ConditionText><span>영문 및 숫자로 이루어진</span> <span>4~12자</span></style.ConditionText> */}
              </style.ConditionText>
            </style.SignupInputWrap>
            <style.SignupInputWrap>
              <style.SignupInputBox>
                <input name="pw" type="text" value={password} onChange={onChangeInput} placeholder="비밀번호 입력" />
              </style.SignupInputBox>
              <style.ConditionText>
                { isValid.isValidRegex === null && <span>영문과 숫자를 사용하고 1개 이상의 특수문자 포함한</span> }
                { isValid.isValidRegex === true && <span style={{color: `${sVar.trusyBlue}`}}>영문과 숫자를 사용하고 1개 이상의 특수문자 포함한</span> }
                { isValid.isValidRegex === false && <span style={{color: `${sVar.falsyRed}`}}>영문과 숫자를 사용하고 1개 이상의 특수문자 포함한</span> }
                { isValid.isValidLen === null && <span> 6~20자</span> }
                { isValid.isValidLen === true && <span style={{color: `${sVar.trusyBlue}`}}> 6~20자</span> }
                { isValid.isValidLen === false && <span style={{color: `${sVar.falsyRed}`}}> 6~20자</span> }
              </style.ConditionText>
              <style.SignupInputBox>
                <input name="pwConfirm" type="text" value={passConfirm} onChange={onChangeInput} placeholder="비밀번호 확인" />
              </style.SignupInputBox>
              { samePwTextRenderer(passConfirm, password) }
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
