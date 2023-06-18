import React from 'react'
import { style } from "styles"
import { HomeGray, HomeBlack, MoneyGray, MoneyBlack, BoardGray, BoardBlack, ProfileGray, ProfileBlack } from 'assets'

function Navigation({ selected }) {
  return (
    <style.NavWrap>
        { selected === "home" ? <HomeBlack /> : <HomeGray />}
        { selected === "money" ? <MoneyBlack /> : <MoneyGray />}
        { selected === "board" ? <BoardBlack /> : <BoardGray />}
        { selected === "profile" ? <ProfileBlack /> : <ProfileGray />}
    </style.NavWrap>
  )
}

export default Navigation