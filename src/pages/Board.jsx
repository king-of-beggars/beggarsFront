import React from "react";

import { layout } from "styles";
import { Nav } from "components";

function Board({ isMobile, headerHeight, navHeight, mainHeight }) {
  return (
    <layout.PageLayout isMobile={isMobile}>
      <layout.Header headerHeight={`${headerHeight}px`}>
        <layout.HeaderContent>Board의 Header 내용</layout.HeaderContent>
      </layout.Header>
      <layout.Main headerHeight={`${headerHeight}px`} mainHeight={`${mainHeight}px`}>
        <layout.MainContent>board의 main 내용</layout.MainContent>
      </layout.Main>
      <layout.Nav navHeight={`${navHeight}px`}>
        <Nav selected="board" />
      </layout.Nav>
    </layout.PageLayout>
  );
}

export default Board;
