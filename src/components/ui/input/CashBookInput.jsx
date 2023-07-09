import React from "react";
import { style } from "styles";
{
}
function CashBookInput({ title, placeholder, onChange, name, value, height }) {
  return (
    <style.CashBookCardWrap height={height}>
      <style.CashBookHead>{title}</style.CashBookHead>
      <style.CashBookInput
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
      />
    </style.CashBookCardWrap>
  );
}

export default CashBookInput;
