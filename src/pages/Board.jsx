import React from "react";

import { layout } from "styles";
import { Nav } from "components";

const dummies = {
  // data:{
  //  [
  //      {
  //         boardId:0,
  //         boardText : “String”,
  //         userName : “String”,
  //         userNickName : “String”
  //      },
  //      {
  //         boardId:1,
  //         boardText : “String”,
  //         userName : “String”,
  //         userNickName : “String”
  //      }
  //  ]
  // }
  }

function Board({ isMobile, headerHeight, navHeight, mainHeight }) {
  return (
    <layout.PageLayout isMobile={isMobile}>
      <layout.Header headerHeight={`${headerHeight}px`}>
        <layout.HeaderContent>
          <button>자랑하기</button>
          <button>혼쭐나기</button>
        </layout.HeaderContent>
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
