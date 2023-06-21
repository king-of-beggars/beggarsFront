import React from 'react'
import { style } from "styles"
import { HomeGray, HomeBlack, MoneyGray, MoneyBlack, BoardGray, BoardBlack, ProfileGray, ProfileBlack } from 'assets'
import { useNavigate } from 'react-router-dom'

function Navigation({ selected }) {
  const navigate = useNavigate();

  // main으로 이동
  const onClickHome = () => {
    navigate('/');
  }

  // 가계부로 이동
  const onClickMoney = () => {
    navigate('/cash-book');
  }

  // 게시판으로 이동
  const onClickBoard = () => {
    navigate('/board');
  }

  // 프로필로 이동
  const onClickProfile = () => {
    navigate('/profile');
  }
  return (
    <style.NavWrap>
        { selected === "home" ? <HomeBlack /> : <HomeGray onClick={onClickHome}/>}
        { selected === "money" ? <MoneyBlack /> : <MoneyGray onClick={onClickMoney}/>}
        { selected === "board" ? <BoardBlack /> : <BoardGray onClick={onClickBoard}/>}
        { selected === "profile" ? <ProfileBlack /> : <ProfileGray onClick={onClickProfile}/>}
    </style.NavWrap>
  )
}

export default Navigation