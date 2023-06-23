import React from "react";

import { Nav } from "components";
import { layout } from 'styles';

function Main({ isMobile }) {
  return (
    <layout.PageLayout isMobile={isMobile}>
      <div>Main</div>
      <Nav selected="main" />
    </layout.PageLayout>
  );
}

export default Main;
