import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'

import { useGlobalVariables } from "providers"
import { saveUserInfo } from 'functions'
import { layout, style } from 'styles'
import { BackCramps, bgCloud20, bgMountain20, bgSky20 } from 'assets'
import { AuthAPI } from 'api/api'

// function Login({ isMobile, headerHeight, navHeight, mainHeight  }) {
function Login() {
  // 만들어둔 context 사용하기
  const { windowSize,widthRatio, isMobile, headerHeight, navHeight, mainHeight, screenWidth } = useGlobalVariables();
  console.log('Login rendered:', windowSize, isMobile, headerHeight, navHeight, mainHeight)

  // nav가 없는 페이지인 경우 header를 줄이고 main을 늘려주기
  const noNavHeaderHeight = headerHeight - 50
  const noNavMainHeight = mainHeight + navHeight + 50


  const INIT_INPUT_VALUE = ""
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    userName: INIT_INPUT_VALUE,
    userPwd: INIT_INPUT_VALUE
  });
  const { userName, userPwd } = userInfo;

  // onChange 적용 함수
  const onChangeInput = (changeObj) => {
    const { name, value } = changeObj.target;

    const newUser = {
      ...userInfo,
      [name]: value,
    };

    setUserInfo(newUser);
  }

  // 회원가입으로 이동
  const onClickSignup = () => {
    navigate('/signup');
  }

  // 뒤로가기
  const onClickBack = () => {
    navigate(-1);
  }

  // 카카오 로그인 direct
  const kakaoLoginHandler = () => {
    const redirecKakaotURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_AUTH}&redirect_uri=https://poorkingapi.shop/api/user/login/kakao`
    window.location.replace(redirecKakaotURL);
  }

  // 카카오 로그인 direct
  const naverLoginHandler = () => {
    const redirectNaverURL = ``
    window.location.replace(redirectNaverURL);
  }

  const loginHandler = () => {
    console.log("userInfo:::", userInfo)
    mutationLogin.mutate(userInfo)
  }

  const mutationLogin = useMutation(AuthAPI.postLogIn, {
    onSuccess: (response) => {
      alert("로그인이 완료되었습니다.")
      console.log("login-response:::", response)
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("userId", response.headers.userId);
      localStorage.setItem("nickname", response.headers.usernickname);
      // console.log(decodeURIComponent(response.headers["usernickname"]))
      navigate("/") // 회원가입 완료시 메인 이동
    },
    onError: () => alert("로그인이 실패하였습니다.")
  })
  

  return (
    <style.BackgroundPageLayout
      screenWidth={`${screenWidth}px`}
      isMobile={isMobile}
      backPngTop={`url(${bgSky20})`}
      backPngMiddle={`url(${bgCloud20})`}
      backPngTail={`url(${bgMountain20})`}
    >
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
            <style.LoginLogoWrap></style.LoginLogoWrap>
            <span style={{fontSize: `${widthRatio * 25}px`, fontFamily: "DOSIyagiMedium"}}>내일은 거지왕</span>
            <layout.LoginInputWrap>
              <style.LoginInputBox>
                <span style={{fontSize: `${widthRatio * 16}px`, fontFamily: "DOSGothic"}}>아이디</span>
                <input
                  name="userName"
                  type="text"
                  value={userName}
                  onChange={onChangeInput}
                  autoComplete='off'
                  style={{backgroundColor: "transparent"}}
                />
              </style.LoginInputBox>
              <style.LoginInputBox>
                <span style={{fontSize: `${widthRatio * 16}px`, fontFamily: "DOSGothic"}}>비밀번호</span>
                <input
                  name="userPwd"
                  type="password"
                  value={userPwd}
                  onChange={onChangeInput}
                  autoComplete='off'
                  style={{backgroundColor: "transparent"}}
                />
              </style.LoginInputBox>
            </layout.LoginInputWrap>
            <layout.LoginBtnWrap>
              <style.BigBlackBtn ratio={widthRatio} onClick={loginHandler}>로그인</style.BigBlackBtn>
              <span style={{textDecoration: "underline", fontSize: `${widthRatio * 14}px`, fontFamily: "DOSIyagiMedium"}} onClick={onClickSignup}>회원가입</span>
            </layout.LoginBtnWrap>
            <layout.SocialBtnWrap style={{gap: "1em", margin: "2em, 0"}}>
              <style.SocialLoginBtn ratio={widthRatio} site="kakao" onClick={kakaoLoginHandler}>카카오 로그인</style.SocialLoginBtn>
              <style.SocialLoginBtn ratio={widthRatio} site="naver" onClick={naverLoginHandler}>네이버 로그인</style.SocialLoginBtn>
            </layout.SocialBtnWrap>
          </layout.LoginWrap>
        </layout.MainContent>
      </layout.Main>
    </style.BackgroundPageLayout>


    //     <div style={{position: "absolute", left: "20px", top: "20px"}}> {"<"} </div>

  )
}

export default Login