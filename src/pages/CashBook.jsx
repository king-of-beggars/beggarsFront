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

function CashBook() {
  // 가계부 date
  const [selectDate, setSelectDate] = useState(moment);
  const [focused, setFocused] = useState(false);

  return (
    <>
      <div style={{ position: "absolute", top: "1em", fontSize: "1.56em" }}>
        가계부
      </div>
      <DayWrapper>
        <DayPicker
          selectDate={selectDate}
          setSelectDate={setSelectDate}
          focused={focused}
          setFocused={setFocused}
        />
      </DayWrapper>
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
