import React from "react";
import { style } from "styles";

function LabledInput({ title, placeholder, onChange, name, value, height }) {
  return (
    <style.CashBookCardWrap height={height}>
      <style.CashBookHead>{title}</style.CashBookHead>
      <style.CashBookInput
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
        maxLength={15}
        required
      />
    </style.CashBookCardWrap>
  );
}

export default LabledInput;
