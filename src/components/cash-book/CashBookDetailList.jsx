import React from "react";

import { style } from "styles";
import { DeleteDetail } from "assets";

function CashBookDetailList({ expendName, expendMoney }) {
  return (
    <style.CashBookDetailBox>
      <DeleteDetail style={{marginLeft:"15px"}}/>
      <div style={{width:"200px", marginLeft:"15px"}}>{expendName}</div>
      <div style={{width:"80px", marginLeft:"15px", float: "right"}}>{expendMoney}원</div>
    </style.CashBookDetailBox>
  );
}

export default CashBookDetailList;
