import React from "react";

import { style } from "styles";
import { DeleteDetail } from "assets";

function CashBookDetailList({ expendName, expendMoney }) {
  return (
    <style.CashBookDetailBox>
      <DeleteDetail style={{marginLeft:"1em", width:"8%"}}/>
      <div style={{width:"64%", marginLeft:"1em"}}>{expendName}</div>
      <div style={{width:"28%", display: "flex", justifyContent: "flex-end", marginRight:"1.5em"}}>{expendMoney}원</div>
    </style.CashBookDetailBox>
  );
}

export default CashBookDetailList;
