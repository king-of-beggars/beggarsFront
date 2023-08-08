import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';

import { AuthAPI } from 'common/utils/api';
import { useAuth } from "features/auth/hooks"
import { mainDummyData } from 'common/constants';
import SocialLoginModal from '../components/SocialLoginModal';
import MainRenderer from '../styles/MainRenderer';

// 컴포넌트 안에 들어있지 않아도 되는 요소, 다른 함수 등 여러 곳에서 쓰일 수 있도록 바깥에 변수 선언
const INIT_LOG_VALUE = false;

function Main({ data, isLoggedIn }) {
  const { isLoggedIn: loginStatus, login, logout, redirect } = useAuth();
  
  if (!loginStatus) {
    login()
  }
  // 닉네임 모달 관련
  //// 소셜 로그인 모드 판별 state
  const [isSocialLogin, setIsSocialLogin] = useState(INIT_LOG_VALUE);
  //// 모달을 사용하기 위한 state
  const [socialModalOn, setSocialModalOn] = useState(INIT_LOG_VALUE);
  //// social login 판별을 위한 주소 받기
  const { search } = useLocation();
  // Record Card 내 토글 버튼 state
  const [isToggleOnLeft, setIsToggleOnLeft] = useState(true);

  // 렌더러에 내려보낼 state들
  const states = { isToggleOnLeft, setIsToggleOnLeft };

  // 소셜로그인 시 발생하는 query url
  let queryStr = queryString.parse(search);
  const isGetSocial =
    Object.keys(queryStr).length === 0
      ? false
      : JSON.parse(queryStr.loginSuccess);

  // 회원가입이 완료된 소셜로그인 유저 정보
  useQuery(['socialUser'], () => AuthAPI.getSocialUser(queryStr), {
    retry: 10, // 10번까지 재시도
    enabled: isGetSocial,
    select: (data) => data.data,
    onError: (error) => {
      console.log('AuthAPI.getSocialUser::: get error : ', error);
    },
    onSuccess: (res) => {
      console.log('response ::: ', res);
      const accessToken = res.accessToken;
      const refreshToken = res.refreshToken;
      const userId = res.socialInfoDto.userId;
      const nickname = res.socialInfoDto.userNickname;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);
      localStorage.setItem('nickname', nickname);

      window.location.href = '/';
    },
  });

  // 만일 socialLogin으로 들어온 유저이면 다음을 처리
  useEffect(() => {
    if (isLoggedIn !== true) {
      // 아직 로그인되지 않은 경우에 소셜 로그인인지 탐색하기
      const loginSuccess =
        Object.keys(queryStr).length === 0
          ? true
          : JSON.parse(queryStr.loginSuccess);
      // console.log("loginSuccess:::", loginSuccess)

      if (!loginSuccess) {
        // console.log(loginSuccess)
        setSocialModalOn(true);
      }
    }
  }, [isLoggedIn, queryStr, search]);
  // console.log("isLoggedIn:::", isLoggedIn)
  // console.log('isSocialLogin:::', isSocialLogin)
  // console.log("decodedNickname:::", decodeURIComponent(localStorage.getItem("nickname")))

  return isLoggedIn === true || isSocialLogin ? (
    (data.signupDay !== null || data.signupDay !== undefined) &&
    decodeURIComponent(localStorage.getItem('nickname')) !== null ? (
      <>{MainRenderer('login', data, states)}</>
    ) : (
      <>{MainRenderer('loading', mainDummyData)}</>
    )
  ) : (
    <>
      {MainRenderer('default', mainDummyData)}
      {socialModalOn && (
        <SocialLoginModal
          socialModalOn={socialModalOn}
          setSocialModalOn={setSocialModalOn}
          setIsSocialLogin={setIsSocialLogin}
        >
          회원가입
        </SocialLoginModal>
      )}
    </>
  );
}

export default Main;
