import React from "react";
import { style } from "styles";

function CashAddSelect({ title, options, placeholder }) {
  return (
    <style.CashBookCardWrap>
      <style.CashBookHead>{title}</style.CashBookHead>
      <style.CashBookSelect>
        <option disabled hidden selected>
          {placeholder}
        </option>
        {options.map((option)=> {
            return (
                <option value={option.value} key={option.value}>{option.name}</option>
            )
        })}
      </style.CashBookSelect>
    </style.CashBookCardWrap>
  );
}

export default CashAddSelect;
