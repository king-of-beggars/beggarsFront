import React, { useState } from "react";
import { style, layout } from "styles"
import { useMutation } from "react-query";
import { AuthAPI } from "api/api";
import * as sVar from "constants/styleVariables"


function SocialLoginModal({ children, }) {
    const [nickName, setNickName] = useState("")
    const [isNickChked, setIsNickChked] = useState(false)
    const onChangeHandler = (event) => {
        setNickName(event.target.value);
    }
  // 닉네임 중복 체크
    const mutationNick = useMutation(AuthAPI.postNickCheck, {
        onSuccess: () => {
        alert("이 닉네임을 사용하실 수 있습니다.");
        setIsNickChked(true)
        },
        onError: () => alert("다른 닉네임을 사용해 주세요."),
    });
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

  return (
    <style.ModalOverlay>
        <style.ModalDefault width="80%">
            <style.ModalHeader>{children}</style.ModalHeader>
            <layout.FlexColumn>
                <style.SignupInputBox>
                    <input
                    name="nickName"
                    type="text"
                    value={nickName}
                    onChange={onChangeHandler}
                    placeholder="닉네임 입력"
                    />
                    <button style={{marginBottom: "5px"}} tf={isNickChked} onClick={onClickNickCheck}>중복확인</button>
                </style.SignupInputBox>
                <style.ConditionText><span>영문 및 숫자로 이루어진</span> <span>4~12자</span></style.ConditionText>
                <layout.FlexDefault style={{justifyContent: "space-around", margin: "2em 0 0 0", gap: "10px"}}>
                    <style.SmallBtn color={sVar.borderGray} backcolor={sVar.backgroundGray} border={sVar.borderGray}>닫기</style.SmallBtn>
                    <style.BigBlackBtn>여정 시작</style.BigBlackBtn>
                </layout.FlexDefault>
            </layout.FlexColumn>

        </style.ModalDefault>
    </style.ModalOverlay>
  )
}

export default SocialLoginModal