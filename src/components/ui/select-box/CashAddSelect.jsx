import React from "react";
import { style } from "styles";

function CashAddSelect({ title, options, placeholder, onChange, name, value }) {
  return (
    <style.CashBookCardWrap>
      <style.CashBookHead>{title}</style.CashBookHead>
      <style.CashBookSelect name={name} onChange={onChange} value={value}>
        <option value="" disabled={true}>
          {placeholder}
        </option>
        {options.map((option) => {
          return (
            <option value={option.value} key={option.value}>
              {option.name}
            </option>
          );
        })}
      </style.CashBookSelect>
    </style.CashBookCardWrap>
  );
}

export default CashAddSelect;
