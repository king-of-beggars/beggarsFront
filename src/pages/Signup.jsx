import React from 'react'
import { layout, style } from 'styles'
import { SignupInputBox,SigupInputWrap,BigBlackBtn } from 'styles/styled-components/styles'

function Signup() {
  return (
    <>
      <div style={{position: "absolute", left: "20px", top: "20px"}}> {"<"} </div>
      <div style={{fontSize: "1.8em", marginBottom: "80px"}}>회원가입</div>
      <SigupInputWrap>
        <SignupInputBox>
          <input placeholder='닉네임 입력'/>
          <button>중복확인</button>
        </SignupInputBox>
        <SignupInputBox>
          <input placeholder='아이디 입력'/>
          <button>중복확인</button>
        </SignupInputBox>
      </SigupInputWrap>

      <SigupInputWrap>
        <SignupInputBox>
          <input placeholder='비밀번호 입력'/>
        </SignupInputBox>
        <SignupInputBox>
          <input placeholder='비밀번호 확인'/>
        </SignupInputBox>
      </SigupInputWrap>

      <BigBlackBtn>여정 시작</BigBlackBtn>
    </>
  )
}

export default Signup