import React, { useState } from 'react';
import { COMMENT } from 'common/constants';
import getKrDate from 'common/utils/getKrDate';

import { useAuthContext } from 'features/auth/contexts/AuthProvider';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Main from 'features/main/pages/Main';
import Login from 'features/auth/pages/Login';
import Profile from 'features/auth/pages/Profile';
import Board from 'features/board/pages/Board';
import Signup from 'features/auth/pages/Signup';
import BoardDetail from 'features/board/pages/BoardDetail';
import CashBookAdd from 'features/cashbook/pages/CashBookAdd';
import CashBookMod from 'features/cashbook/pages/CashBookMod';
import CashBookMain from 'features/cashbook/pages/CashBookMain';
import CashBookDetail from 'features/cashbook/pages/CashBookDetail';
import { useGlobalVariables } from 'common/components/provider/GlobalVariableProvider';
import { MainFetcher } from 'features/main/utils/MainFetcher';
import ProfileExceptionRenderer from 'features/auth/components/ProfileExceptionRenderer';
import LoggedYet from 'common/components/effect/LoggedYet';
import CashbookExceptionRenderer from 'features/cashbook/components/CashbookExceptionRenderer';
// import BlurOverlay from 'common/components/effect/BlurOverlay';
import ScreenBlur from 'common/components/effect/ScreenBlur';

function Router() {
  const { isLoggedIn } = useAuthContext();

  const [isBoasting, setIsBoasting] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
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
            <ProtectedRouter className={'profile'} isLoggedIn={isLoggedIn}>
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
  } else {
    if (className === 'profile') {
      return (
        <ProfileExceptionRenderer
          comment={COMMENT.ifNotLoggedIn}
          addComponent={<LoggedYet />}
        />
      );
    } else if (className === 'cashbook') {
      return (
        <CashbookExceptionRenderer
          comment={COMMENT.ifNotLoggedIn}
          addComponent={<LoggedYet />}
        />
      );
    } else {
      return (
        <>
          {children}
          <ScreenBlur
            position="absolute"
            left={
              isMobile ? '0px' : `${(window.innerWidth - screenWidth) / 2}px`
            }
            width={`${screenWidth}px`}
            height={`${window.innerHeight - navHeight}px`}
            addComponent={<LoggedYet />}
          >
            로그인이 되지 않았네!
          </ScreenBlur>
        </>
      );
    }
  }
};

export default Router;
