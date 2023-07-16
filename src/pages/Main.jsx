import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";

// import { useGlobalVariables } from "providers"
import { chkLoggedIn } from "functions"
import { mainRenderer } from 'renderers';
import { mainAPI } from "api/api"
import { mainDummyData } from 'constants';
import { SocialLoginModal } from 'components';
// import { layout, style } from 'styles';
// import { SocialLoginModal, Nav, MainExp, MainRecordCard, MainJourney, ScreenBlur } from 'components';
// import { mainBackgroundTop, mainBackgroundMiddle, mainBackgroundTail, MainLogoText } from 'assets';

// 컴포넌트 안에 들어있지 않아도 되는 요소, 다른 함수 등 여러 곳에서 쓰일 수 있도록 바깥에 변수 선언
const INIT_LOG_VALUE = false
// 로그인 체크
//// 로그인 여부에 따라 렌더링 다른 페이지 : main, 가계부, 게시판의 일부
// const isLoggedIn = chkLoggedIn()
// console.log('isLoggedIn:::', isLoggedIn)

// 기능 요소 분리 (container와 유사하게..)
export function MainFetcher({ children }) {
  // 로그인 체크
  //// 로그인 여부에 따라 렌더링 다른 페이지 : main, 가계부, 게시판의 일부
  const isLoggedIn = chkLoggedIn()
  console.log('isLoggedIn-fetcher:::', isLoggedIn)
  // get 요청
  const { data, isLoading, isError } = useQuery(["mainData"], mainAPI.getMainData, {
    retry: 10, // 10번까지 재시도
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

  // isLoading과 isError에서 렌더링 다르게 해주기
  if (isLoading) {
    return (
      <>
        {mainRenderer("loading", mainDummyData)}
      </>
    )
  } else if (isError) {
    return (
      <>
        {mainRenderer("error", mainDummyData)}
      </>
    )
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
  // 로그인 체크
  //// 로그인 여부에 따라 렌더링 다른 페이지 : main, 가계부, 게시판의 일부
  const isLoggedIn = chkLoggedIn()
  console.log('isLoggedIn-main:::', isLoggedIn)
  console.log("mainData:::", data)
  // 닉네임 모달 관련
  //// 소셜 로그인 모드 판별 state
  const [isSocialLogin, setIsSocialLogin] = useState(INIT_LOG_VALUE);
  //// 모달을 사용하기 위한 state
  const [socialModalOn, setSocialModalOn] = useState(INIT_LOG_VALUE);
  //// social login 판별을 ㅟ한 주소 받기
  const { search } = useLocation();
  // Record Card 내 토글 버튼 state
  const [isToggleOnLeft, setIsToggleOnLeft] = useState(true);

  // 렌더러에 내려보낼 state들
  const states = { isToggleOnLeft, setIsToggleOnLeft }


  // 만일 socialLogin으로 처음 들어온 유저이면 다음을 처리
  useEffect(() => {
    if (!isLoggedIn) { // 아직 로그인되지 않은 경우에 소셜 로그인인지 탐색하기
      let loginSuccess = queryString.parse(search);
      console.log("parseLoginSuccess:::",loginSuccess)
      loginSuccess = Object.keys(loginSuccess).length === 0 ? true : JSON.parse(loginSuccess.loginSuccess)
  
      if (!loginSuccess){
        console.log(loginSuccess)
        setSocialModalOn(true)
      }
    }
  }, [search])

  console.log('isSocialLogin:::', isSocialLogin)

  return (
    isLoggedIn || isSocialLogin ? (
      !!data.signupDay ? (
        <>
          {mainRenderer("login", data, states)}
        </>
      ) : (
        <>
          {mainRenderer("loading", mainDummyData)}
        </>
      )

    ) : (
      <>
        {mainRenderer("default", mainDummyData)}
        { socialModalOn && <SocialLoginModal socialModalOn={socialModalOn} setSocialModalOn={setSocialModalOn} setIsSocialLogin={setIsSocialLogin}>회원가입</SocialLoginModal>}
      </>
    )
  );
  // return (
  //   <style.BackgroundPageLayout
  //     screenWidth={`${screenWidth}px`}
  //     isMobile={isMobile}
  //     backPngTop={`url(${mainBackgroundTop})`}
  //     backPngMiddle={`url(${mainBackgroundMiddle})`}
  //     backPngTail={`url(${mainBackgroundTail})`}
  //   >
  //     <layout.Header headerHeight={`${headerHeight}px`}>
  //       <div className="statusBarHeight" style={{width: "inherit", height: "50px"}}></div>
  //       <layout.HeaderContent>
  //         <layout.FlexCenter100>
  //           <MainLogoText />
  //         </layout.FlexCenter100>
  //       </layout.HeaderContent>
  //     </layout.Header>
  //     <layout.Main headerHeight={`${headerHeight}px`} mainHeight={`${mainHeight}px`}>
  //       <layout.MainContent>
  //         <layout.FlexCenterColumn100 style={{gap: "25px"}}>
  //           { /* 메인: 가입한지 n일 & 레코드 카드 */}
  //           <layout.FlexCenterColumn100 style={{gap: "5px"}}>
  //             <MainExp dayCount={data.signupDay} />
  //             <MainRecordCard data={data} isToggleOnLeft={isToggleOnLeft} toggleSetter={setIsToggleOnLeft}/>
  //           </layout.FlexCenterColumn100>
  //           { /* 메인: 여정 streak */}
  //           <layout.FlexCenterColumn>
  //             <MainJourney twoWeeks={data.twoweek}/>
  //           </layout.FlexCenterColumn>
  //         </layout.FlexCenterColumn100>
  //       </layout.MainContent>
  //     </layout.Main>
  //     <layout.Nav navHeight={`${navHeight}px`}>
  //       <Nav selected="main" />
  //     </layout.Nav>
  //     { SocialModalOn && <socialLoginModal>회원가입</SocialLoginModal> }
  //   </style.BackgroundPageLayout>
  // );
}

export default Main;
