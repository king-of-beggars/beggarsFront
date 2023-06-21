import React, { useState } from "react";
import moment from "moment";
// import Pikaday from 'react-pikaday';

import { layout, style } from "styles";
import { CashBookCard, DayPicker, DayWrapper } from "components";
import Navigation from "components/common/Navigation";
import { Box, boxSample } from "assets";
import { BackgroundDiv } from "styles/styled-components/styles";
import TestBox from "components/ui/box/TestBox";
import { DateBox } from "assets";
import backgroundCash from "assets/pixels/cashbook/cashbook_date_box.png";

function CashBook() {
  // 가계부 date
  const [selectDate, setSelectDate] = useState(moment);
  const [focused, setFocused] = useState(false);

  const getScreenSize = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  };

  const { width, height } = getScreenSize();
  console.log(height);

  const cashbookApiRes = {
    data: [
      {
        id: 0,
        cashbookCategory: "식비",
        cashbookName: "아침",
        cashbookNowValue: 4000,
        cashbookGoalValue: 8000,
        cashbookOrder: 0,
      },
      {
        id: 1,
        cashbookCategory: "식비",
        cashbookName: "점심",
        cashbookNowValue: 12000,
        cashbookGoalValue: 15000,
        cashbookOrder: 1,
      },
      {
        id: 2,
        cashbookCategory: "식비",
        cashbookName: "저녁",
        cashbookNowValue: 0,
        cashbookGoalValue: 12000,
        cashbookOrder: 2,
      },
      {
        id: 3,
        cashbookCategory: "간식비 / 카페",
        cashbookName: "",
        cashbookNowValue: 3000,
        cashbookGoalValue: 5000,
        cashbookOrder: 3,
      },
    ],
  };

  return (
    <>
      <header
        style={{ position: "fixed", display: "flex", alignItems: "center" }}
      >
        <div className="heading" style={{ fontSize: "1.56em" }}>
          가계부
        </div>
      </header>
      <div
        className="cashBookWrapper"
        style={{
          display: "flex",
          flexDirection: "column",
          border: "2px solid black",
        }}
      >
        <div
          className="dayWrapper"
          style={{
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            width: "155px",
            height: "36px",
            backgroundImage: `url(${backgroundCash})`,
          }}
        >
          <DayPicker
            selectDate={selectDate}
            setSelectDate={setSelectDate}
            focused={focused}
            setFocused={setFocused}
          />
        </div>
        {cashbookApiRes.data.map((v, i) => {
          if (i === 0) {
          }
        })}
      </div>

      {/* <DateBox viewBox="0 0 50% 50%">
          <DayPicker
            selectDate={selectDate}
            setSelectDate={setSelectDate}
            focused={focused}
            setFocused={setFocused}
          />
      </DateBox> */}

      {/* <Pikaday value={selectDate} onChange={onChangeDate}/> */}
      {/* <Box>테스트</Box> */}
      {/* <TestBox text="테스트" fontSize="16pt" padding="1em" width="98vw"></TestBox> */}
      <Navigation selected="money" />
      <CashBookCard category="대분류" />
    </>
  );
}

export default CashBook;
