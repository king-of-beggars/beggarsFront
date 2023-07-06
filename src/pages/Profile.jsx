import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import { layout, style } from "styles";
import { Nav } from "components";
import { AuthAPI } from "api/api";
import { useGlobalVariables } from 'components';

// function Profile({ isMobile, headerHeight, navHeight, mainHeight }) {
function Profile() {
  // 만들어둔 context 사용하기
  const { windowSize, isMobile, headerHeight, navHeight, mainHeight } = useGlobalVariables();
  console.log('Profile rendered:', windowSize, isMobile, headerHeight, navHeight, mainHeight)
  const navigate = useNavigate();

  const mutationLogout = useMutation(AuthAPI.postLogout, {
    onSuccess: (response) => {
      localStorage.removeItem("userId");
      localStorage.removeItem("nickname");

      alert("로그아웃에 성공하셨습니다.");
      navigate("/");
    },
    onError: () => alert("로그아웃에 실패하였습니다."),
  });

  // 로그아웃
  const onClickLogout = () => {
    mutationLogout.mutate();
  };

  return (
    <layout.PageLayout isMobile={isMobile}>
      <layout.Header headerHeight={`${headerHeight}px`}>
        <div className="statusBarHeight" style={{width: "inherit", height: "50px"}}></div>
        <layout.HeaderContent>프로필</layout.HeaderContent>
      </layout.Header>
      <layout.Main
        headerHeight={`${headerHeight}px`}
        mainHeight={`${mainHeight}px`}
      >
        <layout.MainContent>
          <layout.FlexCenterColumn100
            style={{ marginTop: "2em", marginBottom: "10em", gap: "1em" }}
          >
            <style.ProfilePicWrap />
            <div style={{ fontSize: "1.5em" }}>{decodeURIComponent(localStorage.getItem("nickname"))}</div>
            {/* <div style={{ fontSize: "1em", color: "#858585" }}>
              이메일 정보 출력
            </div> */}
          </layout.FlexCenterColumn100>
          <layout.FlexCenterColumn100 style={{ gap: "1em" }}>
            <style.MidBlackBtn>정보수정</style.MidBlackBtn>
            <span
              style={{ fontSize: "1em", textDecoration: "underline" }}
              onClick={onClickLogout}
            >
              로그아웃
            </span>
          </layout.FlexCenterColumn100>
        </layout.MainContent>
      </layout.Main>
      <layout.Nav navHeight={`${navHeight}px`}>
        <Nav selected="profile" />
      </layout.Nav>
    </layout.PageLayout>
  );
}

export default Profile;
