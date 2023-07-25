import React, { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useGlobalVariables } from 'providers';
import { Login, Signup, Profile, CashBookMain, Board, CashBookAdd, CashBookDetail, CashBookMod, BoardDetail, Main } from "pages";
import { MainFetcher } from "pages/main/MainFetcher";
import { BlurOverlay, CashbookExceptionRenderer, LoggedYet, ProfileExceptionRenderer } from "components";
import { ifNotLoggedIn } from 'constants';
import { getKrDate, } from "functions";
import { AuthContext } from 'providers';

function Router() {

  const { isLoggedIn } = useContext(AuthContext)

  console.log("Router isLoggedIn:::", isLoggedIn)
  // 게시판 상태 : 자랑하기(true) or 혼쭐나기(false)
  const [isBoasting, setIsBoasting] = useState(true);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"
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
          element={
            <ProtectedRouter className="cashbook" isLoggedIn={isLoggedIn}>
              <Navigate to={`/cash-book/${getKrDate()}`} replace />
            </ProtectedRouter>
        }
        />
        <Route path="cash-book/:date" element={<CashBookMain />} />
        <Route
          path="cash-book/add"
          element={
            <ProtectedRouter isLoggedIn={isLoggedIn}>
              <CashBookAdd />
            </ProtectedRouter>
          }
        />
        <Route
          path="cash-book/:date/:id"
          element={
            <ProtectedRouter isLoggedIn={isLoggedIn}>
              <CashBookDetail />
            </ProtectedRouter>
          }
        />
        <Route
          path="cash-book/edit/:id"
          element={
            <ProtectedRouter isLoggedIn={isLoggedIn}>
              <CashBookMod />
            </ProtectedRouter>
          }
        />

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
        
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />

        {/* related to user */}
        <Route
          path="profile"
          element={
              <ProtectedRouter className={"profile"} isLoggedIn={isLoggedIn}>
                <Profile />
              </ProtectedRouter>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const ProtectedRouter = ({ isLoggedIn, children, className }) => {
  const { isMobile, navHeight, screenWidth } = useGlobalVariables();
  if (isLoggedIn) {
    return children;
  }
  else {
    if (className === "profile") {
      return <ProfileExceptionRenderer comment={ifNotLoggedIn} addComponent={<LoggedYet />}/>
    } else if (className === "cashbook") {
      return <CashbookExceptionRenderer comment={ifNotLoggedIn} addComponent={<LoggedYet />}/>
    } else {
      return (
        <>
          {children}
          <BlurOverlay position="absolute" left={isMobile ? "0px" : `${(window.innerWidth - screenWidth) / 2}px`} width={`${screenWidth}px`} height={`${window.innerHeight - navHeight}px`} addComponent={<LoggedYet />}>로그인이 되지 않았네!</BlurOverlay>
        </>
      )
    }

  }
};

export default Router;
