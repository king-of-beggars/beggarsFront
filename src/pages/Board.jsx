import React from "react";

import { layout } from "styles";
import { Nav } from "components";

function Board({ isMobile }) {
  return (
    <layout.PageLayout isMobile={isMobile}>
      <div>Board</div>
      <Nav selected="board" />
    </layout.PageLayout>
  );
}

export default Board;
