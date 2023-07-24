import { InputDrop } from 'assets';
import React from "react";
import { layout, style } from "styles";

import { useGlobalVariables } from 'providers';

function CashAddSelect({ title, options, placeholder, onChange, name, value }) {
  const { widthRatio } = useGlobalVariables();
  return (
    <style.CashBookCardWrap height={`${50 * widthRatio}px`}>
      <style.CashBookHead>{title}</style.CashBookHead>
      <style.CashBookSelect ratio={widthRatio} width={widthRatio} isToken={true} name={name} onChange={onChange} value={value}>
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
      {/* <div style={{display: "flex", width: "75%", height: "inherit", borderRadius: `${15 * widthRatio}px`}}>
        <layout.FlexCenterColumn style={{zIndex: "2"}}>
          <InputDrop />
        </layout.FlexCenterColumn>
      </div> */}

    </style.CashBookCardWrap>
  );
}

export default CashAddSelect;
