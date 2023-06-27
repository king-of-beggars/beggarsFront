import React, { useState } from "react";

import { Nav } from "components";
import { layout } from 'styles';
import SocialLoginModal from 'components/ui/modal/SocialLoginModal';

function Main({ isMobile, headerHeight, navHeight, mainHeight}) {
  const [isSocialLogin, setIsSocialLogin] = useState(false)
  return (
    <layout.PageLayout isMobile={isMobile}>
      <layout.Header headerHeight={`${headerHeight}px`}>
        <layout.HeaderContent>Main의 Header 내용</layout.HeaderContent>
      </layout.Header>
      <layout.Main headerHeight={`${headerHeight}px`} mainHeight={`${mainHeight}px`}>
        <layout.MainContent>Main의 메인 내용</layout.MainContent>
      </layout.Main>
      <layout.Nav navHeight={`${navHeight}px`}>
        <Nav selected="main" />
      </layout.Nav>
      { isSocialLogin && <SocialLoginModal>회원가입</SocialLoginModal> }
    </layout.PageLayout>
  );
}

export default Main;
