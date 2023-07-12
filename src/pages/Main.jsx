import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";

import { layout, style } from 'styles';
import { commentDayAfter } from 'constants';
import { useGlobalVariables, useMainAssetContext, SocialLoginModal, Nav, MainExp } from 'components';
import { chkLoggedIn, getAssetSize } from "functions"
import { mainLogoSmooth, mainBackgroundTop, mainBackgroundMiddle, mainBackgroundTail, MainTitleLogo, MainLogoText } from 'assets';
import { mainAPI } from "api/api"

// function Main({ isMobile, headerHeight, navHeight, mainHeight}) {
  function Main() {
    // 로그인 체크
    //// 로그인 여부에 따라 렌더링 다른 페이지 : main, 가계부, 게시판의 일부
    const isLoggedIn = chkLoggedIn()
    console.log("login:::", isLoggedIn)

    const INIT_LOG_VALUE = false
    // 만들어둔 context 사용하기
    // const { frameSize, windowSize, isMobile, headerHeight, navHeight, mainHeight, screenWidth, mainExpBox, mainRecordCard, mainJourneyTitle, mainJourneyBox, mainWeather, mainTag, mainToggleBar, mainToggleBtn } = useGlobalVariables();
    const { frameSize, windowSize, isMobile, headerHeight, navHeight, mainHeight, screenWidth } = useGlobalVariables()
    // get asset sizes
    const { mainExpBox, mainRecordCard, mainJourneyTitle, mainJourneyBox, mainWeather, mainLogo, mainTag, mainToggleBar, mainToggleBtn} = useMainAssetContext()
    console.log("mainExpBox:::", mainExpBox)
  // console.log(document.cookie);
  // 닉네임 모달
  const [isSocialLogin, setIsSocialLogin] = useState(INIT_LOG_VALUE);
  const { search } = useLocation();
  

  // 만약 로그인된 상태이면 렌더링할 데이터 받아오기
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery(["mainData"], mainAPI.getMainData, {
    select: (data) => data.data.data,
    enabled: isLoggedIn,
    onError: () => {
      console.log("MainAPI.getMainData::: get error");
    },
    onSuccess: () => {
      console.log("MainAPI.getMainData::: get success");
      console.log("mainData:::", data)
    }
  })


  useEffect(() => {
    let loginSuccess = queryString.parse(search);
    loginSuccess = Object.keys(loginSuccess).length === 0 ? true : JSON.parse(loginSuccess.loginSuccess)

    if (!loginSuccess){
      console.log(loginSuccess)
      setIsSocialLogin(true)
    }
  }, [])

  // useEffect(() => {window.dispatchEvent(new CustomEvent('resize'))}, [])
  return (
    <style.BackgroundPageLayout
      screenWidth={`${screenWidth}px`}
      isMobile={isMobile}
      backPngTop={`url(${mainBackgroundTop})`}
      backPngMiddle={`url(${mainBackgroundMiddle})`}
      backPngTail={`url(${mainBackgroundTail})`}
    >
      <layout.Header headerHeight={`${headerHeight}px`}>
        <div className="statusBarHeight" style={{width: "inherit", height: "50px"}}></div>
        <layout.HeaderContent>
          <layout.FlexCenter100>
            <MainLogoText />
          </layout.FlexCenter100>
        </layout.HeaderContent>
      </layout.Header>
      <layout.Main headerHeight={`${headerHeight}px`} mainHeight={`${mainHeight}px`}>
        <layout.MainContent>
          <layout.FlexCenterColumn100>
            <MainExp 
              userName={isLoggedIn ? decodeURIComponent(localStorage.getItem("nickname")) : "행복한 바다사자"}
              dayCount={
                isLoading || isError
                ? 80
                : data.signupDay
              }
              width={mainExpBox.width}
              height={mainExpBox.height}>
            </MainExp>
            {// recordCard 섹션, isLoggedIn이 true일 때 정보와 상세를 나누는 state 필요

            }
            { // 여정 일지 섹션

            }
          </layout.FlexCenterColumn100>

        </layout.MainContent>
      </layout.Main>
      <layout.Nav navHeight={`${navHeight}px`}>
        <Nav selected="main" />
      </layout.Nav>
      { isSocialLogin && <SocialLoginModal>회원가입</SocialLoginModal> }
    </style.BackgroundPageLayout>
  );
}

export default Main;
