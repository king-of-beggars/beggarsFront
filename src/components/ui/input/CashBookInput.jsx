import React from 'react'
import { style } from "styles";
{}
function CashBookInput({title, placeholder}) {
  return (
    <style.CashBookCardWrap>
      <style.CashBookHead>{title}</style.CashBookHead>
      <style.CashBookInput placeholder={placeholder}/>
    </style.CashBookCardWrap>
  )
}

export default CashBookInput