import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "pages/Login";
import Signup from "pages/Signup";
import Main from "pages/Main";
import Profile from "pages/Profile";
import CashBook from "pages/CashBook";
import Board from "pages/Board";

function Router() {
  const getScreenSize = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  };
  // console.log(window.navigator.userAgent)
  const isMobile = /Mobi/i.test(window.navigator.userAgent)
  const { width, height } = getScreenSize()

  sessionStorage.setItem("isMobile", isMobile)
  sessionStorage.setItem("screenWidth", width)
  sessionStorage.setItem("screenHeight", height)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main isMobile={isMobile}/>} />
        <Route path="login" element={<Login isMobile={isMobile}/>} />
        <Route path="signup" element={<Signup isMobile={isMobile}/>} />

        <Route path="cash-book" element={<CashBook isMobile={isMobile}/>} />
        {/* <Route path="account/:id" element={<AccountDetail />} /> //지출 기록은 modal 혹은 Input으로 처리
        <Route path="account/add" element={<AccountAdd />}/>
        <Route path="account/edit/:id" element={<AccountEdit />} /> */}
        
        <Route path="board" element={<Board isMobile={isMobile}/>}/>
        {/* <Route path="board/:id" element={<BoardDetail />}/> */}

        <Route path="profile" element={<Profile isMobile={isMobile}/>} />
        {/* <Route path="mypage/edit" element={<MyPageEdit />}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
