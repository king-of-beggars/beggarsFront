import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/login";
import Signup from "../pages/Signup";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        <Route path="account" element={<Account />} />
        <Route path="account/:id" element={<AccountDetail />} /> //지출 기록은 modal 혹은 Input으로 처리
        <Route path="account/add" element={<AccountAdd />}/>
        <Route path="account/edit/:id" element={<AccountEdit />} />
        
        <Route path="board" element={<Board />}/>
        <Route path="board/:id" element={<BoardDetail />}/>

        <Route path="mypage" element={<MyPage />} />
        <Route path="mypage/edit" element={<MyPageEdit />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
