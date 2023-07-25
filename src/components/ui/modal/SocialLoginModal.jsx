import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { useGlobalVariables } from "providers";
import { saveUserInfo, chkLoggedIn } from 'functions';
import { style, layout } from "styles";
import { AuthAPI } from "api/api";
import * as sVar from "constants/styleVariables";
import { useNickname} from 'hooks';

const INIT_INPUT_VALUE = ""

function SocialLoginModal({ socialModalOn, setSocialModalOn, setIsSocialLogin, children }) {
  const { widthRatio } = useGlobalVariables();
  const navigate = useNavigate();
  const [nickname, setNickname, isNickValid] = useNickname(INIT_INPUT_VALUE);
  const [isNickChked, setIsNickChked] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(true);
  
  const onChangeHandler = (event) => {
    setNickname(event.target.value);
  };

  // 닉네임 중복 체크
  const mutationNick = useMutation(AuthAPI.postNickCheck, {
    onSuccess: () => {
      alert("이 닉네임을 사용하실 수 있습니다.");
      setIsNickChked(true);
    },
    onError: () => {
      alert("중복된 닉네임입니다. 다른 닉네임을 사용해 주세요.");
      setIsNickChked(false);
    },
  });

  const nickDupleChk = () => {
    if (!!isNickValid.isValidLen && !!isNickValid.isValidRegex) {
      const newNick = { userNickname: nickname }
      mutationNick.mutate(newNick)
    } else {
      alert("닉네임의 조건이 맞지 않습니다.")
    }

  }

  // 여정 시작
  const mutationSignUp = useMutation(AuthAPI.postNickSocial, {
    onSuccess: (response) => {
      if (response.status === 201) {
        alert("회원가입이 완료되었습니다.");
        setSocialModalOn(false);
        setIsSocialLogin(true);
        console.log("response", response)

        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        const userId = response.headers.userid;
        const nickname = response.headers.usernickname;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userId", userId);
        localStorage.setItem("nickname", nickname);
        // navigate('/');

        window.location.href = "/";
      }
      
    },
    onError: (response) => {
      console.log("error on mutationSignUp:::", response)
      alert("회원가입이 실패하였습니다.")
      setSocialModalOn(false)
      setIsSocialLogin(false)
    }
  })

  const signUpHandler = () => {
    if (isNickChked) {
      const newUser = {
        userNickname: nickname
      }
      mutationSignUp.mutate(newUser)
    } else {
      alert("정보를 제대로 입력했는지 확인해주세요.")
    }
  }

  return (
    socialModalOn && (
      <style.ModalOverlay>
        <style.ModalDefault width="80%">
          <style.ModalHeader>{children}</style.ModalHeader>
          <layout.FlexColumn>
            <style.SignupInputBox>
              <input
                name="nickName"
                type="text"
                value={nickname}
                onChange={onChangeHandler}
                placeholder="닉네임 입력"
              />
              <button
                style={{ marginBottom: "5px" }}
                tf={isNickChked}
                onClick={nickDupleChk}
              >
                중복확인
              </button>
            </style.SignupInputBox>
            <style.ConditionText>
                { isNickValid.isValidRegex === null && <span>한/영 숫자로 이루어진</span> }
                { isNickValid.isValidRegex === true && <span style={{color: `${sVar.trusyBlue}`}}>한/영 숫자로 이루어진</span> }
                { isNickValid.isValidRegex === false && <span style={{color: `${sVar.falsyRed}`}}>한/영 숫자로 이루어진</span> }
                { isNickValid.isValidLen === null && <span> 2~12자</span> }
                { isNickValid.isValidLen === true && <span style={{color: `${sVar.trusyBlue}`}}> 2~12자</span> }
                { isNickValid.isValidLen === false && <span style={{color: `${sVar.falsyRed}`}}> 2~12자</span> }
              </style.ConditionText>
            <layout.FlexDefault
              style={{
                justifyContent: "space-around",
                margin: "2em 0 0 0",
                gap: "10px",
              }}
            >
              <style.SmallBtn
                onClick={() => setSocialModalOn(false)}
                color={sVar.borderGray}
                backcolor={sVar.backgroundGray}
                border={sVar.borderGray}
                ratio={widthRatio}
              >
                닫기
              </style.SmallBtn>
              <style.BigBlackBtn ratio={widthRatio} onClick={signUpHandler}>여정 시작</style.BigBlackBtn>
            </layout.FlexDefault>
          </layout.FlexColumn>
        </style.ModalDefault>
      </style.ModalOverlay>
    )
  );
}

export default SocialLoginModal;
