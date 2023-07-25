import React, { useContext } from 'react'
import { useQuery } from "react-query";

import { AuthContext } from 'providers';
import { mainAPI } from 'api/api';
import { MainRenderer } from 'pages';
import { mainDummyData } from 'constants';

// 기능 요소 분리 (container와 유사하게..)
export function MainFetcher({ children }) {
    // 로그인 체크
    //// 로그인 여부에 따라 렌더링 다른 페이지 : main, 가계부, 게시판의 일부
    const { isLoggedIn } = useContext(AuthContext)
    console.log('isLoggedIn-mainFetcher:::', isLoggedIn)
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
      onRetry: (failureCount, error) => {
        console.log(`MainAPI.getMainData::: retrying (${failureCount}):`, error);
      }
    })
  
    // isLoading과 isError에서 렌더링 다르게 해주기
    if (isLoading) {
      return (
        <>
          {MainRenderer("loading", mainDummyData)}
        </>
      )
    } else if (isError) {
      return (
        <>
          {MainRenderer("error", mainDummyData)}
        </>
      )
    }
  
    // 기존 react element를 복제하여 새로운 props와 자식으로 복제된 엘리먼트를 반환.
    //// MainFetcher 컴포넌트의 자식 컴포넌트를 복제하여, 자식 컴포넌트에 'data' props를 전달함!
    //// 즉, MainFetcher 컴포넌트의 자식 컴포넌트는 MainFetcher가 가져온 데이터를 props를 통해 받을 수 있음...ㅇㅅㅇ
    //// 공통적으로 데이터를 가져오는 로직을 컴포넌트에서 재사용할 수 있음!
    return (
      <>
        {React.cloneElement(children, { data, isLoggedIn })}
      </>
    )}