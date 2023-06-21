import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { layout, style } from "styles";
import { BackCramps } from "assets";
import Navigation from 'components/common/Navigation';


function Profile() {
  const navigate = useNavigate();

  return (
    <>
      <layout.FlexCenterRow100 style={{ position: "absolute", top: "1em" }}>
        <BackCramps
          style={{ position: "absolute", left: "1em", float: "left" }}
        />
        <div style={{ fontSize: "1.8em" }}>프로필</div>
      </layout.FlexCenterRow100>
      <style.ProfilePicWrap />
      <layout.FlexCenterColumn100
        style={{ marginTop: "2em", marginBottom: "10em", gap: "1em" }}
      >
        <div style={{ fontSize: "1.5em" }}>사용자 닉네임 출력</div>
        <div style={{ fontSize: "1em", color: "#858585" }}>
          이메일 정보 출력
        </div>
      </layout.FlexCenterColumn100>
      <layout.FlexCenterColumn100 style={{ gap: "1em" }}>
        <style.MidBlackBtn>정보수정</style.MidBlackBtn>
        <span style={{ fontSize: "1em", textDecoration: "underline" }}>
          로그아웃
        </span>
      </layout.FlexCenterColumn100>
      <Navigation selected="profile"/>
    </>
  );
}

export default Profile;
