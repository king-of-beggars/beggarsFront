import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "pages/Login";
import Signup from "pages/Signup";
import Main from "pages/Main";
import Profile from "pages/Profile";
import CashBook from "pages/CashBook";
import CashBookTemp from 'pages/CashBookTemp';
import CashBookRefine from "pages/CashBookRefine"
import Board from "pages/Board";
import CashBookAdd from "pages/CashBookAdd";
import CashBookDetail from "pages/CashBookDetail";
import CashBookEdit from "pages/CashBookEdit";

function Router() {
  // 화면 크기에 따라 header와 nav의 크기를 설정한 후, 나머지 부분을 main으로 잡아 렌더링하는 로직
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const headerHeight = Math.ceil(windowSize.height * 0.15) > 92 ? 92 : Math.ceil(windowSize.height * 0.15)
  const navHeight = Math.ceil(windowSize.height * 0.1) > 95 ? 95 : Math.ceil(windowSize.height * 0.1)
  const mainHeight = Math.ceil(windowSize.height - (headerHeight + navHeight))

  const isMobile = /Mobi/i.test(window.navigator.userAgent)


  return (
    <BrowserRouter>
      <Routes>
      {/* <Route path="/" element={<CashBookDetail isMobile={isMobile} headerHeight={headerHeight} navHeight={navHeight} mainHeight={mainHeight} />} /> */}
        <Route path="/" element={<Main isMobile={isMobile} headerHeight={headerHeight} navHeight={navHeight} mainHeight={mainHeight} />} />
        <Route path="login" element={<Login isMobile={isMobile} headerHeight={headerHeight-50} navHeight={0} mainHeight={mainHeight + navHeight + 50} />} />
        <Route path="signup" element={<Signup isMobile={isMobile} headerHeight={headerHeight-50} navHeight={0} mainHeight={mainHeight + navHeight + 50} />} />

        <Route path="cash-book" element={<CashBookRefine isMobile={isMobile} headerHeight={headerHeight} navHeight={navHeight} mainHeight={mainHeight} />} />
        {/* <Route path="account/:id" element={<AccountDetail />} /> //지출 기록은 modal 혹은 Input으로 처리
        <Route path="account/add" element={<AccountAdd />}/>
        <Route path="account/edit/:id" element={<AccountEdit />} /> */}
        <Route path="cash-book" element={<CashBook isMobile={isMobile} headerHeight={headerHeight} navHeight={navHeight} mainHeight={mainHeight} />} />
        <Route path="cash-book/:id" element={<CashBookDetail isMobile={isMobile} headerHeight={headerHeight} navHeight={navHeight} mainHeight={mainHeight} />} /> 
        <Route path="cash-book/add" element={<CashBookAdd isMobile={isMobile} headerHeight={headerHeight} navHeight={navHeight} mainHeight={mainHeight} />}/>
        <Route path="cash-book/edit/:id" element={<CashBookEdit isMobile={isMobile} headerHeight={headerHeight} navHeight={navHeight} mainHeight={mainHeight}/>} />
        
        <Route path="board" element={<Board isMobile={isMobile} headerHeight={headerHeight} navHeight={navHeight} mainHeight={mainHeight} />}/>
        {/* <Route path="board/:id" element={<BoardDetail />}/> */}

        <Route path="profile" element={<Profile isMobile={isMobile} headerHeight={headerHeight} navHeight={navHeight} mainHeight={mainHeight} />} />
        {/* <Route path="mypage/edit" element={<MyPageEdit />}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
