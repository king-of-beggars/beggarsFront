import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Redirect,
  Navigate,
} from "react-router-dom";

import Login from "pages/Login";
import Signup from "pages/Signup";
import Main, { MainFetcher } from "pages/Main";
import Profile from "pages/Profile";
import CashBook from "pages/CashBook";
import Board from "pages/Board";
import CashBookAdd from "pages/CashBookAdd";
import CashBookDetail from "pages/CashBookDetail";
import CashBookMod from "pages/CashBookMod";
import BoardDetail from "pages/BoardDetail";
import { MainAssetProvider } from "components";
import { chkLoggedIn, getKrDate, setFrameSize } from "functions";
import { layout } from "styles";

function Router() {
  // setFrameSize();
  // 화면 크기에 따라 header와 nav의 크기를 설정한 후, 나머지 부분을 main으로 잡아 렌더링하는 로직
  // const [windowSize, setWindowSize] = useState({
  //   width: window.innerWidth,
  //   height: window.innerHeight
  // })
  // 게시판 상태 : 자랑하기(true) or 혼쭐나기(false)
  const [isBoasting, setIsBoasting] = useState(true);

  // const handleResize = () => {
  //   setWindowSize({
  //     width: window.innerWidth,
  //     height: window.innerHeight
  //   })
  //   localStorage.setItem("screenWidth", window.innerWidth)
  //   localStorage.setItem("screenHeight", window.innerHeight)
  // }

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize)
  //   }
  // }, [])

  // const headerHeight = Math.ceil((windowSize.height) * 0.2) > 120 ? 120 : Math.ceil((windowSize.height) * 0.15)
  // const navHeight = Math.ceil((windowSize.height) * 0.1) > 80 ? 80 : Math.ceil((windowSize.height) * 0.1)
  // const mainHeight = Math.ceil((windowSize.height) - (headerHeight + navHeight))

  // const isMobile = /Mobi/i.test(window.navigator.userAgent)

  // 로그인 여부 확인
  const isLogged = chkLoggedIn();

  return (
    <BrowserRouter>
      <Routes>
        {/* main */}
        <Route
          path="/"
          element={
            <MainFetcher>
              <Main />
            </MainFetcher>
          }
        />

        {/* related to cashbook */}
        <Route
          exact
          path="/cash-book"
          element={<Navigate to={`/cash-book/${getKrDate()}`} replace />}
        />
        <Route path="cash-book/:date" element={<CashBook />} />
        <Route
          path="cash-book/add"
          element={
            <ProtectedRouter isLogged={isLogged}>
              <CashBookAdd />
            </ProtectedRouter>
          }
        />
        <Route path="cash-book/:date/:id" element={<CashBookDetail />} />
        <Route path="cash-book/edit/:id" element={<CashBookMod />} />

        {/* related to board */}
        <Route
          path="board"
          element={
            <Board isBoasting={isBoasting} setIsBoasting={setIsBoasting} />
          }
        />
        <Route
          path="board/:id"
          element={<BoardDetail isBoasting={isBoasting} />}
        />

        {/* related to auth */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* related to user */}
        <Route path="profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

const ProtectedRouter = ({ isLogged, children }) => {
  if (isLogged) {
    return children;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default Router;
