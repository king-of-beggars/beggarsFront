import React from 'react'

import { style } from 'styles'

function LabledTextarea({ title, placeholder, onChange, name, value, height }) {
  return (
    <style.CashBookCardWrap height={height}>
      <style.CashBookHead>{title}</style.CashBookHead>
      <style.CashBookTextarea
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        required
      />
    </style.CashBookCardWrap>
  )
}

export default LabledTextarea