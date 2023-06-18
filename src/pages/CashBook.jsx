import React, { useState } from 'react'
// import Pikaday from 'react-pikaday';

import { layout, style } from 'styles'
import { CashBookCard } from 'components'
import Navigation from 'components/common/Navigation';

function CashBook() {
  // 가계부 date
  const today = new Date()
  const [selectDate, setSelectDate] = useState(today);
  const onChangeDate = () => {
    
  }

  return (
    <>
        <div style={{position: "absolute", top: "1em"}}>가계부</div>
        {/* <Pikaday value={selectDate} onChange={onChangeDate}/> */}

        <Navigation selected="money"/>
        <CashBookCard category="대분류"/>
    </>
  )
}

export default CashBook