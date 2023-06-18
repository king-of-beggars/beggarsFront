import React from 'react'
import { layout, style } from 'styles'
import { BigBlackBtn, LoginInputBox } from 'styles/styled-components/styles'

function Login() {

  return (
    <>
      <div style={{position: "absolute", left: "1em", top: "1em"}}> {"<"} </div>
      <style.LoginLogoWrap>로고 들어갈거임</style.LoginLogoWrap>
      <span style={{fontSize: "1.5em"}}>내일은 거지왕</span>
      <layout.FlexCenterColumn100 style={{margin: "20px 0 30px 0"}}>
        <style.LoginInputBox>
          <span>아이디</span>
          <input />
        </style.LoginInputBox>
        <style.LoginInputBox>
          <span>비밀번호</span>
          <input />
        </style.LoginInputBox>
      </layout.FlexCenterColumn100>
      <layout.FlexCenterColumn100 style={{width: "90%", gap: "1em", paddingBottom: "3em", borderBottom: "0.5px solid #9D9D9D"}}>
        <style.BigBlackBtn>로그인</style.BigBlackBtn>
        <span style={{textDecoration: "underline"}}>회원 가입</span>
      </layout.FlexCenterColumn100>
      <layout.FlexCenterColumn100 style={{gap: "1em", marginTop: "3em"}}>
        <style.SocialLoginBtn site="kakao">카카오 로그인</style.SocialLoginBtn>
        <style.SocialLoginBtn site="naver">네이버 로그인</style.SocialLoginBtn>
      </layout.FlexCenterColumn100>
    </>



    //     <div style={{position: "absolute", left: "20px", top: "20px"}}> {"<"} </div>

  )
}

export default Login