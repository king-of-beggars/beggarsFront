import React from 'react'

import { layout, style } from 'styles'
import { CashBookCard } from 'components'
import Navigation from 'components/common/Navigation';

function CashBook() {
  return (
    <>
        <div style={{position: "absolute", top: "1em"}}>가계부</div>
        <div style={{float: "left"}}>{'< 2023/06/12 >'}</div>

        <Navigation selected="money"/>
    </>
  )
}

export default CashBook