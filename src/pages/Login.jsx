import React from 'react'
import { useNavigate } from 'react-router-dom'
import { layout, style } from 'styles'
import { BigBlackBtn, LoginInputBox } from 'styles/styled-components/styles'
import { BackCramps } from 'assets'

function Login({ isMobile, headerHeight, navHeight, mainHeight  }) {
  const navigate = useNavigate();

  // 회원가입으로 이동
  const onClickSignup = () => {
    navigate('/signup');
  }

  // 뒤로가기
  const onClickBack = () => {
    navigate(-1);
  }

  const kakaoLoginHandler = () => {
    const redirectURL = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=2ad53ec39ebaac5ba8a250967f431977&redirect_uri=https://poorkingapi.shop/api/user/login/kakao"

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
            <style.LoginLogoWrap></style.LoginLogoWrap>
            <span style={{fontSize: "1.5em"}}>내일은 거지왕</span>
            <layout.LoginInputWrap>
              <style.LoginInputBox>
                <span>아이디</span>
                <input />
              </style.LoginInputBox>
              <style.LoginInputBox>
                <span>비밀번호</span>
                <input />
              </style.LoginInputBox>
            </layout.LoginInputWrap>
            <layout.LoginBtnWrap>
              <style.BigBlackBtn>로그인</style.BigBlackBtn>
              <span style={{textDecoration: "underline", fontSize: "0.8em"}} onClick={onClickSignup}>회원가입</span>
            </layout.LoginBtnWrap>
            <layout.SocialBtnWrap style={{gap: "1em", margin: "2em, 0"}}>
              <style.SocialLoginBtn site="kakao" onClick={kakaoLoginHandler}>카카오 로그인</style.SocialLoginBtn>
              <style.SocialLoginBtn site="naver">네이버 로그인</style.SocialLoginBtn>
            </layout.SocialBtnWrap>
          </layout.LoginWrap>
        </layout.MainContent>
      </layout.Main>
    </layout.PageLayout>


    //     <div style={{position: "absolute", left: "20px", top: "20px"}}> {"<"} </div>

  )
}

export default Login