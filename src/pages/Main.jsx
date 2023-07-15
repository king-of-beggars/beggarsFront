import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";

import { chkLoggedIn } from "functions"
import { mainAPI } from "api/api"
import { layout, style } from 'styles';
import { useGlobalVariables, useMainAssetContext, SocialLoginModal, Nav, MainExp, MainRecordCard, MainJourney } from 'components';
import { mainBackgroundTop, mainBackgroundMiddle, mainBackgroundTail, MainLogoText } from 'assets';

// 컴포넌트 안에 들어있지 않아도 되는 요소, 다른 함수 등 여러 곳에서 쓰일 수 있도록 바깥에 변수 선언
const INIT_LOG_VALUE = false
// 로그인 체크
//// 로그인 여부에 따라 렌더링 다른 페이지 : main, 가계부, 게시판의 일부
const isLoggedIn = chkLoggedIn()

// 기능 요소 분리 (container와 유사하게..)
export function MainFetcher({ children }) {
  // get 요청
  const { data, isLoading, isError } = useQuery(["mainData"], mainAPI.getMainData, {
    retry: 10,
    enabled: isLoggedIn, // 로그인 되었을 때에만 데이터 받아오기
    select: (data) => data.data.data,
    onError: (error) => {
      console.log('MainAPI.getMainData::: get error : ', error)
    },
    onSuccess: (data) => {
      console.log('MainAPI.getMainData::: get success')
      console.log('mainData:::', data)
    },
  })

  // isLoading과 isError에서 렌더링 다르게 해주기 => 리턴할 것 및 ui 컴포넌트쪽에서 받아 렌더 처리할 로직 필요
  if (isLoading) {
    return <></>
  } else if (isError) {
    return <></>
  }

  // 기존 react element를 복제하여 새로운 props와 자식으로 복제된 엘리먼트를 반환.
  //// MainFetcher 컴포넌트의 자식 컴포넌트를 복제하여, 자식 컴포넌트에 'data' props를 전달함!
  //// 즉, MainFetcher 컴포넌트의 자식 컴포넌트는 MainFetcher가 가져온 데이터를 props를 통해 받을 수 있음...ㅇㅅㅇ
  //// 공통적으로 데이터를 가져오는 로직을 컴포넌트에서 재사용할 수 있음!
  return (
    <>
      {React.cloneElement(children, { data })}
    </>
  )}

function Main({ data }) {
    console.log("mainData:::", data)
  // 닉네임 모달
  const [isSocialLogin, setIsSocialLogin] = useState(INIT_LOG_VALUE);
  // Record Card 내 토글 버튼 state
  const [isToggleOnLeft, setIsToggleOnLeft] = useState(true);

  const { search } = useLocation();
  
  // get globalVariables
  const { isMobile, headerHeight, navHeight, mainHeight, screenWidth } = useGlobalVariables();

  // 만일 socialLogin으로 처음 들어온 유저이면 다음을 처리
  useEffect(() => {
    let loginSuccess = queryString.parse(search);
    loginSuccess = Object.keys(loginSuccess).length === 0 ? true : JSON.parse(loginSuccess.loginSuccess)

    if (!loginSuccess){
      console.log(loginSuccess)
      setIsSocialLogin(true)
    }
  }, [search])

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
          <layout.FlexCenterColumn100 style={{gap: "25px"}}>
            { /* 메인: 가입한지 n일 & 레코드 카드 */}
            <layout.FlexCenterColumn100 style={{gap: "5px"}}>
              <MainExp dayCount={data.signupDay} />
              <MainRecordCard data={data} isToggleOnLeft={isToggleOnLeft} toggleSetter={setIsToggleOnLeft}/>
            </layout.FlexCenterColumn100>
            { /* 메인: 여정 streak */}
            <layout.FlexCenterColumn>
              <MainJourney twoWeeks={data.twoweek}/>
            </layout.FlexCenterColumn>
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
