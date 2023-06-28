import React from "react";

import { layout, style } from "styles";

function BoardDetailComment() {
  return (
    <layout.FlexCenterRow100
      style={{ padding: "10px", gap: "5px", justifyContent: "space-between" }}
    >
      <layout.FlexCenter style={{width:"15%", marginRight:"10px"}}> 
        <style.BoardProfilePhoto />
      </layout.FlexCenter>
      <layout.FlexColumn100 style={{ width: "75%" }}>
        <div>사용자 이름</div>
        <div>comment</div>
      </layout.FlexColumn100>
      <layout.FlexColumn100  style={{ width: "10%" }}>
        <div>통</div>
        <div>럽</div>
      </layout.FlexColumn100>
    </layout.FlexCenterRow100>
  );
}

export default BoardDetailComment;
