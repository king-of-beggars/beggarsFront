import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "pages/Login";
import Signup from "pages/Signup";
import Main from "pages/Main";
import Profile from "pages/Profile";
import CashBook from "pages/CashBook";
import Board from "pages/Board";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        <Route path="cash-book" element={<CashBook />} />
        {/* <Route path="account/:id" element={<AccountDetail />} /> //지출 기록은 modal 혹은 Input으로 처리
        <Route path="account/add" element={<AccountAdd />}/>
        <Route path="account/edit/:id" element={<AccountEdit />} /> */}
        
        <Route path="board" element={<Board />}/>
        {/* <Route path="board/:id" element={<BoardDetail />}/> */}

        <Route path="profile" element={<Profile />} />
        {/* <Route path="mypage/edit" element={<MyPageEdit />}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
